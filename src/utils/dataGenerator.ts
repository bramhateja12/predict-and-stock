// Data simulation utilities for e-commerce sales data

export interface SalesData {
  date: string;
  product: string;
  sales: number;
  inventory: number;
  forecast?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  seasonalityFactor: number;
}

// Generate realistic e-commerce products
export const generateProducts = (): Product[] => [
  { id: "PROD001", name: "Wireless Headphones", category: "Electronics", basePrice: 199.99, seasonalityFactor: 1.2 },
  { id: "PROD002", name: "Running Shoes", category: "Sports", basePrice: 129.99, seasonalityFactor: 0.8 },
  { id: "PROD003", name: "Coffee Maker", category: "Home", basePrice: 89.99, seasonalityFactor: 1.5 },
  { id: "PROD004", name: "Winter Jacket", category: "Clothing", basePrice: 159.99, seasonalityFactor: 2.0 },
  { id: "PROD005", name: "Smartphone Case", category: "Electronics", basePrice: 24.99, seasonalityFactor: 1.1 }
];

// Generate sales data with seasonality and noise
export const generateSalesData = (products: Product[], days: number = 365): SalesData[] => {
  const data: SalesData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  products.forEach(product => {
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      
      // Base demand with trend
      let baseDemand = 50 + Math.sin(i / 30) * 20; // Monthly cycle
      
      // Seasonal effects
      const monthlySeasonality = 1 + Math.sin((i / 365) * 2 * Math.PI) * product.seasonalityFactor * 0.3;
      const weeklySeasonality = 1 + Math.sin((i / 7) * 2 * Math.PI) * 0.2;
      
      // Weekend effect (higher sales on weekends)
      const dayOfWeek = currentDate.getDay();
      const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.3 : 1.0;
      
      // Random promotions (10% chance of 50% boost)
      const promotionBoost = Math.random() < 0.1 ? 1.5 : 1.0;
      
      // Calculate final sales with noise
      const sales = Math.max(0, Math.round(
        baseDemand * monthlySeasonality * weeklySeasonality * weekendBoost * promotionBoost * 
        (0.8 + Math.random() * 0.4) // Random noise ±20%
      ));
      
      // Inventory starts at 1000 and decreases by sales
      const inventory = Math.max(0, 1000 - (i * 2) + Math.random() * 100);
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
        product: product.name,
        sales,
        inventory: Math.round(inventory)
      });
    }
  });
  
  return data;
};

// Simple moving average forecast
export const generateForecasts = (salesData: SalesData[], windowSize: number = 7): SalesData[] => {
  const groupedData = salesData.reduce((acc, item) => {
    if (!acc[item.product]) acc[item.product] = [];
    acc[item.product].push(item);
    return acc;
  }, {} as Record<string, SalesData[]>);

  const forecastData: SalesData[] = [];

  Object.entries(groupedData).forEach(([product, data]) => {
    data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    data.forEach((item, index) => {
      if (index >= windowSize) {
        const recentSales = data.slice(index - windowSize, index).map(d => d.sales);
        const forecast = recentSales.reduce((sum, sales) => sum + sales, 0) / windowSize;
        
        forecastData.push({
          ...item,
          forecast: Math.round(forecast)
        });
      } else {
        forecastData.push(item);
      }
    });
  });

  return forecastData;
};

// Calculate inventory optimization metrics
export interface InventoryOptimization {
  product: string;
  currentStock: number;
  reorderPoint: number;
  safetyStock: number;
  recommendedOrder: number;
  status: "optimal" | "low" | "critical" | "overstock";
}

export const calculateInventoryOptimization = (salesData: SalesData[]): InventoryOptimization[] => {
  const productMetrics = salesData.reduce((acc, item) => {
    if (!acc[item.product]) {
      acc[item.product] = { sales: [], inventory: 0 };
    }
    acc[item.product].sales.push(item.sales);
    acc[item.product].inventory = item.inventory;
    return acc;
  }, {} as Record<string, { sales: number[], inventory: number }>);

  return Object.entries(productMetrics).map(([product, metrics]) => {
    const avgDailySales = metrics.sales.reduce((sum, s) => sum + s, 0) / metrics.sales.length;
    const salesVariability = Math.sqrt(
      metrics.sales.reduce((sum, s) => sum + Math.pow(s - avgDailySales, 2), 0) / metrics.sales.length
    );
    
    const leadTime = 7; // Assume 7 days lead time
    const serviceLevel = 0.95; // 95% service level
    const zScore = 1.65; // For 95% service level
    
    const safetyStock = Math.round(zScore * salesVariability * Math.sqrt(leadTime));
    const reorderPoint = Math.round(avgDailySales * leadTime + safetyStock);
    const recommendedOrder = Math.max(0, reorderPoint * 2 - metrics.inventory);
    
    let status: "optimal" | "low" | "critical" | "overstock" = "optimal";
    if (metrics.inventory <= safetyStock) status = "critical";
    else if (metrics.inventory <= reorderPoint) status = "low";
    else if (metrics.inventory > reorderPoint * 3) status = "overstock";
    
    return {
      product,
      currentStock: metrics.inventory,
      reorderPoint,
      safetyStock,
      recommendedOrder,
      status
    };
  });
};