import {DetailedHTMLProps, HTMLAttributes, useEffect, useRef} from "react";
import {CandlestickData, ColorType, createChart} from "lightweight-charts";

interface CandleChartProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: CandlestickData[];
}

const CandlestickChart = ({className, data}: CandleChartProps) => {

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data)
      return

    const handleResize = () => {
      chart.applyOptions({width: chartContainerRef.current.clientWidth});
    };

    const chartOptions = {
      layout: {
        textColor: 'black',
        background: {
          type: ColorType.Solid,
          color: 'white'
        }
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    };

    const chart = createChart(chartContainerRef.current, chartOptions)

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    });

    candlestickSeries.setData(data);

    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    }

  }, [chartContainerRef.current, data])

  return (
    <div ref={chartContainerRef} className={className}/>
  )
}

export default CandlestickChart;