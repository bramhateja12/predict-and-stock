import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InventoryOptimization } from "@/utils/dataGenerator";

interface InventoryTableProps {
  data: InventoryOptimization[];
}

export const InventoryTable = ({ data }: InventoryTableProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Low Stock":
        return "destructive";
      case "Overstock":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Low Stock":
        return "text-destructive";
      case "Overstock":
        return "text-muted-foreground";
      default:
        return "text-primary";
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
                    variant={getStatusVariant(item.status)}
                    className={getStatusColor(item.status)}
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