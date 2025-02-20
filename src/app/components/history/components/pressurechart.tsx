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

// Simple debounce function
function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}

export default function PressureChart({ data }: PressureChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aYear = a.year;
      const bYear = b.year;
      if (aYear !== bYear) return bYear - aYear;
      return MONTHS[b.month] - MONTHS[a.month];
    });
  }, [data]);

  const chronologicalData = useMemo(() => sortedData.slice(0, 6).reverse(), [sortedData]);

  const labels = useMemo(
    () => chronologicalData.map(entry => `${entry.month.substring(0, 3)}. ${entry.year}`),
    [chronologicalData]
  );

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

  // Use useMemo instead of useCallback to avoid the dependency warning.
  const handleResize = useMemo(
    () =>
      debounce(() => {
        if (chartInstance.current) {
          chartInstance.current.resize();
        }
      }, 100),
    []
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (handleResize.cancel) {
        handleResize.cancel();
      }
    };
  }, [handleResize]);

  // Chart creation useEffect
  useEffect(() => {
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
            plugins: { 
              legend: { display: false }
            },
            layout: {
              padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, pressureData]);

  return (
    <article className="flex md:flex-row items-center flex-col bg-[#F4F0FE] w-[calc(100%-48px)] md:h-fit h-auto mx-6 rounded-md gap-5 md:pb-0 pb-8 md:gap-0">
      <section className='md:w-[70%] w-full m-2'>
        <h1 className='p-6 text-lg font-bold'>Blood Pressure</h1>
        <div ref={containerRef} className="flex relative w-full lg:h-[300px] h-[200px] md:px-0 px-4">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
        </div>
      </section>
      <aside className='flex md:items-center md:flex-col md:justify-center justify-around md:w-[30%] w-full h-full md:gap-3'>
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
                <div className="bg-gray-300 md:w-[80%] md:h-[2px] h-[50px] w-[2px] my-3 -mx-10 md:mx-0"></div>
              )}
            </React.Fragment>
          );
        })}
      </aside>
    </article>
  );
}
