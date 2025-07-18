import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [fontSize, setFontSize] = useState("medium");
  const [notifications, setNotifications] = useState(true);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleFontSizeChange = (direction: "increase" | "decrease") => {
    const sizes = ["small", "medium", "large"];
    const currentIndex = sizes.indexOf(fontSize);
    
    if (direction === "increase" && currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    } else if (direction === "decrease" && currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const getFontSizeLabel = () => {
    const labels = {
      small: language === "fa" ? "کوچک" : "Small",
      medium: language === "fa" ? "متوسط" : "Medium",
      large: language === "fa" ? "بزرگ" : "Large",
    };
    return labels[fontSize as keyof typeof labels];
  };

  return (
    <div className="pb-20">
      <header className="bg-primary text-white p-4">
        <h1 className="text-lg font-semibold text-center">{t.settings}</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Display Settings */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {language === "fa" ? "نمایش" : "Display"}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t.darkTheme}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Dark Theme
                  </p>
                </div>
                <Switch 
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t.fontSize}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Font Size
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleFontSizeChange("decrease")}
                    disabled={fontSize === "small"}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[60px] text-center">
                    {getFontSizeLabel()}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleFontSizeChange("increase")}
                    disabled={fontSize === "large"}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.language}
            </h3>
            
            <RadioGroup value={language} onValueChange={handleLanguageChange}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fa" id="fa" />
                  <Label 
                    htmlFor="fa" 
                    className="flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    فارسی
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label 
                    htmlFor="en" 
                    className="flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    English
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.notifications}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {language === "fa" ? "اعلان‌های جدید" : "New Notifications"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    New content notifications
                  </p>
                </div>
                <Switch 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
