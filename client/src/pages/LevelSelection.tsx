import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, GraduationCap, BookOpen, Calculator, Microscope, Globe } from "lucide-react";

export default function LevelSelection() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();

  const educationLevels = [
    {
      id: "sixth-grade-gifted",
      title: t.sixthGradeGifted,
      subtitle: "6th Grade Gifted Program",
      icon: BookOpen,
      color: "bg-blue-500",
      description: "برای دانش‌آموزان پایه ششم با استعداد ویژه",
      descriptionEn: "For talented 6th grade students"
    },
    {
      id: "ninth-grade-gifted",
      title: t.ninthGradeGifted,
      subtitle: "9th Grade Gifted Program",
      icon: GraduationCap,
      color: "bg-green-500",
      description: "برای دانش‌آموزان پایه نهم با استعداد ویژه",
      descriptionEn: "For talented 9th grade students"
    },
    {
      id: "math-physics",
      title: t.mathPhysicsExam,
      subtitle: "Math & Physics Entrance Exam",
      icon: Calculator,
      color: "bg-purple-500",
      description: "آمادگی برای کنکور رشته ریاضی و فیزیک",
      descriptionEn: "Preparation for math and physics entrance exam"
    },
    {
      id: "experimental-sciences",
      title: t.experimentalSciencesExam,
      subtitle: "Experimental Sciences Entrance Exam",
      icon: Microscope,
      color: "bg-orange-500",
      description: "آمادگی برای کنکور رشته تجربی",
      descriptionEn: "Preparation for experimental sciences entrance exam"
    },
    {
      id: "humanities",
      title: t.humanitiesExam,
      subtitle: "Humanities Entrance Exam",
      icon: Globe,
      color: "bg-rose-500",
      description: "آمادگی برای کنکور رشته انسانی",
      descriptionEn: "Preparation for humanities entrance exam"
    },
  ];

  const handleSelectLevel = (levelId: string) => {
    localStorage.setItem("selectedLevel", levelId);
    setLocation("/dashboard");
  };

  const ChevronIcon = language === "fa" ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-2xl mx-auto pt-16">
        <div className="text-center mb-8 level-header">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg level-icon">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.selectEducationLevel}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {language === "fa" ? "مقطع تحصیلی خود را انتخاب کنید" : "Choose your educational level"}
          </p>
        </div>

        <div className="space-y-4">
          {educationLevels.map((level, index) => {
            const Icon = level.icon;
            return (
              <Card 
                key={level.id}
                className="level-card cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-transparent hover:border-primary/50"
                onClick={() => handleSelectLevel(level.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className={`w-14 h-14 ${level.color} rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110`}>
                        <Icon className="text-white w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                          {level.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {level.subtitle}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {language === "fa" ? level.description : level.descriptionEn}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-primary hover:text-white">
                        <ChevronIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {language === "fa" 
              ? "پس از انتخاب مقطع، به داشبورد آموزشی خود دسترسی خواهید داشت" 
              : "After selecting your level, you'll access your educational dashboard"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
