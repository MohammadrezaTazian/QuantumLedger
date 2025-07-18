import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { insertUserSchema, insertCommentSchema, insertLikeSchema } from "@shared/schema";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Mock SMS service (in production, use a real SMS service)
const sendSMS = async (phone: string, code: string) => {
  console.log(`SMS sent to ${phone}: Your verification code is ${code}`);
  return true;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/send-code", async (req, res) => {
    try {
      const { phone } = req.body;
      
      if (!phone) {
        return res.status(400).json({ message: "Phone number is required" });
      }

      // Generate 5-digit code
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      await storage.createVerificationCode({
        phone,
        code,
        expiresAt,
        isUsed: false
      });

      // Send SMS (mock implementation)
      await sendSMS(phone, code);

      res.json({ message: "Verification code sent successfully" });
    } catch (error) {
      console.error("Send code error:", error);
      res.status(500).json({ message: "Failed to send verification code" });
    }
  });

  app.post("/api/auth/verify-code", async (req, res) => {
    try {
      const { phone, code } = req.body;
      
      if (!phone || !code) {
        return res.status(400).json({ message: "Phone and code are required" });
      }

      const verificationCode = await storage.getVerificationCode(phone, code);
      
      if (!verificationCode) {
        return res.status(400).json({ message: "Invalid verification code" });
      }

      if (verificationCode.expiresAt < new Date()) {
        return res.status(400).json({ message: "Verification code expired" });
      }

      // Mark code as used
      await storage.markVerificationCodeAsUsed(verificationCode.id);

      // Check if user exists
      let user = await storage.getUserByPhone(phone);
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          phone,
          isVerified: true
        });
      } else {
        // Update user as verified
        user = await storage.updateUser(user.id, { isVerified: true });
      }

      // Generate JWT tokens
      const accessToken = jwt.sign(
        { userId: user.id, phone: user.phone },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        user,
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error("Verify code error:", error);
      res.status(500).json({ message: "Failed to verify code" });
    }
  });

  app.post("/api/auth/refresh", async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
      }

      const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
      const user = await storage.getUser(decoded.userId);
      
      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }

      const accessToken = jwt.sign(
        { userId: user.id, phone: user.phone },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ accessToken });
    } catch (error) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
  });

  // User routes
  app.get("/api/user/profile", authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUser(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.patch("/api/user/profile", authenticateToken, async (req, res) => {
    try {
      const updateData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.user.userId, updateData);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Education levels
  app.get("/api/education-levels", async (req, res) => {
    try {
      const levels = await storage.getEducationLevels();
      res.json(levels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education levels" });
    }
  });

  // Subjects
  app.get("/api/subjects/:educationLevelId", async (req, res) => {
    try {
      const educationLevelId = parseInt(req.params.educationLevelId);
      const subjects = await storage.getSubjectsByEducationLevel(educationLevelId);
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  // Topics
  app.get("/api/topics/:subjectId", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.subjectId);
      const topics = await storage.getTopicsBySubject(subjectId);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  // Learning materials
  app.get("/api/learning-materials/:topicId", async (req, res) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const materials = await storage.getLearningMaterialsByTopic(topicId);
      res.json(materials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch learning materials" });
    }
  });

  // Quizzes
  app.get("/api/quizzes/:topicId", async (req, res) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const quizzes = await storage.getQuizzesByTopic(topicId);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  // Questions
  app.get("/api/questions/:quizId", async (req, res) => {
    try {
      const quizId = parseInt(req.params.quizId);
      const questions = await storage.getQuestionsByQuiz(quizId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Comments
  app.get("/api/comments/material/:materialId", async (req, res) => {
    try {
      const materialId = parseInt(req.params.materialId);
      const comments = await storage.getCommentsByMaterial(materialId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.get("/api/comments/question/:questionId", async (req, res) => {
    try {
      const questionId = parseInt(req.params.questionId);
      const comments = await storage.getCommentsByQuestion(questionId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/comments", authenticateToken, async (req, res) => {
    try {
      const commentData = insertCommentSchema.parse({
        ...req.body,
        userId: req.user.userId
      });
      const comment = await storage.createComment(commentData);
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Likes
  app.post("/api/likes", authenticateToken, async (req, res) => {
    try {
      const likeData = insertLikeSchema.parse({
        ...req.body,
        userId: req.user.userId
      });
      const like = await storage.createLike(likeData);
      res.json(like);
    } catch (error) {
      res.status(500).json({ message: "Failed to create like" });
    }
  });

  app.get("/api/likes/material/:materialId", async (req, res) => {
    try {
      const materialId = parseInt(req.params.materialId);
      const likes = await storage.getLikesByMaterial(materialId);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch likes" });
    }
  });

  app.get("/api/likes/question/:questionId", async (req, res) => {
    try {
      const questionId = parseInt(req.params.questionId);
      const likes = await storage.getLikesByQuestion(questionId);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch likes" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
