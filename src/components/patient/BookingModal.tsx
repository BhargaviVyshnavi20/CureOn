import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Heart, Brain, Bone, Stethoscope, Eye, Baby, Smile, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingConfirmed?: (booking: BookingData) => void;
}

interface BookingData {
  specialization: string;
  date: Date;
  time: string;
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

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const BookingModal = ({ open, onOpenChange, onBookingConfirmed }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialization: "",
    date: undefined as Date | undefined,
    time: "",
  });

  const handleSpecializationSelect = (id: string) => {
    setFormData((prev) => ({ ...prev, specialization: id }));
    setStep(2);
  };

  const handleSubmit = () => {
    if (formData.date && formData.time && onBookingConfirmed) {
      onBookingConfirmed({
        specialization: formData.specialization,
        date: formData.date,
        time: formData.time,
      });
    }
    // Reset form and close modal
    setStep(1);
    setFormData({
      specialization: "",
      date: undefined,
      time: "",
    });
    onOpenChange(false);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      specialization: "",
      date: undefined,
      time: "",
    });
    onOpenChange(false);
  };

  const selectedSpec = specializations.find((s) => s.id === formData.specialization);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {step === 1 ? "Select Doctor Type" : "Choose Date & Time"}
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

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
                disabled={(date) => date < new Date()}
                className={cn("rounded-md border pointer-events-auto")}
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label>Select Time Slot</Label>
              <Select
                value={formData.time}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot">
                    {formData.time && (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {formData.time}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Booking Summary */}
            {formData.date && formData.time && (
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <h4 className="font-medium text-foreground mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Doctor: {selectedSpec?.name}</p>
                  <p>Date: {format(formData.date, "MMMM d, yyyy")}</p>
                  <p>Time: {formData.time}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button
                variant="hero"
                onClick={handleSubmit}
                className="flex-1"
                disabled={!formData.date || !formData.time}
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
