import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, Youtube, Instagram } from "lucide-react";
import { SiTelegram, SiX } from "react-icons/si";

export default function Contact() {
  const { t, language } = useLanguage();

  const socialLinks = [
    {
      name: language === "fa" ? "تلگرام" : "Telegram",
      icon: SiTelegram,
      url: "https://t.me/educational_platform",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800",
    },
    {
      name: "X (Twitter)",
      icon: SiX,
      url: "https://twitter.com/educational_platform",
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500",
    },
    {
      name: language === "fa" ? "یوتیوب" : "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@educational_platform",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800",
    },
    {
      name: language === "fa" ? "اینستاگرام" : "Instagram",
      icon: Instagram,
      url: "https://instagram.com/educational_platform",
      color: "text-pink-500",
      bgColor: "bg-pink-50 dark:bg-pink-900 hover:bg-pink-100 dark:hover:bg-pink-800",
    },
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="pb-20">
      <header className="bg-primary text-white p-4">
        <h1 className="text-lg font-semibold text-center">{t.contactUs}</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Email Contact */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-white w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t.email}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              info@educational-platform.com
            </p>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.socialMedia}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => handleSocialClick(social.url)}
                    className={`flex items-center p-3 rounded-lg transition-colors ${social.bgColor}`}
                  >
                    <Icon className={`w-5 h-5 ${social.color} ${language === "fa" ? "ml-3" : "mr-3"}`} />
                    <span className="text-gray-900 dark:text-white">{social.name}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Contact Information */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {language === "fa" ? "اطلاعات تماس" : "Contact Information"}
            </h3>
            
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-white">
                  {language === "fa" ? "ساعات پاسخگویی:" : "Response Hours:"}
                </strong>
                <br />
                {language === "fa" ? 
                  "شنبه تا چهارشنبه: 9:00 - 18:00" : 
                  "Saturday to Wednesday: 9:00 AM - 6:00 PM"
                }
              </p>
              
              <p>
                <strong className="text-gray-900 dark:text-white">
                  {language === "fa" ? "زمان پاسخ:" : "Response Time:"}
                </strong>
                <br />
                {language === "fa" ? 
                  "معمولاً در کمتر از 24 ساعت" : 
                  "Usually within 24 hours"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
