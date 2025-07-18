import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  educationLevel: text("education_level"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const educationLevels = pgTable("education_levels", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameFa: text("name_fa").notNull(),
  slug: text("slug").notNull().unique(),
});

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameFa: text("name_fa").notNull(),
  slug: text("slug").notNull(),
  educationLevelId: integer("education_level_id").references(() => educationLevels.id),
});

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameFa: text("name_fa").notNull(),
  slug: text("slug").notNull(),
  subjectId: integer("subject_id").references(() => subjects.id),
});

export const learningMaterials = pgTable("learning_materials", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleFa: text("title_fa").notNull(),
  contentEn: text("content_en"),
  contentFa: text("content_fa"),
  mediaType: text("media_type"), // 'text', 'image', 'video'
  mediaUrl: text("media_url"),
  duration: integer("duration"), // in minutes
  teacherId: integer("teacher_id").references(() => users.id),
  topicId: integer("topic_id").references(() => topics.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleFa: text("title_fa").notNull(),
  topicId: integer("topic_id").references(() => topics.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  questionEn: text("question_en").notNull(),
  questionFa: text("question_fa").notNull(),
  optionsEn: jsonb("options_en").notNull(), // array of strings
  optionsFa: jsonb("options_fa").notNull(), // array of strings
  correctAnswer: integer("correct_answer").notNull(), // index of correct option
  explanationEn: text("explanation_en"),
  explanationFa: text("explanation_fa"),
  authorId: integer("author_id").references(() => users.id),
  quizId: integer("quiz_id").references(() => quizzes.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id").references(() => users.id),
  materialId: integer("material_id").references(() => learningMaterials.id),
  questionId: integer("question_id").references(() => questions.id),
  parentId: integer("parent_id").references(() => comments.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  materialId: integer("material_id").references(() => learningMaterials.id),
  questionId: integer("question_id").references(() => questions.id),
  commentId: integer("comment_id").references(() => comments.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const verificationCodes = pgTable("verification_codes", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull(),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isUsed: boolean("is_used").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  learningMaterials: many(learningMaterials),
  comments: many(comments),
  likes: many(likes),
}));

export const educationLevelsRelations = relations(educationLevels, ({ many }) => ({
  subjects: many(subjects),
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  educationLevel: one(educationLevels, {
    fields: [subjects.educationLevelId],
    references: [educationLevels.id],
  }),
  topics: many(topics),
}));

export const topicsRelations = relations(topics, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [topics.subjectId],
    references: [subjects.id],
  }),
  learningMaterials: many(learningMaterials),
  quizzes: many(quizzes),
}));

export const learningMaterialsRelations = relations(learningMaterials, ({ one, many }) => ({
  teacher: one(users, {
    fields: [learningMaterials.teacherId],
    references: [users.id],
  }),
  topic: one(topics, {
    fields: [learningMaterials.topicId],
    references: [topics.id],
  }),
  comments: many(comments),
  likes: many(likes),
}));

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
  topic: one(topics, {
    fields: [quizzes.topicId],
    references: [topics.id],
  }),
  questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  author: one(users, {
    fields: [questions.authorId],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id],
  }),
  comments: many(comments),
  likes: many(likes),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  material: one(learningMaterials, {
    fields: [comments.materialId],
    references: [learningMaterials.id],
  }),
  question: one(questions, {
    fields: [comments.questionId],
    references: [questions.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
  replies: many(comments),
  likes: many(likes),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  material: one(learningMaterials, {
    fields: [likes.materialId],
    references: [learningMaterials.id],
  }),
  question: one(questions, {
    fields: [likes.questionId],
    references: [questions.id],
  }),
  comment: one(comments, {
    fields: [likes.commentId],
    references: [comments.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertEducationLevelSchema = createInsertSchema(educationLevels).omit({
  id: true,
});

export const insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
});

export const insertTopicSchema = createInsertSchema(topics).omit({
  id: true,
});

export const insertLearningMaterialSchema = createInsertSchema(learningMaterials).omit({
  id: true,
  createdAt: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  createdAt: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
  createdAt: true,
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
});

export const insertLikeSchema = createInsertSchema(likes).omit({
  id: true,
  createdAt: true,
});

export const insertVerificationCodeSchema = createInsertSchema(verificationCodes).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type EducationLevel = typeof educationLevels.$inferSelect;
export type InsertEducationLevel = z.infer<typeof insertEducationLevelSchema>;
export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type Topic = typeof topics.$inferSelect;
export type InsertTopic = z.infer<typeof insertTopicSchema>;
export type LearningMaterial = typeof learningMaterials.$inferSelect;
export type InsertLearningMaterial = z.infer<typeof insertLearningMaterialSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Like = typeof likes.$inferSelect;
export type InsertLike = z.infer<typeof insertLikeSchema>;
export type VerificationCode = typeof verificationCodes.$inferSelect;
export type InsertVerificationCode = z.infer<typeof insertVerificationCodeSchema>;
