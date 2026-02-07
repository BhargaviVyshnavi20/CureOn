import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Stethoscope } from "lucide-react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate based on user type
    if (userType === "patient") {
      navigate("/patient/dashboard");
    } else if (userType === "doctor") {
      navigate("/doctor/dashboard");
    } else if (userType === "pharmacy") {
      navigate("/pharmacy/dashboard");
    } else if (userType === "labs") {
      navigate("/labs/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-[380px] animate-fade-up">
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
          <h1 className="text-2xl font-bold text-foreground">{t("auth.welcomeBack")}</h1>
          <p className="text-muted-foreground mt-2">{t("auth.signInSubtitle")}</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
          <div className="p-6">
            {/* User Type Selection */}
            <div className="mb-6 space-y-2">
              <Label>{t("auth.signInAs")}</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("auth.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">{t("auth.roles.patient")}</SelectItem>
                  <SelectItem value="doctor">{t("auth.roles.doctor")}</SelectItem>
                  <SelectItem value="admin">{t("auth.roles.admin")}</SelectItem>
                  <SelectItem value="pharmacy">{t("auth.roles.pharmacy")}</SelectItem>
                  <SelectItem value="labs">{t("auth.roles.labs")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

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

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("auth.passwordLabel")}</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs font-medium text-primary hover:text-primary-dark hover:underline transition-colors"
                  >
                    {t("auth.forgotPassword")}
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-10 h-10 input-healthcare"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full mt-2 group">
                {t("auth.signInBtn")} <span className="capitalize ml-1">{t(`auth.roles.${userType}`)}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
          
          <div className="bg-secondary/30 p-4 text-center border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              {t("auth.noAccount")}{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                {t("auth.createAccount")}
              </Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground/80">
          <ShieldCheck className="w-4 h-4" />
          <span>{t("auth.secureConnection")}</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
