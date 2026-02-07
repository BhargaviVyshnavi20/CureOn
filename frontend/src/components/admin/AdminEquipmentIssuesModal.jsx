import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminEquipmentIssuesModal = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for admin view (includes Lab Name)
  const [issues] = useState([
    {
      id: "ISS-001",
      labName: "BioTest Diagnostics",
      equipmentName: "Centrifuge A",
      issueType: "Mechanical Failure",
      description: "Rotor making loud noise during operation",
      reportedDate: "2024-02-01",
      priority: "High",
      status: "Open"
    },
    {
      id: "ISS-002",
      labName: "QuickLab Services",
      equipmentName: "Chemistry Analyzer",
      issueType: "Calibration Error",
      description: "Failed daily calibration check",
      reportedDate: "2024-02-02",
      priority: "Medium",
      status: "In Progress"
    },
    {
      id: "ISS-003",
      labName: "BioTest Diagnostics",
      equipmentName: "Hematology Analyzer",
      issueType: "Software Glitch",
      description: "Screen freezes intermittently",
      reportedDate: "2024-01-28",
      priority: "Low",
      status: "Resolved"
    },
    {
      id: "ISS-004",
      labName: "Advanced Path Labs",
      equipmentName: "Microscope X200",
      issueType: "Lens Damage",
      description: "Cracked objective lens",
      reportedDate: "2024-02-05",
      priority: "High",
      status: "Open"
    }
  ]);

  const filteredIssues = issues.filter(issue => 
    issue.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.issueType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Equipment Reported Issues
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by lab, equipment, or issue..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="border rounded-md overflow-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lab Name</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.length > 0 ? (
                  filteredIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">{issue.labName}</TableCell>
                      <TableCell>{issue.equipmentName}</TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">{issue.issueType}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]" title={issue.description}>
                          {issue.description}
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{issue.reportedDate}</TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(issue.priority)}>
                          {issue.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No issues found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminEquipmentIssuesModal;
