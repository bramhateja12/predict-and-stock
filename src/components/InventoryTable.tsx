import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InventoryOptimization } from "@/utils/dataGenerator";

interface InventoryTableProps {
  data: InventoryOptimization[];
}

export const InventoryTable = ({ data }: InventoryTableProps) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Low Stock":
        return "bg-destructive/10 text-destructive/80 border-destructive/20";
      case "Overstock":
        return "bg-secondary/10 text-secondary-foreground/70 border-secondary/20";
      default:
        return "bg-primary/10 text-primary/80 border-primary/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Optimization</CardTitle>
        <CardDescription>
          Supplement inventory levels, reorder points, and optimization recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Reorder Point</TableHead>
              <TableHead>Safety Stock</TableHead>
              <TableHead>Optimal Order Qty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Recommendation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.product}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.reorderPoint}</TableCell>
                <TableCell>{item.safetyStock}</TableCell>
                <TableCell className="font-semibold">
                  {item.optimalOrderQuantity}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={getStatusBadgeClass(item.status)}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs text-sm">
                  {item.recommendation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};