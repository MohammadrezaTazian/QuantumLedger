import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import LevelSelection from "@/pages/LevelSelection";
import Dashboard from "@/pages/Dashboard";
import Topics from "@/pages/Topics";
import Learning from "@/pages/Learning";
import Quiz from "@/pages/Quiz";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Contact from "@/pages/Contact";
import Comments from "@/pages/Comments";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  // Check if user has selected education level for protected routes
  const selectedLevel = localStorage.getItem("selectedLevel");
  if (!selectedLevel) {
    return <Redirect to="/level-selection" />;
  }

  return <>{children}</>;
}

function LevelSelectionRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  // If user has already selected level, redirect to dashboard
  const selectedLevel = localStorage.getItem("selectedLevel");
  if (selectedLevel) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    // Check if user has selected education level
    const selectedLevel = localStorage.getItem("selectedLevel");
    if (!selectedLevel) {
      return <Redirect to="/level-selection" />;
    }
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/login">
        <PublicRoute>
          <Layout showNavigation={false}>
            <Login />
          </Layout>
        </PublicRoute>
      </Route>
      
      <Route path="/level-selection">
        <LevelSelectionRoute>
          <Layout showNavigation={false}>
            <LevelSelection />
          </Layout>
        </LevelSelectionRoute>
      </Route>
      
      <Route path="/dashboard">
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/topics/:subjectId">
        <ProtectedRoute>
          <Layout>
            <Topics />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/learning/:topicId">
        <ProtectedRoute>
          <Layout>
            <Learning />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/quiz/:subjectId">
        <ProtectedRoute>
          <Layout>
            <Quiz />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/profile">
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/settings">
        <ProtectedRoute>
          <Layout>
            <Settings />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/contact">
        <ProtectedRoute>
          <Layout>
            <Contact />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/comments/:type/:id">
        <ProtectedRoute>
          <Layout>
            <Comments />
          </Layout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/">
        <Redirect to="/login" />
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Toaster />
              <Router />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
