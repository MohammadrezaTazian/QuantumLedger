import { db } from "./db";
import { 
  educationLevels, 
  subjects, 
  topics, 
  learningMaterials, 
  quizzes, 
  questions,
  users
} from "@shared/schema";

async function seedDatabase() {
  try {
    console.log("Starting database seed...");

    // Clear existing data
    await db.delete(questions);
    await db.delete(quizzes);
    await db.delete(learningMaterials);
    await db.delete(topics);
    await db.delete(subjects);
    await db.delete(educationLevels);
    await db.delete(users);

    // Insert education levels
    const educationLevelsData = await db.insert(educationLevels).values([
      {
        nameEn: "6th Grade Gifted Program",
        nameFa: "استعداد درخشان پایه ششم",
        slug: "sixth-grade-gifted"
      },
      {
        nameEn: "9th Grade Gifted Program", 
        nameFa: "استعداد درخشان پایه نهم",
        slug: "ninth-grade-gifted"
      },
      {
        nameEn: "Math & Physics Entrance Exam",
        nameFa: "کنکور ریاضی و فیزیک",
        slug: "math-physics"
      },
      {
        nameEn: "Experimental Sciences Entrance Exam",
        nameFa: "کنکور تجربی",
        slug: "experimental-sciences"
      },
      {
        nameEn: "Humanities Entrance Exam",
        nameFa: "کنکور انسانی",
        slug: "humanities"
      }
    ]).returning();

    // Insert subjects
    const subjectsData = await db.insert(subjects).values([
      {
        nameEn: "Mathematics",
        nameFa: "ریاضی",
        slug: "mathematics",
        educationLevelId: educationLevelsData[2].id // Math & Physics
      },
      {
        nameEn: "Physics",
        nameFa: "فیزیک",
        slug: "physics",
        educationLevelId: educationLevelsData[2].id // Math & Physics
      },
      {
        nameEn: "Literature",
        nameFa: "ادبیات",
        slug: "literature",
        educationLevelId: educationLevelsData[2].id // Math & Physics
      },
      {
        nameEn: "Geometric Shapes",
        nameFa: "شکل‌های هندسی",
        slug: "geometric-shapes",
        educationLevelId: educationLevelsData[0].id // 6th Grade Gifted
      },
      {
        nameEn: "Analytical Reasoning",
        nameFa: "استدلال تحلیلی",
        slug: "analytical-reasoning",
        educationLevelId: educationLevelsData[0].id // 6th Grade Gifted
      }
    ]).returning();

    // Insert topics
    const topicsData = await db.insert(topics).values([
      {
        nameEn: "Integral Calculus",
        nameFa: "انتگرال",
        slug: "integral-calculus",
        subjectId: subjectsData[0].id // Mathematics
      },
      {
        nameEn: "Derivative",
        nameFa: "مشتق",
        slug: "derivative",
        subjectId: subjectsData[0].id // Mathematics
      },
      {
        nameEn: "Limits & Continuity",
        nameFa: "حد و پیوستگی",
        slug: "limits-continuity",
        subjectId: subjectsData[0].id // Mathematics
      },
      {
        nameEn: "Mechanics",
        nameFa: "مکانیک",
        slug: "mechanics",
        subjectId: subjectsData[1].id // Physics
      },
      {
        nameEn: "Thermodynamics",
        nameFa: "ترمودینامیک",
        slug: "thermodynamics",
        subjectId: subjectsData[1].id // Physics
      }
    ]).returning();

    // Insert a sample teacher user
    const teacherData = await db.insert(users).values([
      {
        phone: "09123456789",
        firstName: "محمد",
        lastName: "احمدی",
        educationLevel: "math-physics",
        isVerified: true
      },
      {
        phone: "09123456790",
        firstName: "فاطمه",
        lastName: "حسینی",
        educationLevel: "math-physics",
        isVerified: true
      }
    ]).returning();

    // Insert learning materials
    const materialsData = await db.insert(learningMaterials).values([
      {
        titleEn: "Introduction to Integral Calculus",
        titleFa: "مقدمه‌ای بر انتگرال",
        contentEn: "This lesson introduces the fundamental concepts of integral calculus, including the relationship between derivatives and integrals.",
        contentFa: "این درس مفاهیم اساسی انتگرال را معرفی می‌کند، از جمله رابطه بین مشتق و انتگرال.",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/embed/FnJqaIESC2s",
        duration: 15,
        teacherId: teacherData[0].id,
        topicId: topicsData[0].id
      },
      {
        titleEn: "Integration Techniques",
        titleFa: "تکنیک‌های انتگرال‌گیری",
        contentEn: "Learn various integration techniques including substitution, integration by parts, and partial fractions.",
        contentFa: "تکنیک‌های مختلف انتگرال‌گیری را یاد بگیرید، از جمله جایگذاری، انتگرال‌گیری با اجزا و کسرهای جزئی.",
        mediaType: "video",
        mediaUrl: "https://www.youtube.com/embed/H9eCT6f_Ftw",
        duration: 22,
        teacherId: teacherData[1].id,
        topicId: topicsData[0].id
      },
      {
        titleEn: "Basic Derivative Rules",
        titleFa: "قوانین اساسی مشتق",
        contentEn: "Master the fundamental rules of differentiation including power rule, product rule, and chain rule.",
        contentFa: "قوانین اساسی مشتق‌گیری را یاد بگیرید، از جمله قانون توان، قانون ضرب و قانون زنجیره.",
        mediaType: "text",
        mediaUrl: null,
        duration: 10,
        teacherId: teacherData[0].id,
        topicId: topicsData[1].id
      }
    ]).returning();

    // Insert quizzes
    const quizzesData = await db.insert(quizzes).values([
      {
        titleEn: "Integral Calculus Quiz",
        titleFa: "آزمون انتگرال",
        topicId: topicsData[0].id
      },
      {
        titleEn: "Derivative Quiz",
        titleFa: "آزمون مشتق",
        topicId: topicsData[1].id
      }
    ]).returning();

    // Insert questions
    await db.insert(questions).values([
      {
        questionEn: "What is the integral of f(x) = 2x + 3 over the interval [0, 2]?",
        questionFa: "انتگرال تابع f(x) = 2x + 3 در بازه [0, 2] برابر است با:",
        optionsEn: ["10", "8", "12", "6"],
        optionsFa: ["10", "8", "12", "6"],
        correctAnswer: 0,
        explanationEn: "To calculate the integral, first find the antiderivative: ∫(2x + 3)dx = x² + 3x + C. Then evaluate over [0, 2]: (2² + 3×2) - (0² + 3×0) = 4 + 6 - 0 = 10",
        explanationFa: "برای محاسبه انتگرال، ابتدا انتگرال نامعین را محاسبه می‌کنیم: ∫(2x + 3)dx = x² + 3x + C. سپس در بازه [0, 2]: (2² + 3×2) - (0² + 3×0) = 4 + 6 - 0 = 10",
        authorId: teacherData[0].id,
        quizId: quizzesData[0].id
      },
      {
        questionEn: "What is the derivative of f(x) = x³ + 2x² - 5x + 1?",
        questionFa: "مشتق تابع f(x) = x³ + 2x² - 5x + 1 برابر است با:",
        optionsEn: ["3x² + 4x - 5", "3x² + 4x - 5x", "x² + 4x - 5", "3x² + 2x - 5"],
        optionsFa: ["3x² + 4x - 5", "3x² + 4x - 5x", "x² + 4x - 5", "3x² + 2x - 5"],
        correctAnswer: 0,
        explanationEn: "Using the power rule: d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5, d/dx(1) = 0. Therefore: f'(x) = 3x² + 4x - 5",
        explanationFa: "با استفاده از قانون توان: d/dx(x³) = 3x²، d/dx(2x²) = 4x، d/dx(-5x) = -5، d/dx(1) = 0. بنابراین: f'(x) = 3x² + 4x - 5",
        authorId: teacherData[1].id,
        quizId: quizzesData[1].id
      },
      {
        questionEn: "Which of the following is the correct antiderivative of f(x) = 6x² + 4x - 3?",
        questionFa: "کدام یک از موارد زیر انتگرال نامعین صحیح تابع f(x) = 6x² + 4x - 3 است؟",
        optionsEn: ["2x³ + 2x² - 3x + C", "6x³ + 4x² - 3x + C", "18x + 4 + C", "2x³ + 4x² - 3x + C"],
        optionsFa: ["2x³ + 2x² - 3x + C", "6x³ + 4x² - 3x + C", "18x + 4 + C", "2x³ + 4x² - 3x + C"],
        correctAnswer: 0,
        explanationEn: "Using the power rule for integration: ∫6x²dx = 6x³/3 = 2x³, ∫4xdx = 4x²/2 = 2x², ∫-3dx = -3x. Therefore: ∫(6x² + 4x - 3)dx = 2x³ + 2x² - 3x + C",
        explanationFa: "با استفاده از قانون توان برای انتگرال‌گیری: ∫6x²dx = 6x³/3 = 2x³، ∫4xdx = 4x²/2 = 2x²، ∫-3dx = -3x. بنابراین: ∫(6x² + 4x - 3)dx = 2x³ + 2x² - 3x + C",
        authorId: teacherData[0].id,
        quizId: quizzesData[0].id
      }
    ]);

    console.log("Database seeded successfully!");
    console.log(`Education levels: ${educationLevelsData.length}`);
    console.log(`Subjects: ${subjectsData.length}`);
    console.log(`Topics: ${topicsData.length}`);
    console.log(`Materials: ${materialsData.length}`);
    console.log(`Quizzes: ${quizzesData.length}`);
    console.log(`Teachers: ${teacherData.length}`);

  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run the seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export { seedDatabase };