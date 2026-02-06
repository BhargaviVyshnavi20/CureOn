import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Users,
  Pill,
  FlaskConical,
  ArrowLeft,
  Search,
  Eye,
  Check,
  X,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Pharmacy", href: "/admin/pharmacy", icon: Pill },
  { name: "Labs", href: "/admin/labs", icon: FlaskConical },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminPharmacyOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [orders, setOrders] = useState([
    { id: "ORD-2024-001", patient: "John Doe", doctor: "Dr. Smith", date: "2024-02-20", items: 3, total: "$45.50", status: "Pending" },
    { id: "ORD-2024-002", patient: "Sarah Johnson", doctor: "Dr. Emily Brown", date: "2024-02-19", items: 1, total: "$12.99", status: "Completed" },
    { id: "ORD-2024-003", patient: "Michael Chen", doctor: "Dr. James Wilson", date: "2024-02-19", items: 5, total: "$120.00", status: "Processing" },
    { id: "ORD-2024-004", patient: "Emma Davis", doctor: "Dr. Sarah Lee", date: "2024-02-18", items: 2, total: "$35.75", status: "Cancelled" },
    { id: "ORD-2024-005", patient: "Robert Wilson", doctor: "Dr. Smith", date: "2024-02-18", items: 4, total: "$89.50", status: "Completed" },
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case "Completed": return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none">Completed</Badge>;
      case "Processing": return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">Processing</Badge>;
      case "Pending": return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">Pending</Badge>;
      case "Cancelled": return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-none">Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout navItems={navItems} userType="admin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col gap-4">
          <Button 
            variant="ghost" 
            className="w-fit -ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/admin/pharmacy")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pharmacy
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Orders History</h1>
              <p className="text-muted-foreground mt-1">Track and manage prescription orders</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by patient or Order ID..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[200px]">
            <select 
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Prescribed By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="group hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.patient}</TableCell>
                  <TableCell className="text-muted-foreground">{order.doctor}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPharmacyOrders;
