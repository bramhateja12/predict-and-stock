import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SalesData } from "@/utils/dataGenerator";

interface DemandPatternChartProps {
  data: SalesData[];
}

export const DemandPatternChart = ({ data }: DemandPatternChartProps) => {
  // Aggregate data by date across all products
  const aggregatedData = data.reduce((acc, item) => {
    const existingEntry = acc.find(entry => entry.date === item.date);
    if (existingEntry) {
      existingEntry.totalSales += item.sales;
      existingEntry.totalRevenue += item.revenue;
      existingEntry.totalInventory += item.inventory;
    } else {
      acc.push({
        date: item.date,
        totalSales: item.sales,
        totalRevenue: item.revenue,
        totalInventory: item.inventory
      });
    }
    return acc;
  }, [] as { date: string; totalSales: number; totalRevenue: number; totalInventory: number }[]);

  // Sort by date and take last 30 days
  const chartData = aggregatedData
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30)
    .map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      sales: item.totalSales,
      revenue: Math.round(item.totalRevenue),
      inventory: Math.round(item.totalInventory / 1000) // Scale down for better visualization
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplement Sales Overview</CardTitle>
        <CardDescription>
          Daily sales performance and revenue trends across all supplement categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sales"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
              name="Total Sales Units"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="2"
              stroke="hsl(var(--accent))"
              fill="hsl(var(--accent))"
              fillOpacity={0.4}
              name="Revenue ($)"
            />
            <Area
              type="monotone"
              dataKey="inventory"
              stackId="3"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted))"
              fillOpacity={0.3}
              name="Inventory (K units)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};