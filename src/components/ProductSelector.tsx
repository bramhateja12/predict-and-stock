import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductSelectorProps {
  products: string[];
  selectedProduct: string;
  onProductChange: (product: string) => void;
}

export const ProductSelector = ({ products, selectedProduct, onProductChange }: ProductSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Analysis</CardTitle>
        <CardDescription>Select a product to view detailed forecasting and inventory data</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedProduct} onValueChange={onProductChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product} value={product}>
                {product}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};