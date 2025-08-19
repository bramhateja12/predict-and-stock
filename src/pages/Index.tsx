import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductSelector } from "@/components/ProductSelector";
import { 
  generateProducts, 
  generateSalesData, 
  generateForecasts,
  SalesData
} from "@/utils/dataGenerator";
import { TrendingUp, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    // Generate initial data
    const productList = generateProducts();
    const rawSalesData = generateSalesData(productList, 90); // 90 days of data
    const forecastData = generateForecasts(rawSalesData);
    
    const productNames = productList.map(p => p.name);
    
    setSalesData(forecastData);
    setProducts(productNames);
    setSelectedProduct(productNames[0]);
  }, []);

  const handleAnalyzeClick = () => {
    if (selectedProduct) {
      navigate("/dashboard", { 
        state: { selectedProduct, salesData } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Supplement Sales Analytics</h1>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">
            Demand Forecasting and Inventory Optimization for Supplement Retail
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Product Selection */}
        <div className="max-w-2xl mx-auto">
          <ProductSelector 
            products={products}
            selectedProduct={selectedProduct}
            onProductChange={setSelectedProduct}
            onAnalyzeClick={handleAnalyzeClick}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-8 border-t">
          <div className="flex items-center justify-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <p>Demand Forecasting & Inventory Optimization System | Built with React & TypeScript</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
