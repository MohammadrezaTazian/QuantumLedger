import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Play, HelpCircle, ChevronRight, ChevronLeft } from "lucide-react";

export default function Topics() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useLocation();
  
  // Extract subject ID from URL
  const subjectId = location.split("/")[2];

  // Mock data for topics
  const topics = [
    {
      id: 1,
      nameEn: "Integral Calculus",
      nameFa: "انتگرال",
      materialCount: 5,
      questionCount: 25,
    },
    {
      id: 2,
      nameEn: "Derivative",
      nameFa: "مشتق",
      materialCount: 7,
      questionCount: 30,
    },
    {
      id: 3,
      nameEn: "Limits & Continuity",
      nameFa: "حد و پیوستگی",
      materialCount: 4,
      questionCount: 20,
    },
  ];

  const handleGoBack = () => {
    setLocation("/dashboard");
  };

  const handleSelectTopic = (topicId: number) => {
    setLocation(`/learning/${topicId}`);
  };

  const getSubjectTitle = () => {
    // In real app, this would come from API based on subjectId
    return language === "fa" ? "مباحث ریاضی" : "Mathematics Topics";
  };

  const BackIcon = language === "fa" ? ArrowLeft : ArrowRight;
  const ChevronIcon = language === "fa" ? ChevronLeft : ChevronRight;

  return (
    <div className="pb-20">
      <header className="bg-primary text-white p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoBack}
          className="text-white hover:bg-primary-dark mr-2"
        >
          <BackIcon className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{getSubjectTitle()}</h1>
      </header>

      <div className="p-4 space-y-3">
        {topics.map((topic) => (
          <Card 
            key={topic.id}
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleSelectTopic(topic.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {language === "fa" ? topic.nameFa : topic.nameEn}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {language === "fa" ? topic.nameEn : topic.nameFa}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Play className="w-3 h-3 mr-1" />
                    <span>{topic.materialCount} {language === "fa" ? "آموزش" : "Materials"}</span>
                    <HelpCircle className="w-3 h-3 mr-1 ml-3" />
                    <span>{topic.questionCount} {language === "fa" ? "سوال" : "Questions"}</span>
                  </div>
                </div>
                <ChevronIcon className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
