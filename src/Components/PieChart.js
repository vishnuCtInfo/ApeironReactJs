import React, { useEffect, useRef } from 'react'
// import Chart from 'react-apexcharts';
import Chart from 'chart.js/auto';

const PieChart = ({ settings}) => {
    const data = [30, 40, 30]; // Example data
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Destroy the existing chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create the new pie chart
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx,settings );

        // Cleanup on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className='p-4'>
            <canvas ref={chartRef}></canvas>

            <div className="legend my-4">
                <ul className='text-white'>
                    {settings?.data?.labels.map((value, index) => (
                        <li key={index} className="legend-item mb-2">
                            <i class="fa-solid fa-circle me-2" style={{ color: settings?.data?.datasets[0]?.backgroundColor[index] }}></i>
                            <span className="legend-name">{value}</span>
                            <span className="legend-value float-end">{settings?.data?.datasets[0]?.data[index]}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default PieChart