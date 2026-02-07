import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, ArrowLeft, Stethoscope } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success(t("auth.forgotPasswordPage.toastSuccess"));
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-[400px] animate-fade-up">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Stethoscope className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">
              {t("landing.brandName")}
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{t("auth.forgotPasswordPage.title")}</h1>
          <p className="text-muted-foreground mt-2">
            {isSubmitted 
              ? t("auth.forgotPasswordPage.successSubtitle")
              : t("auth.forgotPasswordPage.subtitle")}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
          <div className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email">{t("auth.emailLabel")}</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-10 input-healthcare"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full group">
                  {t("auth.forgotPasswordPage.sendLink")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-success" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {/* We have sent a password reset link to <span className="font-medium text-foreground">{email}</span>. Please check your inbox and spam folder. */}
                  <span dangerouslySetInnerHTML={{ 
                    __html: t("auth.forgotPasswordPage.sentMessage", { 
                      email: `<span class="font-medium text-foreground">${email}</span>` 
                    }) 
                  }} />
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  {t("auth.forgotPasswordPage.tryAnother")}
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-secondary/30 p-4 text-center border-t border-border/50">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("auth.forgotPasswordPage.backToSignIn")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
