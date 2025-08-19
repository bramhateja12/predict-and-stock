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
      case "critical":
        return "destructive";
      case "low":
        return "default";
      case "overstock":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-destructive";
      case "low":
        return "text-warning";
      case "overstock":
        return "text-info";
      default:
        return "text-success";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Optimization</CardTitle>
        <CardDescription>
          Current stock levels, reorder points, and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Reorder Point</TableHead>
              <TableHead>Safety Stock</TableHead>
              <TableHead>Recommended Order</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.product}>
                <TableCell className="font-medium">{item.product}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.reorderPoint}</TableCell>
                <TableCell>{item.safetyStock}</TableCell>
                <TableCell className="font-semibold">
                  {item.recommendedOrder > 0 ? item.recommendedOrder : "—"}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={getStatusVariant(item.status)}
                    className={getStatusColor(item.status)}
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};