import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Settings,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navItems = [
  { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Manage Availability", href: "/doctor/availability", icon: Clock },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
];

const DoctorAvailability = () => {
  const [schedule, setSchedule] = useState([
    { day: "Monday", enabled: true, slots: [{ id: "1", start: "09:00", end: "12:00" }, { id: "2", start: "14:00", end: "17:00" }] },
    { day: "Tuesday", enabled: true, slots: [{ id: "3", start: "09:00", end: "12:00" }, { id: "4", start: "14:00", end: "17:00" }] },
    { day: "Wednesday", enabled: true, slots: [{ id: "5", start: "09:00", end: "12:00" }] },
    { day: "Thursday", enabled: true, slots: [{ id: "6", start: "09:00", end: "12:00" }, { id: "7", start: "14:00", end: "17:00" }] },
    { day: "Friday", enabled: true, slots: [{ id: "8", start: "09:00", end: "12:00" }] },
    { day: "Saturday", enabled: false, slots: [] },
    { day: "Sunday", enabled: false, slots: [] },
  ]);

  const timeOptions = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
  ];

  const toggleDay = (dayIndex) => {
    setSchedule((prev) =>
      prev.map((day, index) =>
        index === dayIndex ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const addSlot = (dayIndex) => {
    setSchedule((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              slots: [...day.slots, { id: Date.now().toString(), start: "09:00", end: "12:00" }],
            }
          : day
      )
    );
  };

  const removeSlot = (dayIndex, slotId) => {
    setSchedule((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? { ...day, slots: day.slots.filter((slot) => slot.id !== slotId) }
          : day
      )
    );
  };

  const updateSlot = (dayIndex, slotId, field, value) => {
    setSchedule((prev) =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              slots: day.slots.map((slot) =>
                slot.id === slotId ? { ...slot, [field]: value } : slot
              ),
            }
          : day
      )
    );
  };

  const handleSave = () => {
    toast.success("Availability schedule updated successfully");
  };

  return (
    <DashboardLayout
      navItems={navItems}
      userType="doctor"
    >
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              Manage Availability
            </h1>
            <p className="text-muted-foreground mt-1">
              Set your available days and time slots for appointments
            </p>
          </div>
          <Button variant="hero" onClick={handleSave}>
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
        </div>

        {/* Schedule */}
        <div className="space-y-4">
          {schedule.map((day, dayIndex) => (
            <div key={day.day} className="dashboard-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Switch
                    checked={day.enabled}
                    onCheckedChange={() => toggleDay(dayIndex)}
                    id={`toggle-${day.day}`}
                  />
                  <Label
                    htmlFor={`toggle-${day.day}`}
                    className={`font-semibold text-lg ${
                      day.enabled ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {day.day}
                  </Label>
                </div>
                {day.enabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSlot(dayIndex)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Slot
                  </Button>
                )}
              </div>

              {day.enabled && day.slots.length > 0 && (
                <div className="space-y-3 ml-12">
                  {day.slots.map((slot) => (
                    <div key={slot.id} className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Select
                          value={slot.start}
                          onValueChange={(value) => updateSlot(dayIndex, slot.id, "start", value)}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground">to</span>
                        <Select
                          value={slot.end}
                          onValueChange={(value) => updateSlot(dayIndex, slot.id, "end", value)}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeSlot(dayIndex, slot.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {day.enabled && day.slots.length === 0 && (
                <p className="text-sm text-muted-foreground ml-12">
                  No time slots added. Click "Add Slot" to set your availability.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="dashboard-card p-5 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Appointment Duration</h3>
              <p className="text-sm text-muted-foreground">
                Each appointment slot is 30 minutes by default. Patients can book within your available time slots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorAvailability;
