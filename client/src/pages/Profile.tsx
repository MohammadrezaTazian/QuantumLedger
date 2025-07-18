import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, LogOut, Loader2 } from "lucide-react";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    educationLevel: user?.educationLevel || "",
  });

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error("Update profile error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const educationLevels = [
    { value: "math-physics", label: language === "fa" ? "کنکور ریاضی و فیزیک" : "Math & Physics" },
    { value: "experimental", label: language === "fa" ? "کنکور تجربی" : "Experimental Sciences" },
    { value: "humanities", label: language === "fa" ? "کنکور انسانی" : "Humanities" },
    { value: "sixth-grade", label: language === "fa" ? "استعداد درخشان پایه ششم" : "6th Grade Gifted" },
    { value: "ninth-grade", label: language === "fa" ? "استعداد درخشان پایه نهم" : "9th Grade Gifted" },
  ];

  const getDisplayName = () => {
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";
    return firstName || lastName ? `${firstName} ${lastName}`.trim() : (language === "fa" ? "کاربر" : "User");
  };

  const getLevelDisplayName = () => {
    const level = educationLevels.find(l => l.value === user?.educationLevel);
    return level ? level.label : (language === "fa" ? "انتخاب نشده" : "Not selected");
  };

  return (
    <div className="pb-20">
      <header className="bg-primary text-white p-4">
        <h1 className="text-lg font-semibold text-center">{t.profile}</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Profile Summary */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-white w-8 h-8" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {getDisplayName()}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user?.phone}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getLevelDisplayName()}
            </p>
          </CardContent>
        </Card>

        {/* Personal Information Form */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.personalInfo}
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.firstName}
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder={language === "fa" ? "نام خود را وارد کنید" : "Enter your first name"}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.lastName}
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder={language === "fa" ? "نام خانوادگی خود را وارد کنید" : "Enter your last name"}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="educationLevel" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.educationLevel}
                </Label>
                <Select
                  value={formData.educationLevel}
                  onValueChange={(value) => setFormData({ ...formData, educationLevel: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={language === "fa" ? "انتخاب کنید" : "Select level"} />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleUpdateProfile}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {t.updateProfile}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full flex items-center justify-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
