'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import PressureFeature from './pressurefeature';
import { Rating } from './averagecomp';

interface HealthData {
  month: string;
  year: number;
  blood_pressure: {
    systolic: {
        value: number;
        levels: "Higher than Average" | "Normal" | "Lower than Average";
    };
    diastolic: {
        value: number;
        levels: "Higher than Average" | "Normal" | "Lower than Average";
      };
    };
  heart_rate: {
        value: number;
        levels: "Higher than Average" | "Normal" | "Lower than Average";
    };
  respiratory_rate: {
        value: number;
        levels: "Higher than Average" | "Normal" | "Lower than Average";
    };
  temperature: {
        value: number;
        levels: "Higher than Average" | "Normal" | "Lower than Average";
    };
}

interface PressureDataSet {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  borderWidth: number;
  tension: number;
  pointRadius: number;
  pointBackgroundColor: string;
  pointBorderWidth: number;
  pointBorderColor: string;
}

interface PressureChartProps {
  data: HealthData[];
}

const PRESSURE_PARAMETERS = {
  Systolic: { minNormal: 90, maxNormal: 120 },
  Diastolic: { minNormal: 80, maxNormal: 90 }
} as const;


type PressureParameterKey = keyof typeof PRESSURE_PARAMETERS;

const MONTHS: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};

const getRating = (label: PressureParameterKey, value: number): Rating => {
  const { minNormal, maxNormal } = PRESSURE_PARAMETERS[label];
  if (value < minNormal) return Rating.Below;
  if (value > maxNormal) return Rating.Above;
  return Rating.Normal;
};

export default function PressureChart({ data }: PressureChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aYear = a.year;
      const bYear = b.year;
      if (aYear !== bYear) return bYear - aYear;
      return MONTHS[b.month] - MONTHS[a.month];
    });
  }, [data]);

  const chronologicalData = useMemo(() => 
    sortedData.slice(0, 6).reverse(), 
  [sortedData]);

  const labels = useMemo(() => 
    chronologicalData.map(entry => 
      `${entry.month.substring(0, 3)}. ${entry.year}`
    ), 
  [chronologicalData]);

  const pressureData: PressureDataSet[] = useMemo(() => [
    {
      label: 'Systolic',
      data: chronologicalData.map(entry => entry.blood_pressure.systolic.value),
      fill: false,
      borderColor: '#C26EB4',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: '#E66FD2',
      pointBorderWidth: 1,
      pointBorderColor: "white",
    },
    {
      label: 'Diastolic',
      data: chronologicalData.map(entry => entry.blood_pressure.diastolic.value),
      fill: false,
      borderColor: '#7E6CAB',
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 6,
      pointBackgroundColor: '#8C6FE6',
      pointBorderWidth: 1,
      pointBorderColor: "white",
    }
  ], [chronologicalData]);

  useEffect(() => {
    const resizeCanvas = () => {
      if (chartRef.current) {
        const canvas = chartRef.current;
        const container = canvas.parentElement;
        if (!container) return;
        
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        chartInstance.current?.resize();
      }
    };

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: pressureData
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                min: 60,
                max: 180,
                grid: { lineWidth: 2 }
              },
              x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
          }
        });

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => {
          chartInstance.current?.destroy();
          window.removeEventListener('resize', resizeCanvas);
        };
      }
    }
  }, [data, labels, pressureData]);

  return (
    <article className="flex bg-[#F4F0FE] w-full h-[290px] mx-6 rounded-md">
      <section className='w-[70%]'>
        <h1 className='p-3 text-lg font-bold'>Blood Pressure</h1>
        <div className="p-3 h-[calc(100%-56px)]">
          <canvas ref={chartRef}></canvas>
        </div>
      </section>
      <aside className='flex flex-col justify-center w-[30%] m-3 mt-3 gap-3'>
        {pressureData.map((pressureItem, index) => {
          const lastValue = pressureItem.data.slice(-1)[0];
          const rating = getRating(pressureItem.label as PressureParameterKey, lastValue);
          return (
            <React.Fragment key={pressureItem.label}>
              <PressureFeature
                label={pressureItem.label}
                value={lastValue}
                bgColor={pressureItem.pointBackgroundColor}
                rating={rating}
              />
              {index !== pressureData.length - 1 && (
                <div className="bg-gray-300 w-full h-[2px] my-3"></div>
              )}
            </React.Fragment>
          );
        })}
      </aside>
    </article>
  );
}