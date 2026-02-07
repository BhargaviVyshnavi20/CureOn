import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Pill,
  ClipboardList,
  AlertCircle,
  Package,
  History,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

const navItems = [
  { name: "Dashboard", href: "/pharmacy/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/pharmacy/orders", icon: ClipboardList },
  { name: "Inventory", href: "/pharmacy/inventory", icon: Package },
  { name: "History", href: "/pharmacy/history", icon: History },
  { name: "Settings", href: "/pharmacy/settings", icon: Settings },
];

const PharmacyDashboard = () => {
  const { getUser } = useUser();
  const user = getUser("pharmacy");
  const navigate = useNavigate();

  const handleReorder = (itemName) => {
    toast.success(`Reorder request for ${itemName} sent to supplier`);
  };

  // Mock data for pharmacy stats
  const stats = [
    {
      title: "Pending Orders",
      value: "12",
      icon: Clock,
      description: "Requires immediate attention",
    },
    {
      title: "Processed Today",
      value: "45",
      icon: CheckCircle2,
      description: "Orders completed",
    },
    {
      title: "Low Stock Items",
      value: "8",
      icon: AlertCircle,
      description: "Reorder required",
    },
    {
      title: "Total Revenue",
      value: "$2,850",
      icon: TrendingUp,
      description: "Daily earnings",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      patient: "Emily Rodriguez",
      doctor: "Dr. Sarah Johnson",
      items: ["Amoxicillin 500mg", "Paracetamol"],
      status: "Pending",
      time: "10:30 AM",
    },
    {
      id: "ORD-002",
      patient: "Michael Chang",
      doctor: "Dr. James Wilson",
      items: ["Lisinopril 10mg"],
      status: "Processing",
      time: "11:15 AM",
    },
    {
      id: "ORD-003",
      patient: "Robert Smith",
      doctor: "Dr. Lisa Anderson",
      items: ["Atorvastatin 20mg", "Metformin 500mg"],
      status: "Ready",
      time: "09:45 AM",
    },
  ];

  return (
    <DashboardLayout navItems={navItems} userType="pharmacy">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              Pharmacy Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name || "Pharmacist"}
            </p>
          </div>
          <Button variant="hero" className="shrink-0" onClick={() => navigate("/pharmacy/orders")}>
            <Pill className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Orders & Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold text-lg">Recent Orders</h2>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/pharmacy/orders")}>
                View All
              </Button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {order.patient.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {order.patient}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {order.items.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {order.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions / Alerts */}
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="font-semibold text-lg">Inventory Alerts</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Amoxicillin 500mg", stock: 15, status: "Critical" },
                  { name: "Ibuprofen 400mg", stock: 42, status: "Low" },
                  { name: "Cetirizine 10mg", stock: 28, status: "Low" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Stock: {item.stock} units
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => handleReorder(item.name)}>
                      Reorder
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="w-full mt-6" onClick={() => navigate("/pharmacy/inventory")}>
                View Full Inventory
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PharmacyDashboard;
