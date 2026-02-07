import { useState } from "react";
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
  LayoutDashboard,
  Stethoscope,
  Calendar,
  Settings,
  Mail,
  Phone,
  Users,
  Pill,
  FlaskConical,
  MapPin,
  FileText,
  Package,
  ShoppingCart,
  Activity,
  Clock
} from "lucide-react";
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
    </DashboardLayout>
  );
};

export default AdminPharmacy;
