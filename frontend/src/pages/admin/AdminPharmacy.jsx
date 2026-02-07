import { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
=======
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
=======
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddPharmacyModal from "@/components/admin/AddPharmacyModal";
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
  LayoutDashboard,
  Stethoscope,
  Calendar,
  Settings,
<<<<<<< HEAD
  Mail,
  Phone,
=======
<<<<<<< HEAD
  Mail,
  Phone,
=======
  Search,
  Mail,
  Phone,
  MoreVertical,
  UserPlus,
  Pencil,
  Trash2,
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
  Users,
  Pill,
  FlaskConical,
  MapPin,
  FileText,
<<<<<<< HEAD
  Package,
  ShoppingCart,
  Activity,
  Clock
} from "lucide-react";
=======
<<<<<<< HEAD
  Package,
  ShoppingCart,
  Activity
} from "lucide-react";
=======
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
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
import { Label } from "@/components/ui/label";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminPharmacy = () => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
  const navigate = useNavigate();
  // Single CureOn Pharmacy Data
  const pharmacy = {
    id: "cureon-pharma-001",
    name: "CureOn Pharmacy",
    license: "PH-CUREON-001",
    email: "pharmacy@cureon.health",
    phone: "+1 (800) CURE-ON",
    address: "123 Health Tech Blvd, Innovation District",
    status: "active",
    orders: 1250,
    inventoryCount: 4500,
    pendingOrders: 12
<<<<<<< HEAD
  };

  const staff = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Head Pharmacist",
      contact: "+1 (555) 123-4567",
      email: "sarah.j@cureon.health",
      hours: "Mon-Fri: 8AM - 4PM",
      status: "On Duty"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Pharmacy Technician",
      contact: "+1 (555) 987-6543",
      email: "michael.c@cureon.health",
      hours: "Mon-Fri: 12PM - 8PM",
      status: "On Break"
    },
    {
      id: 3,
      name: "David Wilson",
      role: "Pharmacist",
      contact: "+1 (555) 456-7890",
      email: "david.w@cureon.health",
      hours: "Sat-Sun: 9AM - 5PM",
      status: "Off Duty"
    }
  ];

  return (
    <DashboardLayout navItems={navItems} userType="admin">
=======
=======
  const [addPharmacyModalOpen, setAddPharmacyModalOpen] = useState(false);
  const [editPharmacyModalOpen, setEditPharmacyModalOpen] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState(null);
  const [pharmacies, setPharmacies] = useState([
    { id: "1", name: "HealthPlus Pharmacy", license: "PH-12345", email: "contact@healthplus.com", phone: "+1 (555) 123-4567", address: "123 Main St, New York", status: "active", orders: 156 },
    { id: "2", name: "City Care Pharmacy", license: "PH-67890", email: "info@citycare.com", phone: "+1 (555) 234-5678", address: "456 Oak Ave, Los Angeles", status: "active", orders: 89 },
    { id: "3", name: "GreenCross Meds", license: "PH-11223", email: "support@greencross.com", phone: "+1 (555) 345-6789", address: "789 Pine Ln, Chicago", status: "pending", orders: 0 },
  ]);

  const handlePharmacyAdded = (pharmacyData) => {
    const newPharmacy = {
      id: Date.now().toString(),
      name: pharmacyData.name,
      license: pharmacyData.licenseNumber,
      email: pharmacyData.email,
      phone: pharmacyData.phone,
      address: pharmacyData.address,
      status: "pending",
      orders: 0,
    };
    setPharmacies((prev) => [...prev, newPharmacy]);
  };

  const handleEditClick = (pharmacy) => {
    setEditingPharmacy(pharmacy);
    setEditPharmacyModalOpen(true);
  };

  const handleDeleteClick = (pharmacyId) => {
    setPharmacies(pharmacies.filter((p) => p.id !== pharmacyId));
  };

  const handleEditSave = () => {
    if (editingPharmacy) {
      setPharmacies(pharmacies.map((p) => (p.id === editingPharmacy.id ? editingPharmacy : p)));
      setEditPharmacyModalOpen(false);
      setEditingPharmacy(null);
    }
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
  };

  return (
    <DashboardLayout navItems={navItems} userType="admin">
<<<<<<< HEAD
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Pharmacy Management</h1>
            <p className="text-muted-foreground mt-1">Manage CureOn's central pharmacy</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="dashboard-card relative hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Pill className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{pharmacy.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <FileText className="w-4 h-4" />
                      <span className="font-mono">{pharmacy.license}</span>
                      <span className="mx-2">•</span>
                      <span className="badge-status badge-success capitalize">{pharmacy.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                   <div className="text-right hidden md:block">
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-xl font-bold">{pharmacy.orders}</p>
                   </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                  <div className="p-2 bg-background rounded-full shadow-sm">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-sm">{pharmacy.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                  <div className="p-2 bg-background rounded-full shadow-sm">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium text-sm">{pharmacy.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                  <div className="p-2 bg-background rounded-full shadow-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="font-medium text-sm">{pharmacy.address}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  className="h-auto py-4 px-6 flex items-center justify-between group" 
                  variant="outline"
                  onClick={() => navigate("/admin/pharmacy/inventory")}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <Package className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">Inventory & Stocks</h3>
                      <p className="text-sm text-muted-foreground">Manage medicines, stock levels, and categories</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">{pharmacy.inventoryCount}</span>
                    <p className="text-xs text-muted-foreground">Items</p>
                  </div>
                </Button>

                <Button 
                  className="h-auto py-4 px-6 flex items-center justify-between group" 
                  variant="outline"
                  onClick={() => navigate("/admin/pharmacy/orders")}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-100 transition-colors">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">Orders History</h3>
                      <p className="text-sm text-muted-foreground">View and manage prescription orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">{pharmacy.pendingOrders}</span>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
<<<<<<< HEAD

          {/* Working Staff Section */}
          <div className="dashboard-card relative hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Working Staff</h3>
                    <p className="text-sm text-muted-foreground">Pharmacy staff details and schedule</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Contact Info</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((member) => (
                      <TableRow key={member.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-semibold">
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="w-3.5 h-3.5" />
                              <span>{member.contact}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="w-3.5 h-3.5" />
                              <span className="truncate">{member.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{member.hours}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.status === "On Duty" ? "bg-green-100 text-green-700" :
                            member.status === "On Break" ? "bg-yellow-100 text-yellow-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {member.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
=======
        </div>
      </div>
=======
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Pharmacy</h1>
            <p className="text-muted-foreground mt-1">Manage registered pharmacies</p>
          </div>
          <Button variant="hero" onClick={() => setAddPharmacyModalOpen(true)}>
            <UserPlus className="w-5 h-5" />
            Add Pharmacy
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search pharmacies..." className="pl-10" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pharmacies.map((pharmacy) => (
            <div 
              key={pharmacy.id} 
              className="dashboard-card relative hover:shadow-lg transition-all group"
            >
              <div className="block p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">{pharmacy.name.split(" ")[0]?.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{pharmacy.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="w-3 h-3" />
                        <span>{pharmacy.license}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{pharmacy.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{pharmacy.phone}</span>
                  </div>
                  {pharmacy.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{pharmacy.address}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className={`badge-status ${pharmacy.status === "active" ? "badge-success" : "badge-warning"} capitalize`}>{pharmacy.status}</span>
                  <span className="text-sm text-muted-foreground">{pharmacy.orders} orders</span>
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
                    <DropdownMenuItem onClick={() => handleEditClick(pharmacy)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(pharmacy.id)}
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

      {/* Add Pharmacy Modal */}
      <AddPharmacyModal
        open={addPharmacyModalOpen}
        onOpenChange={setAddPharmacyModalOpen}
        onPharmacyAdded={handlePharmacyAdded}
      />

      {/* Edit Pharmacy Modal */}
      <Dialog open={editPharmacyModalOpen} onOpenChange={setEditPharmacyModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <Pencil className="w-5 h-5 text-primary" />
              Edit Pharmacy
            </DialogTitle>
          </DialogHeader>
          {editingPharmacy && (
            <div className="py-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Pharmacy Name</Label>
                <Input
                  id="edit-name"
                  value={editingPharmacy.name}
                  onChange={(e) => setEditingPharmacy({ ...editingPharmacy, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-license">License Number</Label>
                <Input
                  id="edit-license"
                  value={editingPharmacy.license}
                  onChange={(e) => setEditingPharmacy({ ...editingPharmacy, license: e.target.value })}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingPharmacy.email}
                    onChange={(e) => setEditingPharmacy({ ...editingPharmacy, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={editingPharmacy.phone}
                    onChange={(e) => setEditingPharmacy({ ...editingPharmacy, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={editingPharmacy.address}
                  onChange={(e) => setEditingPharmacy({ ...editingPharmacy, address: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setEditPharmacyModalOpen(false)} className="flex-1">
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
>>>>>>> 3599b65a2cc45bdc1f17c837ebdb978d629db18b
>>>>>>> 59b8e7775cb7b7208d45d4938b5be65f2fcabc68
    </DashboardLayout>
  );
};

export default AdminPharmacy;
