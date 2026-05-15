const MONTHLY_SALES = [
  { label: "Jan", value: 420 },
  { label: "Feb", value: 530 },
  { label: "Mar", value: 610 },
  { label: "Apr", value: 580 },
  { label: "May", value: 720 },
  { label: "Jun", value: 840 },
  { label: "Jul", value: 910 },
  { label: "Aug", value: 870 },
  { label: "Sep", value: 760 },
  { label: "Oct", value: 680 },
  { label: "Nov", value: 590 },
  { label: "Dec", value: 780 }
];
const LETTER_FREQUENCY = [
  { label: "A", value: 8.17 },
  { label: "B", value: 1.49 },
  { label: "C", value: 2.78 },
  { label: "D", value: 4.25 },
  { label: "E", value: 12.7 },
  { label: "F", value: 2.23 },
  { label: "G", value: 2.02 },
  { label: "H", value: 6.09 },
  { label: "I", value: 6.97 },
  { label: "J", value: 0.15 }
];
const QUARTERLY_GROUP = [
  { label: "2024 Q1", sales: 420, costs: 240, profit: 180 },
  { label: "2024 Q2", sales: 580, costs: 310, profit: 270 },
  { label: "2024 Q3", sales: 640, costs: 360, profit: 280 },
  { label: "2024 Q4", sales: 820, costs: 430, profit: 390 }
];
const QUARTERLY_GROUP_KEYS = ["sales", "costs", "profit"];
const makeDayPoints = (startDay, n, base, amp) => Array.from({ length: n }, (_, i) => ({
  date: new Date(2026, 0, startDay + i),
  value: Math.round(base + Math.sin(i * 0.6) * amp + i % 5 * 4)
}));
const MULTI_SERIES_WEEKLY = [
  { id: "visitors", label: "Visitors", data: makeDayPoints(1, 14, 1200, 300) },
  { id: "signups", label: "Signups", data: makeDayPoints(1, 14, 180, 60) },
  { id: "conversions", label: "Conversions", data: makeDayPoints(1, 14, 55, 15) }
];
const TEMPERATURE_COMPARISON = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2026, 0, i + 1),
  value0: Math.round(18 + Math.sin(i * 0.3) * 8 + Math.random() * 3),
  value1: Math.round(15 + Math.cos(i * 0.25) * 6 + Math.random() * 3)
}));
const STREAM_TRAFFIC = [
  { id: "direct", label: "Direct", data: makeDayPoints(1, 20, 400, 80) },
  { id: "organic", label: "Organic", data: makeDayPoints(1, 20, 600, 120) },
  { id: "referral", label: "Referral", data: makeDayPoints(1, 20, 200, 50) },
  { id: "social", label: "Social", data: makeDayPoints(1, 20, 300, 90) },
  { id: "email", label: "Email", data: makeDayPoints(1, 20, 150, 40) }
];
const STREAM_TRAFFIC_KEYS = ["direct", "organic", "referral", "social", "email"];
const BROWSER_SHARE = [
  { id: "chrome", label: "Chrome", value: 63 },
  { id: "safari", label: "Safari", value: 19 },
  { id: "edge", label: "Edge", value: 8 },
  { id: "firefox", label: "Firefox", value: 4 },
  { id: "other", label: "Other", value: 6 }
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => `${(i * 2).toString().padStart(2, "0")}:00`);
const HEATMAP_7x12 = DAYS.flatMap(
  (day, r) => HOURS.map((hour, c) => ({
    row: day,
    col: hour,
    value: Math.round(10 + Math.sin(r + c / 2) * 20 + Math.random() * 30)
  }))
);
const REGIONAL_HIERARCHY = {
  id: "world",
  label: "Revenue by region",
  children: [
    {
      id: "americas",
      label: "Americas",
      children: [
        { id: "us", label: "US", value: 420 },
        { id: "ca", label: "Canada", value: 90 },
        { id: "mx", label: "Mexico", value: 55 },
        { id: "br", label: "Brazil", value: 70 }
      ]
    },
    {
      id: "emea",
      label: "EMEA",
      children: [
        { id: "uk", label: "UK", value: 160 },
        { id: "de", label: "Germany", value: 140 },
        { id: "fr", label: "France", value: 110 },
        { id: "es", label: "Spain", value: 75 }
      ]
    },
    {
      id: "apac",
      label: "APAC",
      children: [
        { id: "jp", label: "Japan", value: 180 },
        { id: "au", label: "Australia", value: 85 },
        { id: "sg", label: "Singapore", value: 60 }
      ]
    }
  ]
};
const SCATTER_CORRELATION = Array.from(
  { length: 50 },
  (_, i) => {
    const x = i * 2 + Math.random() * 5;
    const y = x * 0.8 + Math.random() * 20 - 10;
    return { x: +x.toFixed(2), y: +y.toFixed(2), label: `pt-${i}` };
  }
);
const BUBBLE_DATA = Array.from(
  { length: 30 },
  (_, i) => {
    const x = Math.round(10 + Math.random() * 80);
    const y = Math.round(10 + Math.random() * 80);
    const r = Math.round(5 + Math.random() * 25);
    return { x, y, r, label: `Company ${String.fromCharCode(65 + i % 26)}${i >= 26 ? "2" : ""}` };
  }
);
const DOT_PLOT_DATA = [
  { x: 3.2, y: 0, label: "Feature A" },
  { x: 4.1, y: 0, label: "Feature A" },
  { x: 4.5, y: 0, label: "Feature A" },
  { x: 5.2, y: 0, label: "Feature A" },
  { x: 2.8, y: 1, label: "Feature B" },
  { x: 3.4, y: 1, label: "Feature B" },
  { x: 3.9, y: 1, label: "Feature B" },
  { x: 4.6, y: 1, label: "Feature B" },
  { x: 5, y: 1, label: "Feature B" },
  { x: 1.5, y: 2, label: "Feature C" },
  { x: 2.2, y: 2, label: "Feature C" },
  { x: 3, y: 2, label: "Feature C" },
  { x: 6.1, y: 3, label: "Feature D" },
  { x: 6.8, y: 3, label: "Feature D" },
  { x: 7.2, y: 3, label: "Feature D" },
  { x: 7.9, y: 3, label: "Feature D" },
  { x: 8.5, y: 3, label: "Feature D" }
];
const seededValues = (n, center, spread) => Array.from({ length: n }, (_, i) => +(center + Math.sin(i * 1.7) * spread + (Math.random() - 0.5) * spread * 0.8).toFixed(1));
const DISTRIBUTION_DATA = [
  { group: "Team A", values: seededValues(40, 72, 12) },
  { group: "Team B", values: seededValues(35, 85, 8) },
  { group: "Team C", values: seededValues(45, 60, 18) },
  { group: "Team D", values: seededValues(30, 90, 6) },
  { group: "Team E", values: seededValues(50, 55, 22) }
];
const HISTOGRAM_DATA = Array.from(
  { length: 200 },
  (_, i) => +(50 + Math.sin(i * 0.3) * 20 + (Math.random() - 0.5) * 30).toFixed(1)
);
const RADAR_SKILLS = [
  { label: "JavaScript", value: 92 },
  { label: "TypeScript", value: 85 },
  { label: "React", value: 88 },
  { label: "CSS", value: 78 },
  { label: "Node.js", value: 70 },
  { label: "Testing", value: 65 },
  { label: "DevOps", value: 55 },
  { label: "Design", value: 60 }
];
const SOCIAL_NETWORK = {
  nodes: [
    { id: "alice", label: "Alice", group: "engineering" },
    { id: "bob", label: "Bob", group: "engineering" },
    { id: "carol", label: "Carol", group: "design" },
    { id: "dave", label: "Dave", group: "design" },
    { id: "eve", label: "Eve", group: "product" },
    { id: "frank", label: "Frank", group: "product" },
    { id: "grace", label: "Grace", group: "engineering" },
    { id: "heidi", label: "Heidi", group: "marketing" },
    { id: "ivan", label: "Ivan", group: "marketing" },
    { id: "judy", label: "Judy", group: "engineering" }
  ],
  links: [
    { source: "alice", target: "bob" },
    { source: "alice", target: "carol" },
    { source: "bob", target: "dave" },
    { source: "bob", target: "grace" },
    { source: "carol", target: "dave" },
    { source: "carol", target: "eve" },
    { source: "dave", target: "frank" },
    { source: "eve", target: "frank" },
    { source: "eve", target: "heidi" },
    { source: "frank", target: "ivan" },
    { source: "grace", target: "judy" },
    { source: "heidi", target: "ivan" },
    { source: "alice", target: "judy" }
  ]
};
const ENERGY_FLOW = {
  nodes: [
    { id: "solar", label: "Solar", group: "source" },
    { id: "wind", label: "Wind", group: "source" },
    { id: "gas", label: "Natural Gas", group: "source" },
    { id: "grid", label: "Power Grid", group: "distribution" },
    { id: "storage", label: "Battery Storage", group: "distribution" },
    { id: "residential", label: "Residential", group: "consumer" },
    { id: "commercial", label: "Commercial", group: "consumer" },
    { id: "industrial", label: "Industrial", group: "consumer" }
  ],
  links: [
    { source: "solar", target: "grid", value: 120 },
    { source: "solar", target: "storage", value: 40 },
    { source: "wind", target: "grid", value: 80 },
    { source: "wind", target: "storage", value: 20 },
    { source: "gas", target: "grid", value: 200 },
    { source: "grid", target: "residential", value: 180 },
    { source: "grid", target: "commercial", value: 140 },
    { source: "grid", target: "industrial", value: 80 },
    { source: "storage", target: "residential", value: 35 },
    { source: "storage", target: "commercial", value: 25 }
  ]
};
const SALES_FUNNEL = [
  { label: "Visitors", value: 12e3 },
  { label: "Leads", value: 5200 },
  { label: "Qualified", value: 2800 },
  { label: "Proposals", value: 1400 },
  { label: "Negotiations", value: 820 },
  { label: "Closed Deals", value: 480 }
];
const QUARTERLY_PL = [
  { label: "Revenue", value: 420, isTotal: true },
  { label: "COGS", value: -180 },
  { label: "Gross Profit", value: 240, isTotal: true },
  { label: "Marketing", value: -65 },
  { label: "R&D", value: -85 },
  { label: "Operations", value: -35 },
  { label: "Other Income", value: 15 },
  { label: "Net Profit", value: 70, isTotal: true }
];
const makeOHLC = (startDate, n, basePrice) => {
  const result = [];
  let price = basePrice;
  for (let i = 0; i < n; i++) {
    const date = new Date(startDate.getTime() + i * 864e5);
    const change = (Math.random() - 0.48) * 6;
    const open = +price.toFixed(2);
    price += change;
    const close = +price.toFixed(2);
    const high = +(Math.max(open, close) + Math.random() * 3).toFixed(2);
    const low = +(Math.min(open, close) - Math.random() * 3).toFixed(2);
    const volume = Math.round(5e5 + Math.random() * 2e6);
    result.push({ date, open, high, low, close, volume });
  }
  return result;
};
const STOCK_OHLC = makeOHLC(new Date(2026, 0, 5), 30, 150);
const SPARKLINE_REVENUE = [
  42,
  53,
  61,
  58,
  72,
  84,
  91,
  87,
  76,
  68,
  59,
  78
];
const SPARKLINE_USERS = [
  120,
  135,
  142,
  156,
  148,
  162,
  175,
  190,
  185,
  198,
  210,
  225
];
const SPARKLINE_ERRORS = [
  8,
  12,
  5,
  3,
  7,
  15,
  22,
  18,
  9,
  4,
  6,
  3
];
const KPI_BULLETS = [
  { label: "Revenue", value: 275, target: 250, ranges: [150, 225, 300] },
  { label: "Profit", value: 42, target: 50, ranges: [20, 40, 60] },
  { label: "Orders", value: 1800, target: 2e3, ranges: [1e3, 1500, 2500] },
  { label: "Satisfaction", value: 4.2, target: 4.5, ranges: [3, 4, 5] },
  { label: "NPS", value: 68, target: 75, ranges: [30, 50, 100] }
];
const makeCalendarData = (year) => {
  const result = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  let current = new Date(start);
  while (current <= end) {
    const dayOfWeek = current.getDay();
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
    const base = isWeekday ? 2 : 0.5;
    const spike = Math.random() > 0.9 ? Math.floor(Math.random() * 12) : 0;
    const value = Math.floor(base + Math.random() * 5 + spike);
    if (value > 0 || Math.random() > 0.3) {
      result.push({ date: new Date(current), value });
    }
    current = new Date(current.getTime() + 864e5);
  }
  return result;
};
const CONTRIBUTIONS_2025 = makeCalendarData(2025);
const DEPT_INTERACTION = {
  labels: ["Engineering", "Design", "Product", "Marketing", "Sales"],
  matrix: [
    [0, 42, 38, 12, 8],
    [42, 0, 28, 18, 5],
    [38, 28, 0, 22, 15],
    [12, 18, 22, 0, 30],
    [8, 5, 15, 30, 0]
  ]
};
const WIND_DIRECTIONS = [
  { label: "N", value: 42 },
  { label: "NE", value: 65 },
  { label: "E", value: 78 },
  { label: "SE", value: 52 },
  { label: "S", value: 35 },
  { label: "SW", value: 28 },
  { label: "W", value: 45 },
  { label: "NW", value: 38 }
];
const BUDGET_ALLOCATION = [
  { id: "engineering", label: "Engineering", value: 35 },
  { id: "marketing", label: "Marketing", value: 25 },
  { id: "operations", label: "Operations", value: 20 },
  { id: "design", label: "Design", value: 12 },
  { id: "other", label: "Other", value: 8 }
];
const PROJECT_TIMELINE = [
  { id: "g1", label: "Research", start: "2026-01-05", end: "2026-01-20", group: "planning", progress: 1 },
  { id: "g2", label: "Requirements", start: "2026-01-12", end: "2026-01-30", group: "planning", progress: 1 },
  { id: "g3", label: "UI Design", start: "2026-01-25", end: "2026-02-15", group: "design", progress: 0.85 },
  { id: "g4", label: "API Design", start: "2026-02-01", end: "2026-02-20", group: "design", progress: 0.7 },
  { id: "g5", label: "Frontend Dev", start: "2026-02-10", end: "2026-03-25", group: "development", progress: 0.6 },
  { id: "g6", label: "Backend Dev", start: "2026-02-15", end: "2026-03-30", group: "development", progress: 0.45 },
  { id: "g7", label: "Integration", start: "2026-03-15", end: "2026-04-10", group: "development", progress: 0.2 },
  { id: "g8", label: "Testing", start: "2026-03-25", end: "2026-04-20", group: "qa", progress: 0.1 },
  { id: "g9", label: "Deployment", start: "2026-04-15", end: "2026-04-30", group: "ops" }
];
const TECH_BUZZWORDS = [
  { text: "React", value: 95 },
  { text: "TypeScript", value: 88 },
  { text: "Kubernetes", value: 72 },
  { text: "GraphQL", value: 65 },
  { text: "Docker", value: 80 },
  { text: "Terraform", value: 55 },
  { text: "Rust", value: 60 },
  { text: "WebAssembly", value: 48 },
  { text: "Microservices", value: 70 },
  { text: "Serverless", value: 52 },
  { text: "AI/ML", value: 90 },
  { text: "DevOps", value: 75 },
  { text: "CI/CD", value: 68 },
  { text: "Edge Computing", value: 42 },
  { text: "PostgreSQL", value: 62 },
  { text: "Redis", value: 50 },
  { text: "Vite", value: 58 },
  { text: "Next.js", value: 78 },
  { text: "Tailwind", value: 74 },
  { text: "Prisma", value: 45 },
  { text: "tRPC", value: 40 },
  { text: "Bun", value: 38 },
  { text: "Deno", value: 35 },
  { text: "SvelteKit", value: 44 },
  { text: "Astro", value: 42 }
];
const WORLD_POPULATION = [
  { id: "CHN", value: 1412, label: "China" },
  { id: "IND", value: 1408, label: "India" },
  { id: "USA", value: 332, label: "United States" },
  { id: "IDN", value: 276, label: "Indonesia" },
  { id: "PAK", value: 225, label: "Pakistan" },
  { id: "BRA", value: 214, label: "Brazil" },
  { id: "NGA", value: 213, label: "Nigeria" },
  { id: "BGD", value: 167, label: "Bangladesh" },
  { id: "RUS", value: 144, label: "Russia" },
  { id: "MEX", value: 130, label: "Mexico" },
  { id: "JPN", value: 125, label: "Japan" },
  { id: "DEU", value: 84, label: "Germany" },
  { id: "GBR", value: 67, label: "United Kingdom" },
  { id: "FRA", value: 65, label: "France" },
  { id: "AUS", value: 26, label: "Australia" },
  { id: "CAN", value: 38, label: "Canada" },
  { id: "ARG", value: 46, label: "Argentina" },
  { id: "ESP", value: 47, label: "Spain" },
  { id: "COL", value: 51, label: "Colombia" },
  { id: "ZAF", value: 60, label: "South Africa" }
];
export {
  BROWSER_SHARE,
  BUBBLE_DATA,
  BUDGET_ALLOCATION,
  CONTRIBUTIONS_2025,
  DEPT_INTERACTION,
  DISTRIBUTION_DATA,
  DOT_PLOT_DATA,
  ENERGY_FLOW,
  HEATMAP_7x12,
  HISTOGRAM_DATA,
  KPI_BULLETS,
  LETTER_FREQUENCY,
  MONTHLY_SALES,
  MULTI_SERIES_WEEKLY,
  PROJECT_TIMELINE,
  QUARTERLY_GROUP,
  QUARTERLY_GROUP_KEYS,
  QUARTERLY_PL,
  RADAR_SKILLS,
  REGIONAL_HIERARCHY,
  SALES_FUNNEL,
  SCATTER_CORRELATION,
  SOCIAL_NETWORK,
  SPARKLINE_ERRORS,
  SPARKLINE_REVENUE,
  SPARKLINE_USERS,
  STOCK_OHLC,
  STREAM_TRAFFIC,
  STREAM_TRAFFIC_KEYS,
  TECH_BUZZWORDS,
  TEMPERATURE_COMPARISON,
  WIND_DIRECTIONS,
  WORLD_POPULATION
};
//# sourceMappingURL=w3fDatasets.js.map
