// Golden-path Bar (Oleada 0)
export { Bar } from './Bar/Bar';
export { BarInner } from './Bar/BarInner';
export type { BarProps, BarInnerProps, BarDatum, BarData } from './Bar/Bar.types';

// Bar family — Oleada 1
export { BarHorizontal } from './BarHorizontal/BarHorizontal';
export { BarHorizontalInner } from './BarHorizontal/BarHorizontalInner';
export type { BarHorizontalProps, BarHorizontalInnerProps } from './BarHorizontal/BarHorizontal.types';

export { BarGrouped } from './BarGrouped/BarGrouped';
export { BarGroupedInner } from './BarGrouped/BarGroupedInner';
export type { BarGroupedProps, BarGroupedInnerProps } from './BarGrouped/BarGrouped.types';

export { BarGroupedHorizontal } from './BarGroupedHorizontal/BarGroupedHorizontal';
export { BarGroupedHorizontalInner } from './BarGroupedHorizontal/BarGroupedHorizontalInner';
export type { BarGroupedHProps, BarGroupedHInnerProps } from './BarGroupedHorizontal/BarGroupedHorizontal.types';

export { BarStacked } from './BarStacked/BarStacked';
export { BarStackedInner } from './BarStacked/BarStackedInner';
export type { BarStackedProps, BarStackedInnerProps } from './BarStacked/BarStacked.types';

export { BarStackedHorizontal } from './BarStackedHorizontal/BarStackedHorizontal';
export { BarStackedHorizontalInner } from './BarStackedHorizontal/BarStackedHorizontalInner';
export type { BarStackedHProps, BarStackedHInnerProps } from './BarStackedHorizontal/BarStackedHorizontal.types';

// Line family — Oleada 2
export { Line } from './Line/Line';
export { LineInner } from './Line/LineInner';
export type { LineProps, LineInnerProps, LineDatum, LineData } from './Line/Line.types';

export { LineMulti } from './LineMulti/LineMulti';
export { LineMultiInner } from './LineMulti/LineMultiInner';
export type { LineMultiProps, LineMultiInnerProps, LineMultiDatum, LineMultiData } from './LineMulti/LineMulti.types';

export { Area } from './Area/Area';
export { AreaInner } from './Area/AreaInner';
export type { AreaProps, AreaInnerProps, AreaDatum, AreaData } from './Area/Area.types';

export { AreaStacked } from './AreaStacked/AreaStacked';
export { AreaStackedInner } from './AreaStacked/AreaStackedInner';
export type { AreaStackedProps, AreaStackedInnerProps, AreaStackedDatum, AreaStackedData } from './AreaStacked/AreaStacked.types';

export { Threshold } from './Threshold/Threshold';
export { ThresholdInner } from './Threshold/ThresholdInner';
export type { ThresholdProps, ThresholdInnerProps, ThresholdDatum, ThresholdData } from './Threshold/Threshold.types';

export { Streamgraph } from './Streamgraph/Streamgraph';
export { StreamgraphInner } from './Streamgraph/StreamgraphInner';
export type { StreamgraphProps, StreamgraphInnerProps, StreamgraphDatum, StreamgraphData } from './Streamgraph/Streamgraph.types';

// XY + Distribution + Heatmap — Oleada 3
export { Scatter } from './Scatter/Scatter';
export { ScatterInner } from './Scatter/ScatterInner';
export type { ScatterProps, ScatterInnerProps, ScatterDatum, ScatterData } from './Scatter/Scatter.types';

export { Bubble } from './Bubble/Bubble';
export { BubbleInner } from './Bubble/BubbleInner';
export type { BubbleProps, BubbleInnerProps, BubbleDatum, BubbleData } from './Bubble/Bubble.types';

export { DotPlot } from './DotPlot/DotPlot';
export { DotPlotInner } from './DotPlot/DotPlotInner';
export type { DotPlotProps, DotPlotInnerProps, DotPlotDatum, DotPlotData } from './DotPlot/DotPlot.types';

export { Heatmap } from './Heatmap/Heatmap';
export { HeatmapInner } from './Heatmap/HeatmapInner';
export type { HeatmapProps, HeatmapInnerProps, HeatmapDatum, HeatmapData } from './Heatmap/Heatmap.types';

