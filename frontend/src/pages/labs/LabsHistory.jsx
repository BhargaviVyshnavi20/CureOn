import React, { useState } from "react";
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
  Download,
  Calendar,
  FileText
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/labs/dashboard", icon: LayoutDashboard },
  { name: "Test Requests", href: "/labs/requests", icon: FlaskConical },
  { name: "Results", href: "/labs/results", icon: FileBarChart },
  { name: "Equipment", href: "/labs/equipment", icon: Microscope },
  { name: "History", href: "/labs/history", icon: History },
  { name: "Settings", href: "/labs/settings", icon: Settings },
];

const LabsHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [historyData] = useState([
    {
      id: "LAB-006",
      patient: "John Doe",
      test: "Comprehensive Metabolic Panel",
      doctor: "Dr. Smith",
      date: "2024-02-01",
      result: "Normal",
      status: "Completed",
      technician: "Lab Tech Mike"
    },
    {
      id: "LAB-007",
      patient: "Jane Roe",
      test: "Lipid Profile",
      doctor: "Dr. Jones",
      date: "2024-01-31",
      result: "High Cholesterol",
      status: "Completed",
      technician: "Lab Tech Sarah"
    },
    {
      id: "LAB-008",
      patient: "Bob Brown",
      test: "CBC",
      doctor: "Dr. Smith",
      date: "2024-01-30",
      result: "Low Hemoglobin",
      status: "Completed",
      technician: "Lab Tech Mike"
    },
    {
      id: "LAB-009",
      patient: "Alice Green",
      test: "Thyroid Function",
      doctor: "Dr. White",
      date: "2024-01-28",
      result: "Normal",
      status: "Completed",
      technician: "Lab Tech Sarah"
    },
    {
      id: "LAB-010",
      patient: "Charlie Black",
      test: "Urinalysis",
      doctor: "Dr. Brown",
      date: "2024-01-25",
      result: "Infection Detected",
      status: "Completed",
      technician: "Lab Tech Mike"
    }
  ]);

  const filteredHistory = historyData.filter(record => 
    record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsDetailsOpen(true);
  };

  const handleExport = () => {
    toast.success("Exporting lab history to CSV...");
  };

  return (
    <DashboardLayout navItems={navItems} userType="labs">
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Lab History</h1>
            <p className="text-muted-foreground mt-1">Archive of completed tests and reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search history..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter Results
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Result Summary</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-xs">{record.id}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.patient}</TableCell>
                    <TableCell className="font-medium">{record.test}</TableCell>
                    <TableCell>{record.doctor}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        record.result.includes("Normal") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {record.result}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(record)}>
                        <FileText className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Test Record Details</DialogTitle>
            <DialogDescription>
              Complete record for {selectedRecord?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Patient:</span>
                <span className="col-span-3">{selectedRecord.patient}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Date:</span>
                <span className="col-span-3">{selectedRecord.date}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Test:</span>
                <span className="col-span-3">{selectedRecord.test}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Doctor:</span>
                <span className="col-span-3">{selectedRecord.doctor}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Result:</span>
                <span className="col-span-3 font-bold">{selectedRecord.result}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Technician:</span>
                <span className="col-span-3">{selectedRecord.technician}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
            <Button onClick={() => {
              toast.success("Report downloaded");
              setIsDetailsOpen(false);
            }}>
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default LabsHistory;
