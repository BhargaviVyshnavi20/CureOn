import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Copy, Check, Mail } from "lucide-react";
import { toast } from "sonner";

const specializations = [
  "General Physician",
  "Cardiologist",
  "Neurologist",
  "Orthopedic",
  "Dermatologist",
  "Pediatrician",
  "Ophthalmologist",
  "Psychiatrist",
  "ENT Specialist",
  "Gynecologist",
];

const AddDoctorModal = ({ open, onOpenChange, onDoctorAdded }) => {
  const [step, setStep] = useState("form");
  const [copied, setCopied] = useState(null);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    specialization: "",
    email: "",
    phone: "",
    experience: "",
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleSubmit = () => {
    // Generate credentials
    const generatedPassword = generatePassword();
    setCredentials({
      email: formData.email,
      password: generatedPassword,
    });
    setStep("credentials");
    
    if (onDoctorAdded) {
      onDoctorAdded(formData);
    }
  };

  const handleCopy = (type) => {
    const text = type === "email" ? credentials.email : credentials.password;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClose = () => {
    setStep("form");
    setFormData({
      name: "",
      age: "",
      specialization: "",
      email: "",
      phone: "",
      experience: "",
    });
    setCredentials({ email: "", password: "" });
    onOpenChange(false);
  };

  const handleSendEmail = async () => {
    setSending(true);
    try {
      const response = await fetch("http://localhost:8000/api/send-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          name: formData.name,
          role: "Doctor",
        }),
      });

      if (response.ok) {
        toast.success("Credentials sent to email successfully!");
        handleClose();
      } else {
        toast.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email");
    } finally {
      setSending(false);
    }
  };

  const isFormValid = formData.name && formData.age && formData.specialization && formData.email && formData.phone;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            {step === "form" ? "Add New Doctor" : "Doctor Credentials"}
          </DialogTitle>
        </DialogHeader>

        {step === "form" ? (
          <div className="py-4 space-y-5">
            {/* Doctor Name */}
            <div className="space-y-2">
              <Label htmlFor="doctorName">Doctor Name *</Label>
              <Input
                id="doctorName"
                placeholder="Dr. Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            {/* Age and Specialization */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization *</Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) => handleInputChange("specialization", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@medicare.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            {/* Experience (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience (Optional)</Label>
              <Input
                id="experience"
                type="number"
                placeholder="e.g., 5"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="hero"
                onClick={handleSubmit}
                className="flex-1"
                disabled={!isFormValid}
              >
                Generate Credentials
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-6">
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="text-success font-medium text-center">
                Doctor account created successfully!
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Login Email</Label>
                <div className="flex items-center gap-2">
                  <Input value={credentials.email} readOnly className="bg-secondary" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy("email")}
                  >
                    {copied === "email" ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Temporary Password</Label>
                <div className="flex items-center gap-2">
                  <Input value={credentials.password} readOnly className="bg-secondary font-mono" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy("password")}
                  >
                    {copied === "password" ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Please share these credentials with the doctor securely. They should change their password after first login.
            </p>

            <Button 
              variant="hero" 
              onClick={handleSendEmail} 
              className="w-full"
              disabled={sending}
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send to Email
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorModal;
