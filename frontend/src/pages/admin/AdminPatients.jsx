import { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
import { Link } from "react-router-dom";
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddPatientModal from "@/components/admin/AddPatientModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Stethoscope,
  Calendar,
  Settings,
  Search,
  Mail,
  Phone,
  MoreVertical,
  UserPlus,
  Pencil,
  Trash2,
  Users,
  Pill,
  FlaskConical,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminPatients = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
  const [addPatientModalOpen, setAddPatientModalOpen] = useState(false);
  const [editPatientModalOpen, setEditPatientModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [patients, setPatients] = useState([
    { id: "1", name: "John Doe", age: 34, gender: "Male", email: "john.d@example.com", phone: "+1 (555) 123-4567", address: "123 Main St, New York", status: "active" },
    { id: "2", name: "Jane Smith", age: 28, gender: "Female", email: "jane.s@example.com", phone: "+1 (555) 234-5678", address: "456 Oak Ave, Los Angeles", status: "active" },
    { id: "3", name: "Robert Johnson", age: 45, gender: "Male", email: "robert.j@example.com", phone: "+1 (555) 345-6789", address: "789 Pine Ln, Chicago", status: "inactive" },
    { id: "4", name: "Emily Davis", age: 52, gender: "Female", email: "emily.d@example.com", phone: "+1 (555) 456-7890", address: "321 Elm St, Houston", status: "active" },
    { id: "5", name: "Michael Wilson", age: 60, gender: "Male", email: "michael.w@example.com", phone: "+1 (555) 567-8901", address: "654 Maple Dr, Phoenix", status: "active" },
  ]);

  const handlePatientAdded = (patientData) => {
    const newPatient = {
      id: Date.now().toString(),
      name: patientData.name,
      age: patientData.age,
      gender: patientData.gender,
      email: patientData.email,
      phone: patientData.phone,
      address: patientData.address,
      status: "active",
    };
    setPatients((prev) => [...prev, newPatient]);
  };

  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setEditPatientModalOpen(true);
  };

  const handleDeleteClick = (patientId) => {
    setPatients(patients.filter((p) => p.id !== patientId));
  };

  const handleEditSave = () => {
    if (editingPatient) {
      setPatients(patients.map((p) => (p.id === editingPatient.id ? editingPatient : p)));
      setEditPatientModalOpen(false);
      setEditingPatient(null);
    }
  };

  return (
    <DashboardLayout navItems={navItems} userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Patients</h1>
            <p className="text-muted-foreground mt-1">Manage registered patients</p>
          </div>
          <Button variant="hero" onClick={() => setAddPatientModalOpen(true)}>
            <UserPlus className="w-5 h-5" />
            Add Patient
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search patients..." className="pl-10" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <div 
              key={patient.id} 
<<<<<<< HEAD
              className="dashboard-card relative hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => navigate(`/admin/patients/${patient.id}`)}
=======
              className="dashboard-card relative hover:shadow-lg transition-all group"
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
            >
              <div className="block p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">{patient.name.split(" ")[0]?.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.age} years • {patient.gender}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                  {patient.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className={`badge-status ${patient.status === "active" ? "badge-success" : "badge-warning"} capitalize`}>{patient.status}</span>
                </div>
              </div>
              
              <div className="absolute top-5 right-5 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <button className="p-2 rounded-lg hover:bg-secondary">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditClick(patient)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(patient.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        open={addPatientModalOpen}
        onOpenChange={setAddPatientModalOpen}
        onPatientAdded={handlePatientAdded}
      />

      {/* Edit Patient Modal */}
      <Dialog open={editPatientModalOpen} onOpenChange={setEditPatientModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <Pencil className="w-5 h-5 text-primary" />
              Edit Patient
            </DialogTitle>
          </DialogHeader>
          {editingPatient && (
            <div className="py-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Patient Name</Label>
                <Input
                  id="edit-name"
                  value={editingPatient.name}
                  onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={editingPatient.age}
                    onChange={(e) => setEditingPatient({ ...editingPatient, age: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select
                    value={editingPatient.gender}
                    onValueChange={(value) => setEditingPatient({ ...editingPatient, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingPatient.email}
                    onChange={(e) => setEditingPatient({ ...editingPatient, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={editingPatient.phone}
                    onChange={(e) => setEditingPatient({ ...editingPatient, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={editingPatient.address}
                  onChange={(e) => setEditingPatient({ ...editingPatient, address: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setEditPatientModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="hero" onClick={handleEditSave} className="flex-1">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminPatients;
