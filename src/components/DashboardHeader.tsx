import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, AlertTriangle, DollarSign } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  variant: "default" | "success" | "warning" | "destructive";
}

const MetricCard = ({ title, value, change, icon, variant }: MetricCardProps) => {
  const variantStyles = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning", 
    destructive: "text-destructive"
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={variantStyles[variant]}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
};

export const DashboardHeader = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1% from last month"
        icon={<DollarSign className="h-4 w-4" />}
        variant="success"
      />
      <MetricCard
        title="Products in Stock"
        value="2,350"
        change="+180 new arrivals"
        icon={<Package className="h-4 w-4" />}
        variant="default"
      />
      <MetricCard
        title="Forecast Accuracy"
        value="87.3%"
        change="+2.5% improvement"
        icon={<TrendingUp className="h-4 w-4" />}
        variant="success"
      />
      <MetricCard
        title="Stock Alerts"
        value="12"
        change="5 critical levels"
        icon={<AlertTriangle className="h-4 w-4" />}
        variant="warning"
      />
    </div>
  );
};