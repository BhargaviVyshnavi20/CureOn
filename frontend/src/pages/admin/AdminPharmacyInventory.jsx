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
  Filter,
  Plus,
  AlertTriangle,
  CheckCircle2
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

const AdminPharmacyInventory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [inventory, setInventory] = useState([
    { id: "MED-001", name: "Amoxicillin 500mg", category: "Antibiotics", stock: 1250, unit: "Capsules", price: "$12.99", status: "In Stock", expiry: "2025-12-31" },
    { id: "MED-002", name: "Paracetamol 650mg", category: "Analgesics", stock: 5000, unit: "Tablets", price: "$5.50", status: "In Stock", expiry: "2026-06-15" },
    { id: "MED-003", name: "Lisinopril 10mg", category: "Cardiovascular", stock: 45, unit: "Tablets", price: "$15.00", status: "Low Stock", expiry: "2025-08-20" },
    { id: "MED-004", name: "Metformin 500mg", category: "Antidiabetic", stock: 800, unit: "Tablets", price: "$8.75", status: "In Stock", expiry: "2025-11-10" },
    { id: "MED-005", name: "Atorvastatin 20mg", category: "Cardiovascular", stock: 0, unit: "Tablets", price: "$18.25", status: "Out of Stock", expiry: "2025-09-05" },
    { id: "MED-006", name: "Omeprazole 20mg", category: "Gastrointestinal", stock: 300, unit: "Capsules", price: "$10.50", status: "In Stock", expiry: "2026-01-25" },
    { id: "MED-007", name: "Ibuprofen 400mg", category: "Analgesics", stock: 1500, unit: "Tablets", price: "$6.99", status: "In Stock", expiry: "2026-03-10" },
  ]);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "In Stock": return "bg-green-100 text-green-800";
      case "Low Stock": return "bg-yellow-100 text-yellow-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Inventory & Stocks</h1>
              <p className="text-muted-foreground mt-1">Manage medicines availability and stock levels</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Medicine
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by medicine name or ID..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[200px]">
            <select 
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Analgesics">Analgesics</option>
              <option value="Cardiovascular">Cardiovascular</option>
              <option value="Antidiabetic">Antidiabetic</option>
              <option value="Gastrointestinal">Gastrointestinal</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id} className="group hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.stock}</span>
                      <span className="text-muted-foreground text-xs">{item.unit}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.expiry}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
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

export default AdminPharmacyInventory;
