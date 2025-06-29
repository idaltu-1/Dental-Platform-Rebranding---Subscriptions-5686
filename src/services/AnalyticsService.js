class AnalyticsService {
  constructor() {
    this.mockData = {
      overview: {
        totalReferrals: 1247,
        activeReferrals: 89,
        completedReferrals: 1158,
        revenue: 247500,
        revenueTarget: 300000,
        revenueGrowth: '+18.2%',
        avgResponseTime: 2.4,
        responseTimeTarget: 2.0,
        responseTimeChange: '-15.3%',
        satisfactionScore: 4.7,
        conversionRate: 68.5,
        conversionTarget: 75.0,
        conversionGrowth: '+5.2%',
        referralGrowth: '+12.5%',
        referralTarget: 100
      },
      trends: {
        referrals: [
          { month: 'Jan', count: 95, revenue: 19000, target: 22000 },
          { month: 'Feb', count: 108, revenue: 21600, target: 23000 },
          { month: 'Mar', count: 127, revenue: 25400, target: 24000 },
          { month: 'Apr', count: 134, revenue: 26800, target: 25000 },
          { month: 'May', count: 142, revenue: 28400, target: 26000 },
          { month: 'Jun', count: 156, revenue: 31200, target: 27000 }
        ],
        treatments: [
          { name: 'Endodontics', count: 345, revenue: 86250, growth: '+12%' },
          { name: 'Oral Surgery', count: 298, revenue: 74500, growth: '+8%' },
          { name: 'Orthodontics', count: 234, revenue: 58500, growth: '+15%' },
          { name: 'Periodontics', count: 187, revenue: 46750, growth: '+5%' },
          { name: 'Prosthodontics', count: 183, revenue: 45750, growth: '+3%' }
        ]
      },
      performance: {
        revenue: 85,
        satisfaction: 92,
        responseTime: 88,
        conversion: 75,
        quality: 90,
        volume: 82
      },
      predictions: {
        nextMonthRevenue: 285000,
        growthOpportunity: 22,
        riskLevel: 'Low',
        revenue: [32000, 34000, 36000, 38000, 40000, 42000]
      },
      advanced: {
        cohortAnalysis: [
          { cohort: 'Jan 2024', month1: 100, month2: 85, month3: 72, month4: 65 },
          { cohort: 'Feb 2024', month1: 120, month2: 98, month3: 82 },
          { cohort: 'Mar 2024', month1: 135, month2: 108 },
          { cohort: 'Apr 2024', month1: 142 }
        ],
        geographicData: [
          { region: 'North', revenue: 65000, patients: 245 },
          { region: 'South', revenue: 58000, patients: 198 },
          { region: 'East', revenue: 72000, patients: 287 },
          { region: 'West', revenue: 52500, patients: 176 }
        ],
        timeAnalysis: {
          hourly: [
            { hour: '8:00', appointments: 12, revenue: 2400 },
            { hour: '9:00', appointments: 18, revenue: 3600 },
            { hour: '10:00', appointments: 22, revenue: 4400 },
            { hour: '11:00', appointments: 25, revenue: 5000 },
            { hour: '12:00', appointments: 15, revenue: 3000 },
            { hour: '13:00', appointments: 20, revenue: 4000 },
            { hour: '14:00', appointments: 28, revenue: 5600 },
            { hour: '15:00', appointments: 24, revenue: 4800 },
            { hour: '16:00', appointments: 19, revenue: 3800 },
            { hour: '17:00', appointments: 12, revenue: 2400 }
          ]
        }
      }
    };
  }

  async getOverviewMetrics(filters = {}) {
    await this.simulateDelay(800);
    
    // Apply filters to modify data
    let metrics = { ...this.mockData.overview };
    
    if (filters.dateRange === '7d') {
      metrics.revenue = Math.round(metrics.revenue * 0.16); // ~7/30 of monthly
      metrics.activeReferrals = Math.round(metrics.activeReferrals * 0.25);
    } else if (filters.dateRange === '90d') {
      metrics.revenue = Math.round(metrics.revenue * 3);
      metrics.activeReferrals = Math.round(metrics.activeReferrals * 1.5);
    }
    
    return metrics;
  }

  async getReferralTrends(period = '6m') {
    await this.simulateDelay(600);
    
    let trends = [...this.mockData.trends.referrals];
    
    if (period === '1y') {
      // Add 6 more months of data
      const additionalMonths = [
        { month: 'Jul', count: 168, revenue: 33600, target: 28000 },
        { month: 'Aug', count: 175, revenue: 35000, target: 29000 },
        { month: 'Sep', count: 162, revenue: 32400, target: 30000 },
        { month: 'Oct', count: 184, revenue: 36800, target: 31000 },
        { month: 'Nov', count: 192, revenue: 38400, target: 32000 },
        { month: 'Dec', count: 178, revenue: 35600, target: 33000 }
      ];
      trends = [...trends, ...additionalMonths];
    }
    
    return trends;
  }

  async getTreatmentAnalytics(filters = {}) {
    await this.simulateDelay(700);
    
    let treatments = [...this.mockData.trends.treatments];
    
    // Filter by practice type if specified
    if (filters.practiceType && filters.practiceType !== 'all') {
      if (filters.practiceType === 'endodontics') {
        treatments = treatments.filter(t => t.name === 'Endodontics');
      } else if (filters.practiceType === 'oral_surgery') {
        treatments = treatments.filter(t => t.name === 'Oral Surgery');
      }
      // Add more filtering logic as needed
    }
    
    return treatments;
  }

  async getPerformanceMetrics(filters = {}) {
    await this.simulateDelay(600);
    
    let performance = { ...this.mockData.performance };
    
    // Simulate filter effects
    if (filters.dateRange === '7d') {
      // Recent data might show different performance
      performance.responseTime = Math.min(100, performance.responseTime + 5);
      performance.satisfaction = Math.max(70, performance.satisfaction - 3);
    }
    
    return performance;
  }

  async getPredictiveAnalytics(filters = {}) {
    await this.simulateDelay(800);
    
    let predictions = { ...this.mockData.predictions };
    
    // Adjust predictions based on current performance
    if (filters.metricType === 'revenue') {
      predictions.nextMonthRevenue = Math.round(predictions.nextMonthRevenue * 1.1);
      predictions.growthOpportunity = Math.min(35, predictions.growthOpportunity + 5);
    }
    
    return predictions;
  }

  async getRevenueAnalytics(period = '6m') {
    await this.simulateDelay(500);
    return {
      total: this.mockData.overview.revenue,
      growth: 18.5,
      breakdown: this.mockData.trends.treatments
    };
  }

  async getUserActivityMetrics() {
    await this.simulateDelay(600);
    return {
      activeUsers: 156,
      newRegistrations: 23,
      engagement: 87.5,
      retention: 92.3
    };
  }

  async getCohortAnalysis() {
    await this.simulateDelay(700);
    return this.mockData.advanced.cohortAnalysis;
  }

  async getGeographicAnalytics() {
    await this.simulateDelay(600);
    return this.mockData.advanced.geographicData;
  }

  async getTimeBasedAnalytics() {
    await this.simulateDelay(500);
    return this.mockData.advanced.timeAnalysis;
  }

  async exportAnalytics(type = 'csv', filters = {}) {
    await this.simulateDelay(1200);
    
    const data = {
      referrals: this.mockData.trends.referrals,
      treatments: this.mockData.trends.treatments,
      overview: this.mockData.overview,
      performance: this.mockData.performance,
      predictions: this.mockData.predictions
    };

    // Simulate file generation
    const filename = `analytics-${filters.dateRange || 'all'}-${Date.now()}.${type}`;
    console.log('Exporting analytics:', filename, data);

    // In a real app, this would trigger a download
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      filename,
      downloadUrl: '#'
    };
  }

  async generateReport(type = 'comprehensive', filters = {}) {
    await this.simulateDelay(2000);
    
    const reportData = {
      generatedAt: new Date().toISOString(),
      type,
      filters,
      data: {
        overview: await this.getOverviewMetrics(filters),
        trends: await this.getReferralTrends(filters.dateRange),
        treatments: await this.getTreatmentAnalytics(filters),
        performance: await this.getPerformanceMetrics(filters)
      }
    };

    console.log('Generated report:', reportData);
    return reportData;
  }

  simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const analyticsService = new AnalyticsService();