// Supplement Sales Data Generator - Based on Kaggle Supplement Sales Dataset

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  cost: number;
}

export interface SalesData {
  date: string;
  product: string;
  category: string;
  brand: string;
  sales: number;
  revenue: number;
  inventory: number;
  forecast?: number;
}

export interface InventoryOptimization {
  product: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  safetyStock: number;
  optimalOrderQuantity: number;
  recommendation: string;
  status: "Low Stock" | "Optimal" | "Overstock";
}

export const generateProducts = (): Product[] => {
  const supplementCategories = [
    "Protein Powders",
    "Vitamins & Minerals", 
    "Pre-Workout",
    "BCAA & Amino Acids",
    "Creatine",
    "Fat Burners",
    "Mass Gainers",
    "Joint Support",
    "Fish Oil",
    "Probiotics"
  ];

  const brands = ["Optimum Nutrition", "MuscleTech", "BSN", "Dymatize", "Cellucor", "Quest", "MusclePharm", "Gaspari", "Universal", "Nutrex"];
  
  const supplementProducts = [
    // Protein Powders
    { name: "Whey Protein Isolate", category: "Protein Powders", price: 89.99, cost: 45.00 },
    { name: "Casein Protein", category: "Protein Powders", price: 79.99, cost: 40.00 },
    { name: "Plant-Based Protein", category: "Protein Powders", price: 69.99, cost: 35.00 },
    
    // Vitamins & Minerals
    { name: "Multivitamin Complex", category: "Vitamins & Minerals", price: 29.99, cost: 15.00 },
    { name: "Vitamin D3", category: "Vitamins & Minerals", price: 19.99, cost: 10.00 },
    { name: "Magnesium Supplement", category: "Vitamins & Minerals", price: 24.99, cost: 12.50 },
    
    // Pre-Workout
    { name: "Pre-Workout Formula", category: "Pre-Workout", price: 49.99, cost: 25.00 },
    { name: "Nitric Oxide Booster", category: "Pre-Workout", price: 39.99, cost: 20.00 },
    
    // BCAA & Amino Acids
    { name: "BCAA 2:1:1", category: "BCAA & Amino Acids", price: 34.99, cost: 17.50 },
    { name: "Glutamine Powder", category: "BCAA & Amino Acids", price: 29.99, cost: 15.00 },
    
    // Creatine
    { name: "Creatine Monohydrate", category: "Creatine", price: 24.99, cost: 12.50 },
    { name: "Creatine HCL", category: "Creatine", price: 34.99, cost: 17.50 },
    
    // Other categories
    { name: "Thermogenic Fat Burner", category: "Fat Burners", price: 59.99, cost: 30.00 },
    { name: "Mass Gainer 5000", category: "Mass Gainers", price: 79.99, cost: 40.00 },
    { name: "Joint Support Complex", category: "Joint Support", price: 44.99, cost: 22.50 },
    { name: "Omega-3 Fish Oil", category: "Fish Oil", price: 29.99, cost: 15.00 },
    { name: "Probiotic Blend", category: "Probiotics", price: 39.99, cost: 20.00 }
  ];

  return supplementProducts.map((product, index) => ({
    id: `SUP-${String(index + 1).padStart(3, '0')}`,
    name: product.name,
    category: product.category,
    brand: brands[Math.floor(Math.random() * brands.length)],
    price: product.price,
    cost: product.cost
  }));
};

export const generateSalesData = (products: Product[], days: number): SalesData[] => {
  const salesData: SalesData[] = [];
  // Using date range from Kaggle supplement sales dataset (2020-2023)
  const startDate = new Date('2020-01-01');
  const endDate = new Date('2023-12-31');
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  days = Math.min(days, totalDays);

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    products.forEach(product => {
      // Supplement-specific patterns
      let baseSales = 10;
      
      // Category-based sales patterns
      switch (product.category) {
        case "Protein Powders":
          baseSales = Math.floor(Math.random() * 25) + 15; // Higher volume
          break;
        case "Pre-Workout":
          baseSales = Math.floor(Math.random() * 20) + 10;
          // Peak on weekdays
          if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
            baseSales *= 1.3;
          }
          break;
        case "Vitamins & Minerals":
          baseSales = Math.floor(Math.random() * 30) + 20; // Consistent high volume
          break;
        case "Creatine":
          baseSales = Math.floor(Math.random() * 15) + 8;
          break;
        case "Fat Burners":
          baseSales = Math.floor(Math.random() * 12) + 6;
          // Peak in January (New Year) and summer months
          const month = currentDate.getMonth();
          if (month === 0 || month === 4 || month === 5) {
            baseSales *= 1.5;
          }
          break;
        default:
          baseSales = Math.floor(Math.random() * 15) + 5;
      }

      // Weekend patterns (generally lower except for certain categories)
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        if (product.category !== "Mass Gainers" && product.category !== "Protein Powders") {
          baseSales *= 0.7;
        }
      }

      // Add some seasonal variation
      const dayOfYear = getDayOfYear(currentDate);
      const seasonalMultiplier = 1 + 0.3 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
      baseSales = Math.round(baseSales * seasonalMultiplier);

      // Add random noise
      const noise = (Math.random() - 0.5) * 0.4;
      baseSales = Math.max(1, Math.round(baseSales * (1 + noise)));

      const revenue = baseSales * product.price;
      const inventory = Math.floor(Math.random() * 500) + 100;

      salesData.push({
        date: currentDate.toISOString().split('T')[0],
        product: product.name,
        category: product.category,
        brand: product.brand,
        sales: baseSales,
        revenue: revenue,
        inventory: inventory
      });
    });
  }

  return salesData;
};

