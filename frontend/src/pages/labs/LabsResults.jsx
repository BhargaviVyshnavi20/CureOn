import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FlaskConical,
  FileBarChart,
  Microscope,
  History,
  Settings,
  Search,
  Filter,
  FileText,
  Upload,
  CheckCircle2,
  ArrowUpDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Dashboard", href: "/labs/dashboard", icon: LayoutDashboard },
  { name: "Test Requests", href: "/labs/requests", icon: FlaskConical },
  { name: "Results", href: "/labs/results", icon: FileBarChart },
  { name: "Equipment", href: "/labs/equipment", icon: Microscope },
  { name: "History", href: "/labs/history", icon: History },
  { name: "Settings", href: "/labs/settings", icon: Settings },
];

const LabsResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [resultData, setResultData] = useState({ value: "", range: "", comments: "" });
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    status: [],
    priority: []
  });

  const [pendingTests, setPendingTests] = useState([
    {
      id: "LAB-001",
      patient: "Emily Rodriguez",
      test: "CBC",
      doctor: "Dr. Sarah Johnson",
      date: "2024-02-03",
      status: "In Progress",
      priority: "Routine"
    },
    {
      id: "LAB-003",
      patient: "Sarah Williams",
      test: "Urinalysis",
      doctor: "Dr. Lisa Anderson",
      date: "2024-02-03",
      status: "In Progress",
      priority: "Routine"
    },
    {
      id: "LAB-002",
      patient: "David Chen",
      test: "Thyroid Function",
      doctor: "Dr. Michael Chang",
      date: "2024-02-03",
      status: "Pending",
      priority: "Urgent"
    }
  ]);

  const handleOpenResultDialog = (test) => {
    setSelectedTest(test);
    setResultData({ value: "", range: "Normal", comments: "" });
    setIsResultDialogOpen(true);
  };

  const handleSubmitResult = () => {
    if (!selectedTest) return;

    // In a real app, this would send data to backend
    setPendingTests(pendingTests.filter(t => t.id !== selectedTest.id));
    
    toast.success(`Results for ${selectedTest.test} submitted successfully`);
    setIsResultDialogOpen(false);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const handleSortToggle = () => {
    setSortOrder(prev => prev === "desc" ? "asc" : "desc");
  };

  const handleBulkUpload = () => {
    toast.info("Opening bulk upload interface...");
  };

  const filteredTests = pendingTests.filter(test => {
    const matchesSearch = 
      test.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status.length === 0 || filters.status.includes(test.status);
    const matchesPriority = filters.priority.length === 0 || filters.priority.includes(test.priority);
    
    return matchesSearch && matchesStatus && matchesPriority;
  }).sort((a, b) => {
    if (sortOrder === "asc") {
      return a.date.localeCompare(b.date);
    }
    return b.date.localeCompare(a.date);
  });

  return (
    <DashboardLayout navItems={navItems} userType="labs">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Test Results</h1>
            <p className="text-muted-foreground mt-1">Enter and manage laboratory test results</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBulkUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
            <Button variant="outline" onClick={handleSortToggle}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={filters.status.length > 0 || filters.priority.length > 0 ? "bg-accent" : ""}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Status</h4>
                    <div className="flex flex-col gap-2">
                      {["Pending", "In Progress"].map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`status-${status}`} 
                            checked={filters.status.includes(status)}
                            onCheckedChange={() => handleFilterChange("status", status)}
                          />
                          <Label htmlFor={`status-${status}`}>{status}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Priority</h4>
                    <div className="flex flex-col gap-2">
                      {["Routine", "Urgent"].map((priority) => (
                        <div key={priority} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`priority-${priority}`} 
                            checked={filters.priority.includes(priority)}
                            onCheckedChange={() => handleFilterChange("priority", priority)}
                          />
                          <Label htmlFor={`priority-${priority}`}>{priority}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search pending tests..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.length > 0 ? (
                  filteredTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-mono font-medium">{test.id}</TableCell>
                      <TableCell>{test.patient}</TableCell>
                      <TableCell className="font-medium">{test.test}</TableCell>
                      <TableCell>{test.doctor}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          test.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {test.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={test.priority === "Urgent" ? "destructive" : "secondary"}>
                          {test.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" onClick={() => handleOpenResultDialog(test)}>
                          <FileText className="w-4 h-4 mr-2" />
                          Enter Results
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                      No pending tests found. Good job!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Enter Test Results</DialogTitle>
            <DialogDescription>
              Record findings for {selectedTest?.test} - {selectedTest?.patient}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="result-value">Result Value</Label>
                <Input 
                  id="result-value" 
                  placeholder="e.g. 12.5 g/dL"
                  value={resultData.value}
                  onChange={(e) => setResultData({...resultData, value: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ref-range">Reference Range</Label>
                <Input 
                  id="ref-range" 
                  placeholder="e.g. 11.0 - 16.0 g/dL"
                  value={resultData.range}
                  onChange={(e) => setResultData({...resultData, range: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comments">Clinical Notes / Comments</Label>
              <Textarea 
                id="comments" 
                placeholder="Enter any observations or notes..."
                rows={4}
                value={resultData.comments}
                onChange={(e) => setResultData({...resultData, comments: e.target.value})}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" size="sm" type="button" onClick={() => toast.info("File upload simulated")}>
                <Upload className="w-4 h-4 mr-2" />
                Attach File/Image
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResultDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitResult}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Submit Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default LabsResults;
