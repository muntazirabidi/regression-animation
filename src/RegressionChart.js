import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const RegressionChart = ({ data, slope, intercept }) => {
  // Calculate the regression line points
  const regressionLine = useMemo(() => {
    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    return [
      { x: xMin, y: slope * xMin + intercept },
      { x: xMax, y: slope * xMax + intercept },
    ];
  }, [data, slope, intercept]);

  // Calculate the mean of y values and generate mean line points
  const meanLine = useMemo(() => {
    const yMean = data.reduce((sum, point) => sum + point.y, 0) / data.length;
    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    return [
      { x: xMin, y: yMean },
      { x: xMax, y: yMean },
    ];
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="x" name="X" domain={['dataMin', 'dataMax']} />
        <YAxis type="number" dataKey="y" name="Y" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Data Points" data={data} fill="#8884d8" />
        <Scatter
          name="Best Fit Line"
          data={regressionLine}
          line={{ stroke: 'red', strokeWidth: 2 }}
          lineJointType="monotoneX"
          fill="none"
        />
        <Scatter
          name="Mean Line"
          data={meanLine}
          line={{ stroke: 'green', strokeDasharray: '5 5', strokeWidth: 2 }}
          lineJointType="monotoneX"
          fill="none"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default RegressionChart;
