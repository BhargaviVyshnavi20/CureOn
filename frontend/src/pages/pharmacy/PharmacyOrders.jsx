import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  History,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Printer,
  FileText,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Dashboard", href: "/pharmacy/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/pharmacy/orders", icon: ClipboardList },
  { name: "Inventory", href: "/pharmacy/inventory", icon: Package },
  { name: "History", href: "/pharmacy/history", icon: History },
  { name: "Settings", href: "/pharmacy/settings", icon: Settings },
];

const PharmacyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    patientName: "",
    doctorName: "",
    medication: "",
    quantity: "",
    price: ""
  });

  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      patientName: "Emily Rodriguez",
      doctorName: "Dr. Sarah Johnson",
      date: "2024-02-03",
      time: "10:30 AM",
      status: "Pending",
      items: [
        { name: "Amoxicillin 500mg", quantity: "14 tabs", price: "$12.50" },
        { name: "Paracetamol 500mg", quantity: "10 tabs", price: "$5.00" }
      ],
      total: "$17.50"
    },
    {
      id: "ORD-002",
      patientName: "Michael Chang",
      doctorName: "Dr. James Wilson",
      date: "2024-02-03",
      time: "11:15 AM",
      status: "Processing",
      items: [
        { name: "Lisinopril 10mg", quantity: "30 tabs", price: "$25.00" }
      ],
      total: "$25.00"
    },
    {
      id: "ORD-003",
      patientName: "Robert Smith",
      doctorName: "Dr. Lisa Anderson",
      date: "2024-02-03",
      time: "09:45 AM",
      status: "Ready",
      items: [
        { name: "Atorvastatin 20mg", quantity: "30 tabs", price: "$30.00" },
        { name: "Metformin 500mg", quantity: "60 tabs", price: "$15.00" }
      ],
      total: "$45.00"
    },
    {
      id: "ORD-004",
      patientName: "Sarah Williams",
      doctorName: "Dr. Sarah Johnson",
      date: "2024-02-02",
      time: "02:20 PM",
      status: "Completed",
      items: [
        { name: "Ibuprofen 400mg", quantity: "20 tabs", price: "$8.00" }
      ],
      total: "$8.00"
    }
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleCreateOrder = () => {
    const newId = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
    const currentDate = new Date();
    const order = {
      id: newId,
      patientName: newOrder.patientName,
      doctorName: newOrder.doctorName,
      date: currentDate.toISOString().split('T')[0],
      time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Pending",
      items: [
        { 
          name: newOrder.medication, 
          quantity: newOrder.quantity, 
          price: `$${newOrder.price}` 
        }
      ],
      total: `$${newOrder.price}`
    };

    setOrders([order, ...orders]);
    setIsNewOrderOpen(false);
    setNewOrder({
      patientName: "",
      doctorName: "",
      medication: "",
      quantity: "",
      price: ""
    });
    toast.success("New order created successfully");
  };

  const handlePrint = () => {
    toast.success("Printing order list...");
    // In a real app, this would trigger window.print() or generate a PDF
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout navItems={navItems} userType="pharmacy">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              Medication Orders
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and process patient prescriptions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print List
            </Button>
            <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  New Order
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Order</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new prescription order.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="patient" className="text-right">
                      Patient
                    </Label>
                    <Input
                      id="patient"
                      value={newOrder.patientName}
                      onChange={(e) => setNewOrder({...newOrder, patientName: e.target.value})}
                      className="col-span-3"
                      placeholder="Patient Name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="doctor" className="text-right">
                      Doctor
                    </Label>
                    <Input
                      id="doctor"
                      value={newOrder.doctorName}
                      onChange={(e) => setNewOrder({...newOrder, doctorName: e.target.value})}
                      className="col-span-3"
                      placeholder="Dr. Name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="medication" className="text-right">
                      Medication
                    </Label>
                    <Input
                      id="medication"
                      value={newOrder.medication}
                      onChange={(e) => setNewOrder({...newOrder, medication: e.target.value})}
                      className="col-span-3"
                      placeholder="Medication Name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      value={newOrder.quantity}
                      onChange={(e) => setNewOrder({...newOrder, quantity: e.target.value})}
                      className="col-span-3"
                      placeholder="e.g. 10 tabs"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newOrder.price}
                      onChange={(e) => setNewOrder({...newOrder, price: e.target.value})}
                      className="col-span-3"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateOrder}>Create Order</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or order ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {["All", "Pending", "Processing", "Ready", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Order Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-medium text-muted-foreground">
                        {order.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{order.patientName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Prescribed by {order.doctorName} • {order.date} at {order.time}
                    </p>
                  </div>

                  {/* Items List */}
                  <div className="flex-1 lg:mx-8">
                    <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="font-medium">{item.name}</span>
                          <div className="flex gap-4 text-muted-foreground">
                            <span>{item.quantity}</span>
                            <span>{item.price}</span>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-sm">
                        <span>Total</span>
                        <span>{order.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="w-4 h-4 mr-2" />
                          Print Label
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {order.status === "Pending" && (
                      <Button size="sm" onClick={() => handleStatusChange(order.id, "Processing")}>Start Processing</Button>
                    )}
                    {order.status === "Processing" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(order.id, "Ready")}>
                        Mark Ready
                      </Button>
                    )}
                    {order.status === "Ready" && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(order.id, "Completed")}>
                        Mark Picked Up
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No orders found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PharmacyOrders;
