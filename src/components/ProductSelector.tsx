import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProductSelectorProps {
  products: string[];
  selectedProduct: string;
  onProductChange: (product: string) => void;
  onAnalyzeClick: () => void;
}

export const ProductSelector = ({ products, selectedProduct, onProductChange, onAnalyzeClick }: ProductSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Analysis</CardTitle>
        <CardDescription>Select a product to view detailed forecasting and inventory data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        
        {selectedProduct && (
          <Button 
            onClick={onAnalyzeClick}
            className="w-full flex items-center justify-center space-x-2"
          >
            <span>Start Analysis</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};