export { BoxPlot } from './BoxPlot/BoxPlot';
export { BoxPlotInner } from './BoxPlot/BoxPlotInner';
export type { BoxPlotProps, BoxPlotInnerProps, BoxPlotGroup, BoxPlotData, BoxPlotStats } from './BoxPlot/BoxPlot.types';

export { Violin } from './Violin/Violin';
export { ViolinInner } from './Violin/ViolinInner';
export type { ViolinProps, ViolinInnerProps, ViolinGroup, ViolinData } from './Violin/Violin.types';

export { Histogram } from './Histogram/Histogram';
export { HistogramInner } from './Histogram/HistogramInner';
export type { HistogramProps, HistogramInnerProps, HistogramBin } from './Histogram/Histogram.types';

// Part-of-whole + Radial + Gauge + Hierarchy — Oleada 4
export { Pie } from './Pie/Pie';
export { PieInner } from './Pie/PieInner';
export type { PieProps, PieInnerProps, PieDatum, PieData } from './Pie/Pie.types';

export { Donut } from './Donut/Donut';
export type { DonutProps, DonutDatum, DonutData } from './Donut/Donut.types';

export { Radar } from './Radar/Radar';
export { RadarInner } from './Radar/RadarInner';
export type { RadarProps, RadarInnerProps, RadarDatum, RadarData } from './Radar/Radar.types';

export { Gauge } from './Gauge/Gauge';
export { GaugeInner } from './Gauge/GaugeInner';
export type { GaugeProps, GaugeInnerProps } from './Gauge/Gauge.types';
export type { GaugeThreshold as GaugeThresholdNew } from './Gauge/Gauge.types';

export { Treemap } from './Treemap/Treemap';
export { TreemapInner } from './Treemap/TreemapInner';
export type { TreemapProps, TreemapInnerProps, TreemapDatum, TreemapData } from './Treemap/Treemap.types';

export { Pack } from './Pack/Pack';
export { PackInner } from './Pack/PackInner';
export type { PackProps, PackInnerProps, PackDatum, PackData } from './Pack/Pack.types';

// Network + Flow + Funnel + Waterfall — Oleada 5
export { Network } from './Network/Network';
export { NetworkInner } from './Network/NetworkInner';
export type { NetworkProps, NetworkInnerProps, NetworkNode, NetworkLink, NetworkDatum, NetworkData } from './Network/Network.types';

export { Sankey } from './Sankey/Sankey';
export { SankeyInner } from './Sankey/SankeyInner';
export type { SankeyProps, SankeyInnerProps, SankeyNode, SankeyLink, SankeyDatum, SankeyData } from './Sankey/Sankey.types';

export { Funnel } from './Funnel/Funnel';
export { FunnelInner } from './Funnel/FunnelInner';
export type { FunnelProps, FunnelInnerProps, FunnelDatum, FunnelData } from './Funnel/Funnel.types';

export { Waterfall } from './Waterfall/Waterfall';
export { WaterfallInner } from './Waterfall/WaterfallInner';
export type { WaterfallProps, WaterfallInnerProps, WaterfallDatum, WaterfallData } from './Waterfall/Waterfall.types';

// Financial + Temporal — Oleada 6
export { Candlestick } from './Candlestick/Candlestick';
export { CandlestickInner } from './Candlestick/CandlestickInner';
export type { CandlestickProps, CandlestickInnerProps, CandlestickDatum, CandlestickData } from './Candlestick/Candlestick.types';

export { Sparkline } from './Sparkline/Sparkline';
export { SparklineInner } from './Sparkline/SparklineInner';
export type { SparklineProps, SparklineInnerProps, SparklineDatum, SparklineData } from './Sparkline/Sparkline.types';

export { Bullet } from './Bullet/Bullet';
export { BulletInner } from './Bullet/BulletInner';
export type { BulletProps, BulletInnerProps, BulletDatum, BulletData } from './Bullet/Bullet.types';

export { CalendarHeatmap } from './CalendarHeatmap/CalendarHeatmap';
export { CalendarHeatmapInner } from './CalendarHeatmap/CalendarHeatmapInner';
export type { CalendarHeatmapProps, CalendarHeatmapInnerProps, CalendarDatum, CalendarData } from './CalendarHeatmap/CalendarHeatmap.types';

