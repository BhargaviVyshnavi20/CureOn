import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone, ShieldCheck, CheckCircle2, Stethoscope } from "lucide-react";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
=======
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68

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
<<<<<<< HEAD
  const { t } = useTranslation();
=======
<<<<<<< HEAD
  const { t } = useTranslation();
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
<<<<<<< HEAD
=======
=======
              MediCare
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {step === "otp" ? "Verify Phone" : "Create Account"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {step === "otp" 
              ? "We sent a code to your phone" 
              : "Join thousands of patients managing their health"}
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
<<<<<<< HEAD
                  {t("auth.enterCode")} <br/>
=======
<<<<<<< HEAD
                  {t("auth.enterCode")} <br/>
=======
                  Enter the 4-digit code sent to <br/>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
<<<<<<< HEAD
                  {t("auth.verifyContinue")}
=======
<<<<<<< HEAD
                  {t("auth.verifyContinue")}
=======
                  Verify & Continue
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <button
                  onClick={() => setStep("form")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
<<<<<<< HEAD
                  ← {t("auth.backToDetails")}
=======
<<<<<<< HEAD
                  ← {t("auth.backToDetails")}
=======
                  ← Back to details
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
                {/* Full Name */}
                <div className="space-y-3">
<<<<<<< HEAD
                  <Label htmlFor="name">{t("auth.fullName")}</Label>
=======
<<<<<<< HEAD
                  <Label htmlFor="name">{t("auth.fullName")}</Label>
=======
                  <Label htmlFor="name">Full Name</Label>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
<<<<<<< HEAD
                  <Label htmlFor="phone">{t("auth.phoneLabel")}</Label>
=======
<<<<<<< HEAD
                  <Label htmlFor="phone">{t("auth.phoneLabel")}</Label>
=======
                  <Label htmlFor="phone">Phone Number</Label>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
<<<<<<< HEAD
                  <Label htmlFor="email">{t("auth.emailOptional")}</Label>
=======
<<<<<<< HEAD
                  <Label htmlFor="email">{t("auth.emailOptional")}</Label>
=======
                  <Label htmlFor="email">Email (Optional)</Label>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
<<<<<<< HEAD
                      placeholder={t("auth.emailPlaceholder")}
=======
<<<<<<< HEAD
                      placeholder={t("auth.emailPlaceholder")}
=======
                      placeholder="name@example.com"
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-12 h-10 input-healthcare"
                    />
                  </div>
                </div>

                {/* Password Row */}
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-3">
<<<<<<< HEAD
                    <Label htmlFor="password">{t("auth.passwordLabel")}</Label>
=======
<<<<<<< HEAD
                    <Label htmlFor="password">{t("auth.passwordLabel")}</Label>
=======
                    <Label htmlFor="password">Password</Label>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
<<<<<<< HEAD
                    <Label htmlFor="confirmPassword">{t("auth.confirmPasswordLabel")}</Label>
=======
<<<<<<< HEAD
                    <Label htmlFor="confirmPassword">{t("auth.confirmPasswordLabel")}</Label>
=======
                    <Label htmlFor="confirmPassword">Confirm</Label>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
<<<<<<< HEAD
                    {t("auth.passwordMismatch")}
=======
<<<<<<< HEAD
                    {t("auth.passwordMismatch")}
=======
                    Passwords do not match
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
                  </p>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full mt-4 group"
                  disabled={!formData.name || !formData.phone || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                >
<<<<<<< HEAD
                  {t("auth.createAccount")}
=======
<<<<<<< HEAD
                  {t("auth.createAccount")}
=======
                  Create Account
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>

          <div className="bg-secondary/30 p-4 text-center border-t border-border/50">
            <p className="text-sm text-muted-foreground">
<<<<<<< HEAD
              {t("auth.hasAccount")}{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                {t("auth.signInLink")}
=======
<<<<<<< HEAD
              {t("auth.hasAccount")}{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                {t("auth.signInLink")}
=======
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
<<<<<<< HEAD
          <span>{t("auth.secureConnection")}</span>
=======
<<<<<<< HEAD
          <span>{t("auth.secureConnection")}</span>
=======
          <span>Secure, encrypted connection</span>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
        </div>
      </div>
    </div>
  );
};

export default Register;
