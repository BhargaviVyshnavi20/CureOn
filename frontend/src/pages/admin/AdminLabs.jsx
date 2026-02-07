import { useState } from "react";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddLabModal from "@/components/admin/AddLabModal";
import AdminEquipmentIssuesModal from "@/components/admin/AdminEquipmentIssuesModal";
<<<<<<< HEAD
=======
=======
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddLabModal from "@/components/admin/AddLabModal";
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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
  FileText,
<<<<<<< HEAD
  AlertTriangle,
=======
<<<<<<< HEAD
  AlertTriangle,
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
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

<<<<<<< HEAD
export const navItems = [
=======
<<<<<<< HEAD
export const navItems = [
=======
const navItems = [
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminLabs = () => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
  const navigate = useNavigate();
  const [addLabModalOpen, setAddLabModalOpen] = useState(false);
  const [editLabModalOpen, setEditLabModalOpen] = useState(false);
  const [issuesModalOpen, setIssuesModalOpen] = useState(false);
  const [editingLab, setEditingLab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
<<<<<<< HEAD
=======
=======
  const [addLabModalOpen, setAddLabModalOpen] = useState(false);
  const [editLabModalOpen, setEditLabModalOpen] = useState(false);
  const [editingLab, setEditingLab] = useState(null);
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
  const [labs, setLabs] = useState([
    { id: "1", name: "BioTest Diagnostics", license: "LB-54321", email: "info@biotest.com", phone: "+1 (555) 123-4567", address: "123 Main St, New York", status: "active", requests: 342 },
    { id: "2", name: "QuickLab Services", license: "LB-98765", email: "contact@quicklab.com", phone: "+1 (555) 234-5678", address: "456 Oak Ave, Los Angeles", status: "active", requests: 120 },
    { id: "3", name: "Advanced Path Labs", license: "LB-24680", email: "support@advancedpath.com", phone: "+1 (555) 345-6789", address: "789 Pine Ln, Chicago", status: "pending", requests: 0 },
  ]);

  const handleLabAdded = (labData) => {
    const newLab = {
      id: Date.now().toString(),
      name: labData.name,
      license: labData.licenseNumber,
      email: labData.email,
      phone: labData.phone,
      address: labData.address,
      status: "pending",
      requests: 0,
    };
    setLabs((prev) => [...prev, newLab]);
  };

  const handleEditClick = (lab) => {
    setEditingLab(lab);
    setEditLabModalOpen(true);
  };

  const handleDeleteClick = (labId) => {
    setLabs(labs.filter((l) => l.id !== labId));
  };

  const handleEditSave = () => {
    if (editingLab) {
      setLabs(labs.map((l) => (l.id === editingLab.id ? editingLab : l)));
      setEditLabModalOpen(false);
      setEditingLab(null);
    }
  };

  return (
    <DashboardLayout navItems={navItems} userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Labs</h1>
            <p className="text-muted-foreground mt-1">Manage registered laboratories</p>
          </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setIssuesModalOpen(true)}>
              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
              Reported Issues
            </Button>
            <Button variant="hero" onClick={() => setAddLabModalOpen(true)}>
              <UserPlus className="w-5 h-5" />
              Add Lab
            </Button>
          </div>
<<<<<<< HEAD
=======
=======
          <Button variant="hero" onClick={() => setAddLabModalOpen(true)}>
            <UserPlus className="w-5 h-5" />
            Add Lab
          </Button>
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
          <Input 
            placeholder="Search labs..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labs
            .filter((lab) => 
              lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              lab.license.toLowerCase().includes(searchQuery.toLowerCase()) ||
              lab.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((lab) => (
            <div 
              key={lab.id} 
              className="dashboard-card relative hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => navigate(`/admin/labs/${lab.id}`)}
<<<<<<< HEAD
=======
=======
          <Input placeholder="Search labs..." className="pl-10" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labs.map((lab) => (
            <div 
              key={lab.id} 
              className="dashboard-card relative hover:shadow-lg transition-all group"
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
            >
              <div className="block p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">{lab.name.split(" ")[0]?.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{lab.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="w-3 h-3" />
                        <span>{lab.license}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{lab.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{lab.phone}</span>
                  </div>
                  {lab.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{lab.address}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className={`badge-status ${lab.status === "active" ? "badge-success" : "badge-warning"} capitalize`}>{lab.status}</span>
                  <span className="text-sm text-muted-foreground">{lab.requests} requests</span>
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
                    <DropdownMenuItem onClick={() => handleEditClick(lab)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(lab.id)}
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

      {/* Add Lab Modal */}
      <AddLabModal
        open={addLabModalOpen}
        onOpenChange={setAddLabModalOpen}
        onLabAdded={handleLabAdded}
      />

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      {/* Equipment Issues Modal */}
      <AdminEquipmentIssuesModal
        open={issuesModalOpen}
        onOpenChange={setIssuesModalOpen}
      />

<<<<<<< HEAD
=======
=======
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      {/* Edit Lab Modal */}
      <Dialog open={editLabModalOpen} onOpenChange={setEditLabModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <Pencil className="w-5 h-5 text-primary" />
              Edit Lab
            </DialogTitle>
          </DialogHeader>
          {editingLab && (
            <div className="py-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Lab Name</Label>
                <Input
                  id="edit-name"
                  value={editingLab.name}
                  onChange={(e) => setEditingLab({ ...editingLab, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-license">License Number</Label>
                <Input
                  id="edit-license"
                  value={editingLab.license}
                  onChange={(e) => setEditingLab({ ...editingLab, license: e.target.value })}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingLab.email}
                    onChange={(e) => setEditingLab({ ...editingLab, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={editingLab.phone}
                    onChange={(e) => setEditingLab({ ...editingLab, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={editingLab.address}
                  onChange={(e) => setEditingLab({ ...editingLab, address: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setEditLabModalOpen(false)} className="flex-1">
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

export default AdminLabs;
