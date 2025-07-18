import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Clock, Lightbulb, CheckCircle } from "lucide-react";

export default function Quiz() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useLocation();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  
  // Extract quiz/subject ID from URL
  const subjectId = location.split("/")[2];

  // Mock quiz data with multiple questions
  const quiz = {
    id: 1,
    title: language === "fa" ? "آزمون انتگرال" : "Integral Quiz",
    timeRemaining: "15:30",
    questions: [
      {
        id: 1,
        questionFa: "انتگرال تابع f(x) = 2x + 3 در بازه [0, 2] برابر است با:",
        questionEn: "The integral of f(x) = 2x + 3 over the interval [0, 2] equals:",
        options: [
          { id: "a", textFa: "10", textEn: "10" },
          { id: "b", textFa: "8", textEn: "8" },
          { id: "c", textFa: "12", textEn: "12" },
          { id: "d", textFa: "6", textEn: "6" },
        ],
        correctAnswer: "a",
        explanationFa: "برای محاسبه انتگرال، ابتدا انتگرال نامعین را محاسبه می‌کنیم: ∫(2x + 3)dx = x² + 3x + C. سپس در بازه [0, 2]: (2² + 3×2) - (0² + 3×0) = 4 + 6 - 0 = 10",
        explanationEn: "To calculate the integral, first find the antiderivative: ∫(2x + 3)dx = x² + 3x + C. Then evaluate over [0, 2]: (2² + 3×2) - (0² + 3×0) = 4 + 6 - 0 = 10",
      },
      {
        id: 2,
        questionFa: "مشتق تابع f(x) = x³ + 2x² - 5x + 1 برابر است با:",
        questionEn: "The derivative of f(x) = x³ + 2x² - 5x + 1 equals:",
        options: [
          { id: "a", textFa: "3x² + 4x - 5", textEn: "3x² + 4x - 5" },
          { id: "b", textFa: "3x² + 2x - 5", textEn: "3x² + 2x - 5" },
          { id: "c", textFa: "x² + 4x - 5", textEn: "x² + 4x - 5" },
          { id: "d", textFa: "3x² + 4x + 1", textEn: "3x² + 4x + 1" },
        ],
        correctAnswer: "a",
        explanationFa: "مشتق تابع چندجمله‌ای: f'(x) = 3x² + 4x - 5. قانون توان: مشتق xⁿ برابر nxⁿ⁻¹ است.",
        explanationEn: "Derivative of polynomial: f'(x) = 3x² + 4x - 5. Power rule: derivative of xⁿ is nxⁿ⁻¹.",
      },
      {
        id: 3,
        questionFa: "حد تابع lim(x→0) (sin x)/x برابر است با:",
        questionEn: "The limit lim(x→0) (sin x)/x equals:",
        options: [
          { id: "a", textFa: "1", textEn: "1" },
          { id: "b", textFa: "0", textEn: "0" },
          { id: "c", textFa: "∞", textEn: "∞" },
          { id: "d", textFa: "تعریف نشده", textEn: "Undefined" },
        ],
        correctAnswer: "a",
        explanationFa: "این یکی از حدهای مهم مثلثاتی است. lim(x→0) (sin x)/x = 1",
        explanationEn: "This is one of the important trigonometric limits. lim(x→0) (sin x)/x = 1",
      },
      {
        id: 4,
        questionFa: "معادله مماس بر منحنی y = x² در نقطه (2, 4) چیست؟",
        questionEn: "What is the equation of the tangent line to y = x² at point (2, 4)?",
        options: [
          { id: "a", textFa: "y = 4x - 4", textEn: "y = 4x - 4" },
          { id: "b", textFa: "y = 2x", textEn: "y = 2x" },
          { id: "c", textFa: "y = 4x + 4", textEn: "y = 4x + 4" },
          { id: "d", textFa: "y = x + 2", textEn: "y = x + 2" },
        ],
        correctAnswer: "a",
        explanationFa: "شیب مماس برابر مشتق در آن نقطه است: f'(2) = 4. معادله مماس: y - 4 = 4(x - 2) → y = 4x - 4",
        explanationEn: "The slope of tangent equals the derivative at that point: f'(2) = 4. Tangent equation: y - 4 = 4(x - 2) → y = 4x - 4",
      },
      {
        id: 5,
        questionFa: "کدام از گزینه‌های زیر انتگرال نامعین ∫cos(x)dx است؟",
        questionEn: "Which of the following is the indefinite integral ∫cos(x)dx?",
        options: [
          { id: "a", textFa: "sin(x) + C", textEn: "sin(x) + C" },
          { id: "b", textFa: "-sin(x) + C", textEn: "-sin(x) + C" },
          { id: "c", textFa: "cos(x) + C", textEn: "cos(x) + C" },
          { id: "d", textFa: "-cos(x) + C", textEn: "-cos(x) + C" },
        ],
        correctAnswer: "a",
        explanationFa: "انتگرال کسینوس برابر سینوس است: ∫cos(x)dx = sin(x) + C",
        explanationEn: "The integral of cosine is sine: ∫cos(x)dx = sin(x) + C",
      }
    ]
  };

  const handleGoBack = () => {
    setLocation("/dashboard");
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleToggleExplanation = (questionId: number) => {
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitQuiz = () => {
    // Calculate score and show results
    const correctCount = quiz.questions.filter(q => 
      selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const score = (correctCount / quiz.questions.length) * 100;
    
    alert(language === "fa" 
      ? `نمره شما: ${score}% (${correctCount} از ${quiz.questions.length} سوال)`
      : `Your score: ${score}% (${correctCount} out of ${quiz.questions.length} questions)`
    );
  };

  const BackIcon = language === "fa" ? ArrowLeft : ArrowRight;

  return (
    <div className="pb-20">
      <header className="bg-primary text-white p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoBack}
          className="text-white hover:bg-primary-dark"
        >
          <BackIcon className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">
          {quiz.title}
        </h1>
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-1" />
          <span>{quiz.timeRemaining}</span>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {quiz.questions.map((question, index) => (
          <Card key={question.id} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">
                  {t.question} {index + 1}
                </Badge>
                {selectedAnswers[question.id] && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {language === "fa" ? "پاسخ داده شده" : "Answered"}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {language === "fa" ? question.questionFa : question.questionEn}
              </h3>
              
              <RadioGroup 
                value={selectedAnswers[question.id] || ""} 
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                      <Label 
                        htmlFor={`${question.id}-${option.id}`} 
                        className="flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        {language === "fa" ? option.textFa : option.textEn}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {showExplanations[question.id] && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    {language === "fa" ? "توضیح:" : "Explanation:"}
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    {language === "fa" ? question.explanationFa : question.explanationEn}
                  </p>
                </div>
              )}

              <div className="mt-4 text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => handleToggleExplanation(question.id)}
                  className="text-primary"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  {showExplanations[question.id] ? 
                    (language === "fa" ? "مخفی کردن توضیحات" : "Hide Explanation") :
                    t.showExplanation
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="pt-6">
          <Button 
            onClick={handleSubmitQuiz}
            className="w-full py-3 text-lg font-semibold"
            size="lg"
          >
            {language === "fa" ? "ارسال آزمون" : "Submit Quiz"}
          </Button>
        </div>
      </div>
    </div>
  );
}
