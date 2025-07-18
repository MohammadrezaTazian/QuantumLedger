import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Dashboard() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get selected education level
  const selectedLevel = localStorage.getItem("selectedLevel") || "math-physics";

  // Mock data for subjects (in real app, this would come from API)
  const subjects = [
    {
      id: 1,
      nameEn: "Mathematics",
      nameFa: "ریاضی",
      topicCount: 20,
      questionCount: 150,
    },
    {
      id: 2,
      nameEn: "Physics",
      nameFa: "فیزیک",
      topicCount: 15,
      questionCount: 120,
    },
    {
      id: 3,
      nameEn: "Literature",
      nameFa: "ادبیات",
      topicCount: 12,
      questionCount: 80,
    },
  ];

  const handleViewTopics = (subjectId: number) => {
    setLocation(`/topics/${subjectId}`);
  };

  const handleViewQuizzes = (subjectId: number) => {
    setLocation(`/quiz/${subjectId}`);
  };

  const getLevelTitle = () => {
    switch (selectedLevel) {
      case "sixth-grade":
        return language === "fa" ? "استعداد درخشان پایه ششم" : "6th Grade Gifted";
      case "ninth-grade":
        return language === "fa" ? "استعداد درخشان پایه نهم" : "9th Grade Gifted";
      case "math-physics":
        return language === "fa" ? "ریاضی و فیزیک" : "Math & Physics";
      case "experimental":
        return language === "fa" ? "تجربی" : "Experimental Sciences";
      case "humanities":
        return language === "fa" ? "انسانی" : "Humanities";
      default:
        return language === "fa" ? "ریاضی و فیزیک" : "Math & Physics";
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-primary text-white p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(true)}
          className="text-white hover:bg-primary-dark"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{getLevelTitle()}</h1>
        <div className="w-10" />
      </header>

      {/* Subject Cards */}
      <div className="p-4 space-y-4">
        {subjects.map((subject) => (
          <Card key={subject.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {language === "fa" ? subject.nameFa : subject.nameEn}
                </h3>
                <Badge variant="secondary">
                  {language === "fa" ? subject.nameEn : subject.nameFa}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <span>{subject.topicCount} {language === "fa" ? "مبحث" : "Topics"}</span>
                  <span className="mx-2">•</span>
                  <span>{subject.questionCount} {language === "fa" ? "سوال" : "Questions"}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleViewTopics(subject.id)}
                    className="bg-primary hover:bg-primary-dark"
                  >
                    {t.topics}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleViewQuizzes(subject.id)}
                    className="bg-accent hover:bg-accent-dark text-white"
                  >
                    {t.quiz}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