// Helper function to get day of year
const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const generateForecasts = (salesData: SalesData[]): SalesData[] => {
  const groupedData = salesData.reduce((acc, item) => {
    if (!acc[item.product]) acc[item.product] = [];
    acc[item.product].push(item);
    return acc;
  }, {} as Record<string, SalesData[]>);

  const forecastData: SalesData[] = [];

  Object.entries(groupedData).forEach(([product, data]) => {
    data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    data.forEach((item, index) => {
      if (index >= 7) { // 7-day moving average
        const recentSales = data.slice(index - 7, index).map(d => d.sales);
        const forecast = recentSales.reduce((sum, sales) => sum + sales, 0) / 7;
        
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

export const calculateInventoryOptimization = (salesData: SalesData[]): InventoryOptimization[] => {
  const productSummaries = new Map<string, {
    totalSales: number;
    avgDailySales: number;
    maxDailySales: number;
    category: string;
    currentStock: number;
  }>();

  // Calculate statistics for each product
  salesData.forEach(record => {
    const key = record.product;
    if (!productSummaries.has(key)) {
      productSummaries.set(key, {
        totalSales: 0,
        avgDailySales: 0,
        maxDailySales: 0,
        category: record.category,
        currentStock: record.inventory
      });
    }
    
    const summary = productSummaries.get(key)!;
    summary.totalSales += record.sales;
    summary.maxDailySales = Math.max(summary.maxDailySales, record.sales);
    summary.currentStock = record.inventory; // Use latest inventory
  });

  return Array.from(productSummaries.entries()).map(([product, summary]) => {
    const days = salesData.filter(r => r.product === product).length;
    summary.avgDailySales = summary.totalSales / days;

    // Supplement-specific optimization logic
    let leadTimeDays = 7; // Default 1 week lead time
    let serviceLevel = 0.95; // 95% service level
    
    // Category-specific adjustments
    switch (summary.category) {
      case "Protein Powders":
      case "Vitamins & Minerals":
        leadTimeDays = 14; // Higher lead time for popular items
        serviceLevel = 0.98;
        break;
      case "Pre-Workout":
      case "Creatine":
        leadTimeDays = 10;
        serviceLevel = 0.96;
        break;
      case "Fat Burners":
        leadTimeDays = 12; // Seasonal demand variation
        serviceLevel = 0.94;
        break;
    }

    const leadTimeDemand = summary.avgDailySales * leadTimeDays;
    const safetyStock = Math.ceil(summary.avgDailySales * Math.sqrt(leadTimeDays) * 1.65); // Z-score for 95% service level
    const reorderPoint = Math.ceil(leadTimeDemand + safetyStock);
    
    // Economic Order Quantity (simplified)
    const annualDemand = summary.avgDailySales * 365;
    const orderingCost = 50; // Estimated ordering cost
    const holdingCostRate = 0.25; // 25% of product value per year
    const productValue = 30; // Average supplement value
    const holdingCost = productValue * holdingCostRate;
    
    const optimalOrderQuantity = Math.ceil(Math.sqrt((2 * annualDemand * orderingCost) / holdingCost));

    // Determine status and recommendation
    let status: "Low Stock" | "Optimal" | "Overstock";
    let recommendation: string;

    if (summary.currentStock <= reorderPoint * 0.5) {
      status = "Low Stock";
      recommendation = `URGENT: Reorder immediately. Current stock critically low.`;
    } else if (summary.currentStock <= reorderPoint) {
      status = "Low Stock";
      recommendation = `Reorder ${optimalOrderQuantity} units to reach optimal levels.`;
    } else if (summary.currentStock > reorderPoint * 3) {
      status = "Overstock";
      recommendation = `Consider promotional pricing to reduce excess inventory.`;
    } else {
      status = "Optimal";
      recommendation = `Stock levels are optimal. Monitor for upcoming reorder point.`;
    }

    return {
      product,
      category: summary.category,
      currentStock: summary.currentStock,
      reorderPoint,
      safetyStock,
      optimalOrderQuantity,
      recommendation,
      status
    };
  });
};
