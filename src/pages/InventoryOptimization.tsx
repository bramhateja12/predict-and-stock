import { useLocation, useNavigate } from "react-router-dom";
import { InventoryTable } from "@/components/InventoryTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ArrowLeft } from "lucide-react";
import { calculateInventoryOptimization, generateForecasts } from "@/utils/dataGenerator";
import { useMemo } from "react";

const InventoryOptimization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProduct, salesData } = location.state || {};

  const inventoryData = useMemo(() => {
    if (!salesData) return [];
    const forecastData = generateForecasts(salesData);
    return calculateInventoryOptimization(forecastData);
  }, [salesData]);

  if (!selectedProduct || !salesData) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/sales-forecast", { 
                  state: { selectedProduct, salesData } 
                })}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Sales Forecast</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Inventory Optimization</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Optimal inventory levels and recommendations for {selectedProduct}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Selected Product Info */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Strategy</CardTitle>
            <CardDescription>Optimization recommendations for {selectedProduct}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Advanced algorithms analyze demand patterns to recommend optimal reorder points, safety stock levels, and inventory policies to minimize costs while avoiding stockouts.</p>
          </CardContent>
        </Card>

        {/* Inventory Optimization Table */}
        <InventoryTable data={inventoryData} />

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate("/sales-forecast", { 
              state: { selectedProduct, salesData } 
            })}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sales Forecast</span>
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <span>Start New Analysis</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryOptimization;