import { createContext, useContext } from "react";

export interface Translations {
  // Authentication
  loginTitle: string;
  phoneNumber: string;
  sendVerificationCode: string;
  verificationCode: string;
  verify: string;
  resendCode: string;
  
  // Navigation
  home: string;
  profile: string;
  settings: string;
  contact: string;
  
  // Education Levels
  selectEducationLevel: string;
  sixthGradeGifted: string;
  ninthGradeGifted: string;
  mathPhysicsExam: string;
  experimentalSciencesExam: string;
  humanitiesExam: string;
  
  // Subjects
  mathematics: string;
  physics: string;
  literature: string;
  topics: string;
  quiz: string;
  
  // Learning
  learningMaterials: string;
  startLearning: string;
  comments: string;
  likes: string;
  
  // Quiz
  question: string;
  next: string;
  previous: string;
  showExplanation: string;
  
  // Profile
  personalInfo: string;
  firstName: string;
  lastName: string;
  educationLevel: string;
  updateProfile: string;
  logout: string;
  
  // Settings
  theme: string;
  darkTheme: string;
  fontSize: string;
  language: string;
  notifications: string;
  
  // Contact
  contactUs: string;
  email: string;
  socialMedia: string;
  
  // Common
  back: string;
  submit: string;
  cancel: string;
  save: string;
  loading: string;
  error: string;
  success: string;
}

const translations: Record<string, Translations> = {
  fa: {
    // Authentication
    loginTitle: "پلتفرم آموزشی",
    phoneNumber: "شماره موبایل",
    sendVerificationCode: "ارسال کد تأیید",
    verificationCode: "کد تأیید 5 رقمی",
    verify: "تأیید",
    resendCode: "ارسال مجدد کد",
    
    // Navigation
    home: "خانه",
    profile: "پروفایل",
    settings: "تنظیمات",
    contact: "تماس با ما",
    
    // Education Levels
    selectEducationLevel: "انتخاب مقطع تحصیلی",
    sixthGradeGifted: "استعداد درخشان پایه ششم",
    ninthGradeGifted: "استعداد درخشان پایه نهم",
    mathPhysicsExam: "کنکور ریاضی و فیزیک",
    experimentalSciencesExam: "کنکور تجربی",
    humanitiesExam: "کنکور انسانی",
    
    // Subjects
    mathematics: "ریاضی",
    physics: "فیزیک",
    literature: "ادبیات",
    topics: "مباحث",
    quiz: "آزمون",
    
    // Learning
    learningMaterials: "آموزش‌ها",
    startLearning: "شروع",
    comments: "نظرات",
    likes: "پسندیدن",
    
    // Quiz
    question: "سوال",
    next: "بعدی",
    previous: "قبلی",
    showExplanation: "مشاهده توضیحات",
    
    // Profile
    personalInfo: "اطلاعات شخصی",
    firstName: "نام",
    lastName: "نام خانوادگی",
    educationLevel: "مقطع تحصیلی",
    updateProfile: "به‌روزرسانی اطلاعات",
    logout: "خروج از حساب کاربری",
    
    // Settings
    theme: "تم",
    darkTheme: "تم تاریک",
    fontSize: "اندازه فونت",
    language: "زبان",
    notifications: "اعلان‌ها",
    
    // Contact
    contactUs: "تماس با ما",
    email: "ایمیل",
    socialMedia: "شبکه‌های اجتماعی",
    
    // Common
    back: "بازگشت",
    submit: "ارسال",
    cancel: "لغو",
    save: "ذخیره",
    loading: "در حال بارگذاری...",
    error: "خطا",
    success: "موفق",
  },
  en: {
    // Authentication
    loginTitle: "Educational Platform",
    phoneNumber: "Phone Number",
    sendVerificationCode: "Send Verification Code",
    verificationCode: "5-Digit Verification Code",
    verify: "Verify",
    resendCode: "Resend Code",
    
    // Navigation
    home: "Home",
    profile: "Profile",
    settings: "Settings",
    contact: "Contact",
    
    // Education Levels
    selectEducationLevel: "Select Educational Level",
    sixthGradeGifted: "6th Grade Gifted Program",
    ninthGradeGifted: "9th Grade Gifted Program",
    mathPhysicsExam: "Math & Physics Entrance Exam",
    experimentalSciencesExam: "Experimental Sciences Entrance Exam",
    humanitiesExam: "Humanities Entrance Exam",
    
    // Subjects
    mathematics: "Mathematics",
    physics: "Physics",
    literature: "Literature",
    topics: "Topics",
    quiz: "Quiz",
    
    // Learning
    learningMaterials: "Learning Materials",
    startLearning: "Start",
    comments: "Comments",
    likes: "Likes",
    
    // Quiz
    question: "Question",
    next: "Next",
    previous: "Previous",
    showExplanation: "Show Explanation",
    
    // Profile
    personalInfo: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    educationLevel: "Education Level",
    updateProfile: "Update Profile",
    logout: "Logout",
    
    // Settings
    theme: "Theme",
    darkTheme: "Dark Theme",
    fontSize: "Font Size",
    language: "Language",
    notifications: "Notifications",
    
    // Contact
    contactUs: "Contact Us",
    email: "Email",
    socialMedia: "Social Media",
    
    // Common
    back: "Back",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    loading: "Loading...",
    error: "Error",
    success: "Success",
  }
};

export const getTranslations = (language: string): Translations => {
  return translations[language] || translations.en;
};

export const LanguageContext = createContext<{
  language: string;
  setLanguage: (lang: string) => void;
  t: Translations;
}>({
  language: "fa",
  setLanguage: () => {},
  t: translations.fa
});

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
