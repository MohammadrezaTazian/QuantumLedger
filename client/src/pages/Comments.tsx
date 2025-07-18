import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, ArrowLeft, ThumbsUp, Reply, User } from "lucide-react";

export default function Comments() {
  const { t, language } = useLanguage();
  const [location, setLocation] = useLocation();
  const [newComment, setNewComment] = useState("");

  // Extract material/question ID from URL
  const urlParts = location.split("/");
  const type = urlParts[2]; // "material" or "question"
  const id = urlParts[3];

  // Mock comments data
  const comments = [
    {
      id: 1,
      content: language === "fa" ? 
        "آموزش بسیار مفیدی بود. توضیحات خیلی واضح و قابل فهم ارائه شده. ممنون از استاد." :
        "This was a very helpful tutorial. The explanations were very clear and understandable. Thank you, professor.",
      author: language === "fa" ? "سارا محمدی" : "Sara Mohammadi",
      timeAgo: language === "fa" ? "2 ساعت پیش" : "2 hours ago",
      likes: 3,
      replies: [
        {
          id: 2,
          content: language === "fa" ? 
            "خوشحالم که آموزش مفید بوده. موفق باشید." :
            "I'm glad the tutorial was helpful. Good luck!",
          author: language === "fa" ? "استاد احمدی" : "Prof. Ahmadi",
          timeAgo: language === "fa" ? "1 ساعت پیش" : "1 hour ago",
          isTeacher: true,
        }
      ]
    },
    {
      id: 3,
      content: language === "fa" ? 
        "لطفاً سوالات بیشتری از این مبحث اضافه کنید. خیلی مفید هستند." :
        "Please add more questions from this topic. They are very useful.",
      author: language === "fa" ? "محمد رضایی" : "Mohammad Rezaei",
      timeAgo: language === "fa" ? "5 ساعت پیش" : "5 hours ago",
      likes: 7,
      replies: []
    },
  ];

  const handleGoBack = () => {
    if (type === "material") {
      setLocation("/learning/1");
    } else {
      setLocation("/quiz/1");
    }
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    // In real app, this would submit to API
    console.log("Submitting comment:", newComment);
    setNewComment("");
  };

  const handleLikeComment = (commentId: number) => {
    // In real app, this would toggle like via API
    console.log("Toggle like for comment:", commentId);
  };

  const handleReplyComment = (commentId: number) => {
    // In real app, this would show reply form
    console.log("Reply to comment:", commentId);
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
        <h1 className="text-lg font-semibold">{t.comments}</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Comments List */}
        {comments.map((comment) => (
          <Card key={comment.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <Avatar className="w-8 h-8 mr-3">
                  <AvatarFallback className="bg-primary text-white">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {comment.author}
                  </h4>
                  <p className="text-xs text-gray-500">{comment.timeAgo}</p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {comment.content}
              </p>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLikeComment(comment.id)}
                  className="flex items-center text-gray-500 hover:text-primary text-sm"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{comment.likes}</span>
                </button>
                <button 
                  onClick={() => handleReplyComment(comment.id)}
                  className="flex items-center text-gray-500 hover:text-primary text-sm"
                >
                  <Reply className="w-4 h-4 mr-1" />
                  {language === "fa" ? "پاسخ" : "Reply"}
                </button>
              </div>
              
              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 mr-8 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Avatar className="w-6 h-6 mr-2">
                          <AvatarFallback className={`text-white text-xs ${reply.isTeacher ? 'bg-secondary' : 'bg-accent'}`}>
                            <User className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                            {reply.author}
                          </h5>
                          <p className="text-xs text-gray-500">{reply.timeAgo}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {/* Add Comment Form */}
        <Card>
          <CardContent className="p-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={language === "fa" ? "نظر خود را بنویسید..." : "Write your comment..."}
              className="resize-none mb-3"
              rows={3}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                size="sm"
              >
                {language === "fa" ? "ارسال نظر" : "Submit Comment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