// Radial + Relacional — Oleada 7
export { Sunburst } from './Sunburst/Sunburst';
export { SunburstInner } from './Sunburst/SunburstInner';
export type { SunburstProps, SunburstInnerProps, SunburstDatum, SunburstData } from './Sunburst/Sunburst.types';

export { Chord } from './Chord/Chord';
export { ChordInner } from './Chord/ChordInner';
export type { ChordProps, ChordInnerProps, ChordDatum, ChordData, ChordRibbonInfo } from './Chord/Chord.types';

export { PolarBar } from './PolarBar/PolarBar';
export { PolarBarInner } from './PolarBar/PolarBarInner';
export type { PolarBarProps, PolarBarInnerProps, PolarBarDatum, PolarBarData } from './PolarBar/PolarBar.types';

export { Waffle } from './Waffle/Waffle';
export { WaffleInner } from './Waffle/WaffleInner';
export type { WaffleProps, WaffleInnerProps, WaffleDatum, WaffleData } from './Waffle/Waffle.types';

// Especializado — Oleada 8
export { Gantt } from './Gantt/Gantt';
export { GanttInner } from './Gantt/GanttInner';
export type { GanttProps, GanttInnerProps, GanttDatum, GanttData, GanttTask } from './Gantt/Gantt.types';

export { TreeDiagram } from './TreeDiagram/TreeDiagram';
export { TreeDiagramInner } from './TreeDiagram/TreeDiagramInner';
export type { TreeDiagramProps, TreeDiagramInnerProps, TreeDiagramDatum, TreeDiagramData, TreeDiagramLayout } from './TreeDiagram/TreeDiagram.types';

export { WordCloud } from './WordCloud/WordCloud';
export { WordCloudInner } from './WordCloud/WordCloudInner';
export type { WordCloudProps, WordCloudInnerProps, WordCloudDatum, WordCloudData } from './WordCloud/WordCloud.types';

export { Geo } from './Geo/Geo';
export { GeoInner } from './Geo/GeoInner';
export type { GeoProps, GeoInnerProps, GeoFeatureDatum, GeoData } from './Geo/Geo.types';

// Legacy BarChart (kept for backward compat)
export { BarChart } from './BarChart/BarChart';
export type { BarChartProps, BarChartDataPoint } from './BarChart/BarChart.types';

export { LineChart } from './LineChart/LineChart';
export type { LineChartProps, LineChartDataPoint } from './LineChart/LineChart.types';

export { PieChart } from './PieChart/PieChart';
export type { PieChartProps, PieChartDataPoint } from './PieChart/PieChart.types';

export { AreaChart } from './AreaChart/AreaChart';
export type { AreaChartProps, AreaChartDataPoint } from './AreaChart/AreaChart.types';

export { ScatterPlot } from './ScatterPlot/ScatterPlot';
export type { ScatterPlotProps, ScatterPlotDataPoint } from './ScatterPlot/ScatterPlot.types';

export { RadarChart } from './RadarChart/RadarChart';
export type { RadarChartProps, RadarChartDataPoint } from './RadarChart/RadarChart.types';

export { GaugeChart } from './GaugeChart/GaugeChart';
export type { GaugeChartProps, GaugeThreshold } from './GaugeChart/GaugeChart.types';

export { HeatmapChart } from './HeatmapChart/HeatmapChart';
export type { HeatmapChartProps, HeatmapDataPoint } from './HeatmapChart/HeatmapChart.types';

export { TreemapChart } from './TreemapChart/TreemapChart';
export type { TreemapChartProps, TreemapNode } from './TreemapChart/TreemapChart.types';

// ── Base types & utils (for advanced consumers) ──────────────────────
export type {
    BaseChartProps,
    ChartEventProps,
    ChartMargin,
    ColorSchemeName,
    Datum1D,
    DatumTime,
    MultiSeriesTime,
    DatumXY,
    DatumGroup,
    DatumSlice,
    DatumMatrix,
    DatumHierarchy,
    DatumGraph,
    InnerDims,
} from './_base/types';

// ── Primitives ───────────────────────────────────────────────────────
export { ChartAxis } from './primitives/ChartAxis';
export { ChartGrid } from './primitives/ChartGrid';
export { ChartTooltip } from './primitives/ChartTooltip';
export { ChartLegend } from './primitives/ChartLegend';
export type { ChartLegendItem, ChartLegendSwatchShape } from './primitives/ChartLegend/ChartLegend.types';
