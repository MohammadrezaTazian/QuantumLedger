import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, UserCheck, Heart, MessageCircle, Play } from "lucide-react";

export default function Learning() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useLocation();
  
  // Extract topic ID from URL
  const topicId = location.split("/")[2];

  // Mock data for learning materials
  const materials = [
    {
      id: 1,
      titleEn: "Introduction to Integral Calculus",
      titleFa: "مقدمه‌ای بر انتگرال",
      teacherName: language === "fa" ? "استاد احمدی" : "Prof. Ahmadi",
      duration: 15,
      likes: 24,
      comments: 8,
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
    },
    {
      id: 2,
      titleEn: "Integration Methods",
      titleFa: "روش‌های محاسبه انتگرال",
      teacherName: language === "fa" ? "دکتر حسینی" : "Dr. Hosseini",
      duration: 22,
      likes: 31,
      comments: 12,
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
    },
  ];

  const handleGoBack = () => {
    setLocation(`/topics/1`); // Navigate back to topics
  };

  const handleStartLearning = (materialId: number) => {
    // In real app, this would navigate to the actual learning content
    console.log("Starting learning material:", materialId);
  };

  const handleShowComments = (materialId: number) => {
    setLocation(`/comments/material/${materialId}`);
  };

  const handleToggleLike = (materialId: number) => {
    // In real app, this would toggle like via API
    console.log("Toggle like for material:", materialId);
  };

  const getTopicTitle = () => {
    // In real app, this would come from API based on topicId
    return language === "fa" ? "آموزش انتگرال" : "Integral Learning";
  };

  const BackIcon = language === "fa" ? ArrowLeft : ArrowRight;

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
        <h1 className="text-lg font-semibold">{getTopicTitle()}</h1>
      </header>

      <div className="p-4 space-y-4">
        {materials.map((material) => (
          <Card key={material.id} className="overflow-hidden shadow-sm">
            <img 
              src={material.imageUrl} 
              alt="Learning material" 
              className="w-full h-32 object-cover"
            />
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {language === "fa" ? material.titleFa : material.titleEn}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {language === "fa" ? material.titleEn : material.titleFa}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-sm text-gray-500">
                  <UserCheck className="w-4 h-4 mr-1" />
                  <span>{material.teacherName}</span>
                </div>
                <Badge variant="secondary">
                  {material.duration} {language === "fa" ? "دقیقه" : "min"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleToggleLike(material.id)}
                    className="flex items-center text-gray-500 hover:text-primary"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    <span className="text-sm">{material.likes}</span>
                  </button>
                  <button 
                    onClick={() => handleShowComments(material.id)}
                    className="flex items-center text-gray-500 hover:text-primary"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">{material.comments}</span>
                  </button>
                </div>
                <Button 
                  onClick={() => handleStartLearning(material.id)}
                  size="sm"
                  className="bg-primary hover:bg-primary-dark"
                >
                  <Play className="w-4 h-4 mr-1" />
                  {language === "fa" ? "شروع" : "Start"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
