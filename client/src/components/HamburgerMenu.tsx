import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Info, HelpCircle, X } from "lucide-react";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();

  const menuItems = [
    { 
      id: "contact", 
      label: t.contactUs, 
      icon: Mail, 
      path: "/contact" 
    },
    { 
      id: "about", 
      label: language === "fa" ? "درباره ما" : "About Us", 
      icon: Info, 
      path: "/about" 
    },
    { 
      id: "help", 
      label: language === "fa" ? "راهنما" : "Help", 
      icon: HelpCircle, 
      path: "/help" 
    },
  ];

  const handleItemClick = (path: string) => {
    setLocation(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className={`absolute top-0 ${language === "fa" ? "right-0" : "left-0"} w-64 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {language === "fa" ? "منو" : "Menu"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.path)}
                className="w-full flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Icon className={`w-5 h-5 ${language === "fa" ? "ml-3" : "mr-3"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
