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
import { Label } from "@/components/ui/label";
import { CalendarDays, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RescheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentDetails?: {
    doctorName?: string;
    patientName?: string;
    currentDate: string;
    currentTime: string;
  };
  onConfirm?: (newDate: Date, newTime: string) => void;
}

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

const RescheduleModal = ({
  open,
  onOpenChange,
  appointmentDetails,
  onConfirm,
}: RescheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");

  const handleConfirm = () => {
    if (selectedDate && selectedTime && onConfirm) {
      onConfirm(selectedDate, selectedTime);
    }
    setSelectedDate(undefined);
    setSelectedTime("");
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedTime("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Reschedule Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {appointmentDetails && (
            <div className="p-3 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground">Current appointment:</p>
              <p className="font-medium text-foreground">
                {appointmentDetails.doctorName || appointmentDetails.patientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {appointmentDetails.currentDate} at {appointmentDetails.currentTime}
              </p>
            </div>
          )}

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select New Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className={cn("rounded-md border pointer-events-auto")}
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label>Select New Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot">
                  {selectedTime && (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedTime}
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

          {selectedDate && selectedTime && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">New appointment:</p>
              <p className="font-medium text-foreground">
                {format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="hero"
              onClick={handleConfirm}
              className="flex-1"
              disabled={!selectedDate || !selectedTime}
            >
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
