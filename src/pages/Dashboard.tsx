import { useLocation, useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DemandPatternChart } from "@/components/DemandPatternChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowLeft, ArrowRight } from "lucide-react";

const Dashboard = () => {
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
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Product Selection</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">E-commerce Analytics Dashboard</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Analytics Overview for {selectedProduct}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <DashboardHeader />

        {/* Selected Product Info */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Product</CardTitle>
            <CardDescription>Current analysis focus</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-primary">{selectedProduct}</p>
          </CardContent>
        </Card>

        {/* Overall Demand Patterns */}
        <DemandPatternChart data={salesData} />

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Selection</span>
          </Button>
          <Button 
            onClick={() => navigate("/sales-forecast", { 
              state: { selectedProduct, salesData } 
            })}
            className="flex items-center space-x-2"
          >
            <span>View Sales Forecast</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;