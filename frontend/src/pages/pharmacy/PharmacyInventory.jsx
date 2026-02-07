import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  LayoutDashboard,
  ClipboardList,
  Package,
  History,
  Settings,
  Search,
  Filter,
  Plus,
  AlertTriangle,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const PharmacyInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [isUpdateStockOpen, setIsUpdateStockOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stockUpdateValue, setStockUpdateValue] = useState("");
  
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    stock: "",
    minStock: "",
    price: "",
    expiry: "",
    supplier: ""
  });

  // Mock inventory data
  const [inventory, setInventory] = useState([
    {
      id: "MED-001",
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      stock: 15,
      minStock: 20,
      price: "$12.50",
      expiry: "2025-06-15",
      supplier: "PharmaCorp Inc."
    },
    {
      id: "MED-002",
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      stock: 150,
      minStock: 50,
      price: "$5.00",
      expiry: "2026-01-20",
      supplier: "MediSupply Co."
    },
    {
      id: "MED-003",
      name: "Lisinopril 10mg",
      category: "Cardiovascular",
      stock: 45,
      minStock: 30,
      price: "$25.00",
      expiry: "2025-09-10",
      supplier: "HeartHealth Ltd."
    },
    {
      id: "MED-004",
      name: "Ibuprofen 400mg",
      category: "Pain Relief",
      stock: 42,
      minStock: 40,
      price: "$8.00",
      expiry: "2025-12-01",
      supplier: "MediSupply Co."
    },
    {
      id: "MED-005",
      name: "Cetirizine 10mg",
      category: "Antihistamine",
      stock: 28,
      minStock: 30,
      price: "$6.50",
      expiry: "2025-08-15",
      supplier: "AllergyCare Inc."
    },
    {
      id: "MED-006",
      name: "Metformin 500mg",
      category: "Antidiabetic",
      stock: 85,
      minStock: 40,
      price: "$15.00",
      expiry: "2026-03-10",
      supplier: "DiabetesCare Solutions"
    }
  ]);

  const handleAddItem = () => {
    const newId = `MED-${String(inventory.length + 1).padStart(3, '0')}`;
    const item = {
      id: newId,
      ...newItem,
      stock: parseInt(newItem.stock) || 0,
      minStock: parseInt(newItem.minStock) || 0,
      price: newItem.price.startsWith('$') ? newItem.price : `$${newItem.price}`
    };

    setInventory([...inventory, item]);
    setIsAddItemOpen(false);
    setNewItem({
      name: "",
      category: "",
      stock: "",
      minStock: "",
      price: "",
      expiry: "",
      supplier: ""
    });
    toast.success("New item added to inventory");
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
    toast.success("Item removed from inventory");
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditItemOpen(true);
  };

  const handleUpdateStockClick = (item) => {
    setSelectedItem(item);
    setStockUpdateValue("");
    setIsUpdateStockOpen(true);
  };

  const handleSaveEdit = () => {
    setInventory(inventory.map(item => 
      item.id === selectedItem.id ? selectedItem : item
    ));
    setIsEditItemOpen(false);
    toast.success("Item details updated successfully");
  };

  const handleSaveStock = () => {
    const stockChange = parseInt(stockUpdateValue);
    if (isNaN(stockChange)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    setInventory(inventory.map(item => 
      item.id === selectedItem.id 
        ? { ...item, stock: item.stock + stockChange } 
        : item
    ));
    setIsUpdateStockOpen(false);
    toast.success("Stock updated successfully");
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout navItems={navItems} userType="pharmacy">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              Inventory Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Track stock levels and manage medicine supplies
            </p>
          </div>
          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>
                  Enter the details for the new medicine or supply item.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="Medicine Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      placeholder="e.g. Antibiotics"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Current Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Min Stock Alert</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({...newItem, minStock: e.target.value})}
                      placeholder="10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newItem.expiry}
                      onChange={(e) => setNewItem({...newItem, expiry: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    placeholder="Supplier Name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddItem}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Edit Item Dialog */}
          <Dialog open={isEditItemOpen} onOpenChange={setIsEditItemOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Inventory Item</DialogTitle>
                <DialogDescription>
                  Update the details for this medicine or supply item.
                </DialogDescription>
              </DialogHeader>
              {selectedItem && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Item Name</Label>
                      <Input
                        id="edit-name"
                        value={selectedItem.name}
                        onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <Input
                        id="edit-category"
                        value={selectedItem.category}
                        onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-stock">Current Stock</Label>
                      <Input
                        id="edit-stock"
                        type="number"
                        value={selectedItem.stock}
                        onChange={(e) => setSelectedItem({...selectedItem, stock: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-minStock">Min Stock Alert</Label>
                      <Input
                        id="edit-minStock"
                        type="number"
                        value={selectedItem.minStock}
                        onChange={(e) => setSelectedItem({...selectedItem, minStock: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price ($)</Label>
                      <Input
                        id="edit-price"
                        value={selectedItem.price}
                        onChange={(e) => setSelectedItem({...selectedItem, price: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-expiry">Expiry Date</Label>
                      <Input
                        id="edit-expiry"
                        type="date"
                        value={selectedItem.expiry}
                        onChange={(e) => setSelectedItem({...selectedItem, expiry: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-supplier">Supplier</Label>
                    <Input
                      id="edit-supplier"
                      value={selectedItem.supplier}
                      onChange={(e) => setSelectedItem({...selectedItem, supplier: e.target.value})}
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button type="submit" onClick={handleSaveEdit}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Update Stock Dialog */}
          <Dialog open={isUpdateStockOpen} onOpenChange={setIsUpdateStockOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Stock Level</DialogTitle>
                <DialogDescription>
                  Add or remove stock for {selectedItem?.name}. Use negative numbers to remove stock.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="current-stock" className="text-right">
                    Current
                  </Label>
                  <Input
                    id="current-stock"
                    value={selectedItem?.stock || 0}
                    disabled
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock-change" className="text-right">
                    Adjustment
                  </Label>
                  <Input
                    id="stock-change"
                    type="number"
                    value={stockUpdateValue}
                    onChange={(e) => setStockUpdateValue(e.target.value)}
                    className="col-span-3"
                    placeholder="+10 or -5"
                    autoFocus
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSaveStock}>Update Stock</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <h3 className="text-2xl font-bold">{inventory.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
              <h3 className="text-2xl font-bold text-destructive">
                {inventory.filter(i => i.stock <= i.minStock).length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <h3 className="text-2xl font-bold">$1,245.50</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-700 font-bold">$</span>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Details</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          item.stock <= item.minStock ? "text-destructive" : "text-green-600"
                        }`}>
                          {item.stock}
                        </span>
                        {item.stock <= item.minStock && (
                          <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded-full">
                            Low
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.expiry}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(item)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStockClick(item)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Update Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PharmacyInventory;
