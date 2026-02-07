import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone, ShieldCheck, CheckCircle2, Stethoscope } from "lucide-react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    // Move to OTP verification step
    setStep("otp");
  };

  const handleOtpSubmit = () => {
    if (otp.length === 4) {
      // Simulate OTP verification success
      navigate("/patient/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-[500px] animate-fade-up">
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
          <h1 className="text-2xl font-bold text-foreground">
            {step === "otp" ? t("auth.verifyPhone") : t("auth.createAccount")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {step === "otp" 
              ? t("auth.sentCode") 
              : t("auth.registerSubtitle")}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
          <div className="p-6">
            
            {step === "otp" ? (
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                
                <p className="text-muted-foreground mb-8">
                  {t("auth.enterCode")} <br/>
                  <span className="font-medium text-foreground">{formData.phone}</span>
                </p>

                <div className="flex justify-center mb-8">
                  <InputOTP
                    maxLength={4}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-12 text-lg border-border" />
                      <InputOTPSlot index={1} className="w-12 h-12 text-lg border-border" />
                      <InputOTPSlot index={2} className="w-12 h-12 text-lg border-border" />
                      <InputOTPSlot index={3} className="w-12 h-12 text-lg border-border" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mb-4"
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 4}
                >
                  {t("auth.verifyContinue")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <button
                  onClick={() => setStep("form")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← {t("auth.backToDetails")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
                {/* Full Name */}
                <div className="space-y-3">
                  <Label htmlFor="name">{t("auth.fullName")}</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-12 h-10 input-healthcare"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-3">
                  <Label htmlFor="phone">{t("auth.phoneLabel")}</Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-12 h-10 input-healthcare"
                      required
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-3">
                  <Label htmlFor="email">{t("auth.emailOptional")}</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-12 h-10 input-healthcare"
                    />
                  </div>
                </div>

                {/* Password Row */}
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-3">
                    <Label htmlFor="password">{t("auth.passwordLabel")}</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword">{t("auth.confirmPasswordLabel")}</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-12 pr-10 h-10 input-healthcare"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-destructive font-medium animate-pulse">
                    {t("auth.passwordMismatch")}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full mt-4 group"
                  disabled={!formData.name || !formData.phone || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                >
                  {t("auth.createAccount")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>

          <div className="bg-secondary/30 p-4 text-center border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              {t("auth.hasAccount")}{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                {t("auth.signInLink")}
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 mt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* You could add simple trust badges here if needed, or just keep it clean */}
        </div>
         <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground/80">
          <ShieldCheck className="w-4 h-4" />
          <span>{t("auth.secureConnection")}</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
