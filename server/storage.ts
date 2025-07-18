import { 
  users, 
  educationLevels, 
  subjects, 
  topics, 
  learningMaterials, 
  quizzes, 
  questions, 
  comments, 
  likes, 
  verificationCodes,
  type User, 
  type InsertUser,
  type EducationLevel,
  type InsertEducationLevel,
  type Subject,
  type InsertSubject,
  type Topic,
  type InsertTopic,
  type LearningMaterial,
  type InsertLearningMaterial,
  type Quiz,
  type InsertQuiz,
  type Question,
  type InsertQuestion,
  type Comment,
  type InsertComment,
  type Like,
  type InsertLike,
  type VerificationCode,
  type InsertVerificationCode
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;
  
  // Education Levels
  getEducationLevels(): Promise<EducationLevel[]>;
  getEducationLevel(id: number): Promise<EducationLevel | undefined>;
  createEducationLevel(level: InsertEducationLevel): Promise<EducationLevel>;
  
  // Subjects
  getSubjectsByEducationLevel(educationLevelId: number): Promise<Subject[]>;
  getSubject(id: number): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  
  // Topics
  getTopicsBySubject(subjectId: number): Promise<Topic[]>;
  getTopic(id: number): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  
  // Learning Materials
  getLearningMaterialsByTopic(topicId: number): Promise<LearningMaterial[]>;
  getLearningMaterial(id: number): Promise<LearningMaterial | undefined>;
  createLearningMaterial(material: InsertLearningMaterial): Promise<LearningMaterial>;
  
  // Quizzes
  getQuizzesByTopic(topicId: number): Promise<Quiz[]>;
  getQuiz(id: number): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Questions
  getQuestionsByQuiz(quizId: number): Promise<Question[]>;
  getQuestion(id: number): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Comments
  getCommentsByMaterial(materialId: number): Promise<Comment[]>;
  getCommentsByQuestion(questionId: number): Promise<Comment[]>;
  getComment(id: number): Promise<Comment | undefined>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Likes
  getLikesByMaterial(materialId: number): Promise<Like[]>;
  getLikesByQuestion(questionId: number): Promise<Like[]>;
  getLikesByComment(commentId: number): Promise<Like[]>;
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(id: number): Promise<void>;
  
  // Verification Codes
  createVerificationCode(code: InsertVerificationCode): Promise<VerificationCode>;
  getVerificationCode(phone: string, code: string): Promise<VerificationCode | undefined>;
  markVerificationCodeAsUsed(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.phone, phone));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    const [user] = await db.update(users).set(userData).where(eq(users.id, id)).returning();
    return user;
  }

  // Education Levels
  async getEducationLevels(): Promise<EducationLevel[]> {
    return await db.select().from(educationLevels);
  }

  async getEducationLevel(id: number): Promise<EducationLevel | undefined> {
    const [level] = await db.select().from(educationLevels).where(eq(educationLevels.id, id));
    return level || undefined;
  }

  async createEducationLevel(level: InsertEducationLevel): Promise<EducationLevel> {
    const [educationLevel] = await db.insert(educationLevels).values(level).returning();
    return educationLevel;
  }

  // Subjects
  async getSubjectsByEducationLevel(educationLevelId: number): Promise<Subject[]> {
    return await db.select().from(subjects).where(eq(subjects.educationLevelId, educationLevelId));
  }

  async getSubject(id: number): Promise<Subject | undefined> {
    const [subject] = await db.select().from(subjects).where(eq(subjects.id, id));
    return subject || undefined;
  }

  async createSubject(subject: InsertSubject): Promise<Subject> {
    const [subjectRecord] = await db.insert(subjects).values(subject).returning();
    return subjectRecord;
  }

  // Topics
  async getTopicsBySubject(subjectId: number): Promise<Topic[]> {
    return await db.select().from(topics).where(eq(topics.subjectId, subjectId));
  }

  async getTopic(id: number): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic || undefined;
  }

  async createTopic(topic: InsertTopic): Promise<Topic> {
    const [topicRecord] = await db.insert(topics).values(topic).returning();
    return topicRecord;
  }

  // Learning Materials
  async getLearningMaterialsByTopic(topicId: number): Promise<LearningMaterial[]> {
    return await db.select().from(learningMaterials).where(eq(learningMaterials.topicId, topicId));
  }

  async getLearningMaterial(id: number): Promise<LearningMaterial | undefined> {
    const [material] = await db.select().from(learningMaterials).where(eq(learningMaterials.id, id));
    return material || undefined;
  }

  async createLearningMaterial(material: InsertLearningMaterial): Promise<LearningMaterial> {
    const [learningMaterial] = await db.insert(learningMaterials).values(material).returning();
    return learningMaterial;
  }

  // Quizzes
  async getQuizzesByTopic(topicId: number): Promise<Quiz[]> {
    return await db.select().from(quizzes).where(eq(quizzes.topicId, topicId));
  }

  async getQuiz(id: number): Promise<Quiz | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return quiz || undefined;
  }

  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const [quizRecord] = await db.insert(quizzes).values(quiz).returning();
    return quizRecord;
  }

  // Questions
  async getQuestionsByQuiz(quizId: number): Promise<Question[]> {
    return await db.select().from(questions).where(eq(questions.quizId, quizId));
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question || undefined;
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [questionRecord] = await db.insert(questions).values(question).returning();
    return questionRecord;
  }

  // Comments
  async getCommentsByMaterial(materialId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.materialId, materialId)).orderBy(desc(comments.createdAt));
  }

  async getCommentsByQuestion(questionId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.questionId, questionId)).orderBy(desc(comments.createdAt));
  }

  async getComment(id: number): Promise<Comment | undefined> {
    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    return comment || undefined;
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [commentRecord] = await db.insert(comments).values(comment).returning();
    return commentRecord;
  }

  // Likes
  async getLikesByMaterial(materialId: number): Promise<Like[]> {
    return await db.select().from(likes).where(eq(likes.materialId, materialId));
  }

  async getLikesByQuestion(questionId: number): Promise<Like[]> {
    return await db.select().from(likes).where(eq(likes.questionId, questionId));
  }

  async getLikesByComment(commentId: number): Promise<Like[]> {
    return await db.select().from(likes).where(eq(likes.commentId, commentId));
  }

  async createLike(like: InsertLike): Promise<Like> {
    const [likeRecord] = await db.insert(likes).values(like).returning();
    return likeRecord;
  }

  async deleteLike(id: number): Promise<void> {
    await db.delete(likes).where(eq(likes.id, id));
  }

  // Verification Codes
  async createVerificationCode(code: InsertVerificationCode): Promise<VerificationCode> {
    const [verificationCode] = await db.insert(verificationCodes).values(code).returning();
    return verificationCode;
  }

  async getVerificationCode(phone: string, code: string): Promise<VerificationCode | undefined> {
    const [verificationCode] = await db.select().from(verificationCodes)
      .where(and(
        eq(verificationCodes.phone, phone),
        eq(verificationCodes.code, code),
        eq(verificationCodes.isUsed, false)
      ));
    return verificationCode || undefined;
  }

  async markVerificationCodeAsUsed(id: number): Promise<void> {
    await db.update(verificationCodes).set({ isUsed: true }).where(eq(verificationCodes.id, id));
  }
}

export const storage = new DatabaseStorage();
