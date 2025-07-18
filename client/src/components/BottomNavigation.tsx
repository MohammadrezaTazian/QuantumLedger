import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, User, Settings } from "lucide-react";

export default function BottomNavigation() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { 
      id: "home", 
      label: t.home, 
      icon: Home, 
      path: "/dashboard" 
    },
    { 
      id: "profile", 
      label: t.profile, 
      icon: User, 
      path: "/profile" 
    },
    { 
      id: "settings", 
      label: t.settings, 
      icon: Settings, 
      path: "/settings" 
    },
  ];

  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 max-w-md mx-auto">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center py-2 px-4 ${
                isActive 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
