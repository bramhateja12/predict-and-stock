import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SalesData } from "@/utils/dataGenerator";

interface SalesForecastChartProps {
  data: SalesData[];
  selectedProduct: string;
}

export const SalesForecastChart = ({ data, selectedProduct }: SalesForecastChartProps) => {
  const filteredData = data
    .filter(item => item.product === selectedProduct)
    .slice(-30) // Show last 30 days
    .map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      sales: item.sales,
      forecast: item.forecast || null
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Forecast - {selectedProduct}</CardTitle>
        <CardDescription>
          Historical sales data and forecast predictions for the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={filteredData}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Actual Sales"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};