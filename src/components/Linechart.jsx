import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

export const LineChart = ({ stock }) => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (stock.length > 0) {
            if (chartInstance) {
                chartInstance.destroy();
            }

            const labels = stock.map((data) => data.date);
            const closePrice = stock.map((data) => data.close);
            const openPrice = stock.map((data) => data.open);

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: "Close Price",
                        data: closePrice,
                        borderColor: "rgba(75, 192, 192, 1)",
                        fill: false,
                    },
                    {
                        label: "Open Price",
                        data: openPrice,
                        borderColor: "rgba(255, 99, 132, 1)",
                        fill: false,
                    },
                ],
            };

            const ctx = chartRef.current.getContext("2d");
            const newChartInstance = new Chart(ctx, {
                type: "line",
                data: chartData,
            });
            setChartInstance(newChartInstance);
        }
    }, [stock]);

    return (
        <div className="line-chart">
            <canvas id="line-chart" ref={chartRef} />
        </div>
    );
};