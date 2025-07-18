import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import BottomNavigation from "./BottomNavigation";
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export default function Layout({ children, showNavigation = true }: LayoutProps) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isRTL = language === "fa";

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg min-h-screen relative">
        {children}
        
        {user && showNavigation && (
          <>
            <BottomNavigation />
            <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          </>
        )}
      </div>
    </div>
  );
}
