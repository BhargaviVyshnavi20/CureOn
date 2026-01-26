import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Heart, Brain, Bone, Stethoscope, Eye, Baby, Smile } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const specializations = [
  { id: "general", name: "General Physician", icon: Stethoscope, description: "For general health checkups" },
  { id: "cardio", name: "Cardiologist", icon: Heart, description: "Heart and blood vessels" },
  { id: "neuro", name: "Neurologist", icon: Brain, description: "Brain and nervous system" },
  { id: "ortho", name: "Orthopedic", icon: Bone, description: "Bones and joints" },
  { id: "eye", name: "Ophthalmologist", icon: Eye, description: "Eye care specialist" },
  { id: "pedia", name: "Pediatrician", icon: Baby, description: "Child health specialist" },
  { id: "derma", name: "Dermatologist", icon: Smile, description: "Skin care specialist" },
];

const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    symptoms: "",
    specialization: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecializationSelect = (id: string) => {
    setFormData((prev) => ({ ...prev, specialization: id }));
    setStep(2);
  };

  const handleSubmit = () => {
    console.log("Booking submitted:", formData);
    // Reset form and close modal
    setStep(1);
    setFormData({
      patientName: "",
      age: "",
      gender: "",
      symptoms: "",
      specialization: "",
    });
    onOpenChange(false);
  };

  const handleBack = () => {
    setStep(1);
  };

  const selectedSpec = specializations.find((s) => s.id === formData.specialization);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {step === 1 ? "Select Doctor Type" : "Patient Details"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="py-4">
            <p className="text-muted-foreground mb-6">
              Choose the type of doctor you need based on your health concern
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {specializations.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => handleSpecializationSelect(spec.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left hover:border-primary hover:bg-primary/5 ${
                    formData.specialization === spec.id
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <spec.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{spec.name}</h3>
                      <p className="text-sm text-muted-foreground">{spec.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-6">
            {/* Selected Doctor Type */}
            {selectedSpec && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <selectedSpec.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{selectedSpec.name}</span>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={handleBack}>
                  Change
                </Button>
              </div>
            )}

            {/* Patient Name */}
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient's full name"
                value={formData.patientName}
                onChange={(e) => handleInputChange("patientName", e.target.value)}
              />
            </div>

            {/* Age and Gender */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-2">
              <Label htmlFor="symptoms">Describe Your Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="Tell us about your health concern in simple words..."
                value={formData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Example: "I have been having headaches for 3 days"
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button
                variant="hero"
                onClick={handleSubmit}
                className="flex-1"
                disabled={!formData.patientName || !formData.age || !formData.gender || !formData.symptoms}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
