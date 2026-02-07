import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format, isWithinInterval, parseISO, startOfDay, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  History,
  Settings,
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  FileText
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const navItems = [
  { name: "Dashboard", href: "/pharmacy/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/pharmacy/orders", icon: ClipboardList },
  { name: "Inventory", href: "/pharmacy/inventory", icon: Package },
  { name: "History", href: "/pharmacy/history", icon: History },
  { name: "Settings", href: "/pharmacy/settings", icon: Settings },
];

const PharmacyHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(undefined);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Mock history data
  const history = [
    {
      id: "TRX-1001",
      date: "2024-02-01",
      time: "14:30",
      type: "Sale",
      details: "Order #ORD-004 - Ibuprofen",
      amount: "$8.00",
      status: "Completed",
      user: "Staff: John Doe"
    },
    {
      id: "TRX-1002",
      date: "2024-01-31",
      time: "11:15",
      type: "Restock",
      details: "Restock Amoxicillin (50 units)",
      amount: "-$250.00",
      status: "Completed",
      user: "Staff: Sarah Smith"
    },
    {
      id: "TRX-1003",
      date: "2024-01-30",
      time: "09:45",
      type: "Sale",
      details: "Order #ORD-005 - Metformin",
      amount: "$15.00",
      status: "Completed",
      user: "Staff: John Doe"
    },
    {
      id: "TRX-1004",
      date: "2024-01-28",
      time: "16:20",
      type: "Adjustment",
      details: "Expired Inventory Disposal",
      amount: "-$45.00",
      status: "Approved",
      user: "Admin: Manager"
    },
    {
      id: "TRX-1005",
      date: "2024-01-25",
      time: "10:00",
      type: "Sale",
      details: "Order #ORD-006 - Lisinopril",
      amount: "$25.00",
      status: "Completed",
      user: "Staff: Sarah Smith"
    }
  ];

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (date?.from) {
      const itemDate = parseISO(item.date);
      const fromDate = startOfDay(date.from);
      const toDate = date.to ? endOfDay(date.to) : endOfDay(date.from);
      
      matchesDate = isWithinInterval(itemDate, { start: fromDate, end: toDate });
    }

    let matchesType = true;
    if (selectedTypes.length > 0) {
      matchesType = selectedTypes.includes(item.type);
    }

    return matchesSearch && matchesDate && matchesType;
  });

  const handleExport = () => {
    toast.success("Exporting history to CSV...");
  };

  const handleViewDetails = (item) => {
    setSelectedTransaction(item);
    setIsViewDetailsOpen(true);
  };

  return (
    <DashboardLayout navItems={navItems} userType="pharmacy">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              Transaction History
            </h1>
            <p className="text-muted-foreground mt-1">
              View past sales, restocks, and inventory adjustments
            </p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[260px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Sale", "Restock", "Adjustment"].map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-xs">{item.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{item.date}</p>
                          <p className="text-muted-foreground text-xs">{item.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.type === "Sale" ? "bg-green-100 text-green-800" :
                          item.type === "Restock" ? "bg-blue-100 text-blue-800" :
                          "bg-orange-100 text-orange-800"
                        }`}>
                          {item.type}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{item.details}</TableCell>
                      <TableCell>
                        <span className={item.amount.startsWith("-") ? "text-destructive" : "text-green-600 font-medium"}>
                          {item.amount}
                        </span>
                      </TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.user}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(item)}>
                          <FileText className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                      No transactions found for the selected criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              View complete information for transaction {selectedTransaction?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Date:</span>
                <span className="col-span-3">{selectedTransaction.date} at {selectedTransaction.time}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Type:</span>
                <span className="col-span-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    selectedTransaction.type === "Sale" ? "bg-green-100 text-green-800" :
                    selectedTransaction.type === "Restock" ? "bg-blue-100 text-blue-800" :
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {selectedTransaction.type}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Details:</span>
                <span className="col-span-3">{selectedTransaction.details}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Amount:</span>
                <span className="col-span-3 font-medium text-lg">
                   <span className={selectedTransaction.amount.startsWith("-") ? "text-destructive" : "text-green-600"}>
                      {selectedTransaction.amount}
                   </span>
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Status:</span>
                <span className="col-span-3">{selectedTransaction.status}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">User:</span>
                <span className="col-span-3">{selectedTransaction.user}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
            <Button onClick={() => {
                toast.success(`Receipt for ${selectedTransaction?.id} printed`);
                setIsViewDetailsOpen(false);
            }}>
              Print Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PharmacyHistory;
