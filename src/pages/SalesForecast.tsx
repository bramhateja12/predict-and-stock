import { useLocation, useNavigate } from "react-router-dom";
import { SalesForecastChart } from "@/components/SalesForecastChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowLeft, ArrowRight } from "lucide-react";

const SalesForecast = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProduct, salesData } = location.state || {};

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
                onClick={() => navigate("/dashboard", { 
                  state: { selectedProduct, salesData } 
                })}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Sales Forecast Analysis</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Detailed sales forecasting for {selectedProduct}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Selected Product Info */}
        <Card>
          <CardHeader>
            <CardTitle>Forecast Analysis</CardTitle>
            <CardDescription>Historical data and predictions for {selectedProduct}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Analyzing sales patterns and generating forecasts based on historical trends, seasonality, and market conditions.</p>
          </CardContent>
        </Card>

        {/* Sales Forecast Chart */}
        <SalesForecastChart 
          data={salesData}
          selectedProduct={selectedProduct}
        />

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate("/dashboard", { 
              state: { selectedProduct, salesData } 
            })}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <Button 
            onClick={() => navigate("/inventory-optimization", { 
              state: { selectedProduct, salesData } 
            })}
            className="flex items-center space-x-2"
          >
            <span>View Inventory Optimization</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesForecast;