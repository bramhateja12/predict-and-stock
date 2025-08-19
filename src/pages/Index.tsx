import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProductSelector } from "@/components/ProductSelector";
import { SalesForecastChart } from "@/components/SalesForecastChart";
import { DemandPatternChart } from "@/components/DemandPatternChart";
import { InventoryTable } from "@/components/InventoryTable";
import { 
  generateProducts, 
  generateSalesData, 
  generateForecasts, 
  calculateInventoryOptimization,
  SalesData,
  InventoryOptimization 
} from "@/utils/dataGenerator";
import { TrendingUp, BarChart3 } from "lucide-react";

const Index = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryOptimization[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    // Generate initial data
    const productList = generateProducts();
    const rawSalesData = generateSalesData(productList, 90); // 90 days of data
    const forecastData = generateForecasts(rawSalesData);
    const inventoryOptimization = calculateInventoryOptimization(forecastData);
    
    const productNames = productList.map(p => p.name);
    
    setSalesData(forecastData);
    setInventoryData(inventoryOptimization);
    setProducts(productNames);
    setSelectedProduct(productNames[0]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">E-commerce Analytics Dashboard</h1>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">
            Demand Forecasting and Inventory Optimization System
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <DashboardHeader />

        {/* Product Selector */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProductSelector 
              products={products}
              selectedProduct={selectedProduct}
              onProductChange={setSelectedProduct}
            />
          </div>
          
          {/* Overall Demand Patterns */}
          <div className="lg:col-span-2">
            <DemandPatternChart data={salesData} />
          </div>
        </div>

        {/* Sales Forecast Chart */}
        {selectedProduct && (
          <SalesForecastChart 
            data={salesData}
            selectedProduct={selectedProduct}
          />
        )}

        {/* Inventory Optimization Table */}
        <InventoryTable data={inventoryData} />

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
