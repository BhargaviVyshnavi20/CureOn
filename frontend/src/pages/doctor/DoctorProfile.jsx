import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Settings,
  User,
  Camera,
  Save,
  Stethoscope,
  Award
} from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { name: "Patients", href: "/doctor/patients", icon: Users },
  { name: "Manage Availability", href: "/doctor/availability", icon: Clock },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
];

const DoctorProfile = () => {
  const { getUser, updateUser } = useUser();
  const doctorProfile = getUser("doctor");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(doctorProfile || {});

  useEffect(() => {
    if (doctorProfile) {
      setFormData(doctorProfile);
    }
  }, [doctorProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        toast.success("Profile image updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      updateUser("doctor", formData);
      setLoading(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };

  const handleCancel = () => {
    if (doctorProfile) {
      setFormData(doctorProfile);
      toast.info("Changes discarded");
    }
  };

  return (
    <DashboardLayout navItems={navItems} userType="doctor">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Doctor Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your professional and personal details</p>
        </div>

        {/* Profile Header & Image */}
        <div className="dashboard-card p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-4 border-background shadow-xl">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
              <Camera className="w-5 h-5" />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
          <div className="text-center sm:text-left space-y-2 flex-1">
            <h2 className="text-2xl font-bold">{formData.name}</h2>
            <p className="text-muted-foreground">{formData.specialty} | ID: #DR-2024-001</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Verified Specialist</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Top Rated</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="dashboard-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Professional Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Specialization</Label>
              <Input name="specialty" value={formData.specialty || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>License Number</Label>
              <Input name="licenseNumber" value={formData.licenseNumber || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Experience (Years)</Label>
              <Input type="text" name="experience" value={formData.experience || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Hospital / Clinic</Label>
              <Input name="hospital" value={formData.hospital || ''} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="dashboard-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Personal Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="name" value={formData.name || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input name="phone" value={formData.phone || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Save className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorProfile;
