import React, { useState, useEffect, useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const generateData = (slope, intercept, noise, numPoints = 15) => {
  return Array.from({ length: numPoints }, (_, i) => {
    const x = i + 1;
    const y = slope * x + intercept + (Math.random() * noise * 2 - noise);
    return { x, y };
  });
};

const R2Visualization = ({ ssTotal, ssResidual, animatedRSquared }) => {
  const ssTotalWidth = 200; // Fixed width for SSTotal bar
  const ssResidualWidth = (ssResidual / ssTotal) * ssTotalWidth;

  return (
    <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
      <h4>R² Visualization:</h4>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: `${ssTotalWidth}px`, marginBottom: '10px' }}>
          <div style={{ width: '100%', height: '20px', backgroundColor: 'lightblue', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            SS<sub>total</sub> = {ssTotal.toFixed(2)}
          </div>
        </div>
        <div style={{ width: `${ssTotalWidth}px`, marginBottom: '10px' }}>
          <div style={{ width: `${ssResidualWidth}px`, height: '20px', backgroundColor: 'salmon', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            SS<sub>residual</sub> = {ssResidual.toFixed(2)}
          </div>
        </div>
      </div>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        R² = 1 - (SS<sub>residual</sub> / SS<sub>total</sub>)
      </p>
      <p style={{ textAlign: 'center' }}>
        R² = 1 - ({ssResidual.toFixed(2)} / {ssTotal.toFixed(2)}) = {animatedRSquared.toFixed(4)}
      </p>
    </div>
  );
};

const LinearRegressionVisualizer = () => {
  const [data, setData] = useState(generateData(2, 0, 5));
  const [userSlope, setUserSlope] = useState(0);
  const [userIntercept, setUserIntercept] = useState(5);
  const [noise, setNoise] = useState(5);
  const [numPoints, setNumPoints] = useState(15);
  const [showResiduals, setShowResiduals] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLine, setShowLine] = useState(true);
  const [animatedRSquared, setAnimatedRSquared] = useState(0);

  const { bestFitSlope, bestFitIntercept, rSquared, mse, ssTotal, ssResidual } = useMemo(() => {
    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.x, 0);
    const sumY = data.reduce((sum, point) => sum + point.y, 0);
    const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const yMean = sumY / n;
    let ssTotal = 0;
    let ssResidual = 0;

    data.forEach(point => {
      const predicted = slope * point.x + intercept;
      ssResidual += Math.pow(point.y - predicted, 2);
      ssTotal += Math.pow(point.y - yMean, 2);
    });

    const rSquared = 1 - (ssResidual / ssTotal);
    const mse = ssResidual / n;

    return { bestFitSlope: slope, bestFitIntercept: intercept, rSquared, mse, ssTotal, ssResidual };
  }, [data]);

  useEffect(() => {
    let animationFrame;
    if (isAnimating) {
      const animate = () => {
        setUserSlope(prevSlope => {
          const newSlope = prevSlope + (bestFitSlope - prevSlope) * 0.05;
          return Math.abs(newSlope - bestFitSlope) < 0.01 ? bestFitSlope : newSlope;
        });
        setUserIntercept(prevIntercept => {
          const newIntercept = prevIntercept + (bestFitIntercept - prevIntercept) * 0.05;
          return Math.abs(newIntercept - bestFitIntercept) < 0.01 ? bestFitIntercept : newIntercept;
        });

        setAnimatedRSquared(prevR2 => {
          const newR2 = prevR2 + (rSquared - prevR2) * 0.05;
          return Math.abs(newR2 - rSquared) < 0.0001 ? rSquared : newR2;
        });

        if (
          Math.abs(userSlope - bestFitSlope) > 0.01 ||
          Math.abs(userIntercept - bestFitIntercept) > 0.01 ||
          Math.abs(animatedRSquared - rSquared) > 0.0001
        ) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isAnimating, bestFitSlope, bestFitIntercept, userSlope, userIntercept, rSquared, animatedRSquared]);

  const userLine = useMemo(() => {
    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    return [
      { x: xMin, y: userSlope * xMin + userIntercept },
      { x: xMax, y: userSlope * xMax + userIntercept },
    ];
  }, [data, userSlope, userIntercept]);

  const bestFitLine = useMemo(() => {
    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    return [
      { x: xMin, y: bestFitSlope * xMin + bestFitIntercept },
      { x: xMax, y: bestFitSlope * xMax + bestFitIntercept },
    ];
  }, [data, bestFitSlope, bestFitIntercept]);

  const residuals = useMemo(() => {
    return data.map(point => ({
      x: point.x,
      y: point.y,
      yPredicted: userSlope * point.x + userIntercept,
    }));
  }, [data, userSlope, userIntercept]);

  const handleRegenerate = () => {
    setData(generateData(2, 0, noise, numPoints));
    setUserSlope(0);
    setUserIntercept(5);
    setIsAnimating(false);
    setAnimatedRSquared(0);
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    height: '95vh',
  };

  const sectionStyle = {
    flex: 1,
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Enhanced Linear Regression Visualizer</h2>
      <div style={{ display: 'flex', height: 'calc(100% - 60px)' }}>
        <div style={{ flex: 2, marginRight: '20px' }}>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="X" />
              <YAxis type="number" dataKey="y" name="Y" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Data Points" data={data} fill="#8884d8" />
              {showLine && (
                <>
                  <Scatter name="User Line" data={userLine} line={{ stroke: 'blue', strokeWidth: 2 }} lineJointType="monotoneX" fill="none" />
                  <Scatter name="Best Fit Line" data={bestFitLine} line={{ stroke: 'red', strokeWidth: 2 }} lineJointType="monotoneX" fill="none" />
                </>
              )}
              {showResiduals && residuals.map((point, index) => (
                <ReferenceLine key={index} segment={[{ x: point.x, y: point.y }, { x: point.x, y: point.yPredicted }]} stroke="green" strokeDasharray="3 3" />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <R2Visualization ssTotal={ssTotal} ssResidual={ssResidual} animatedRSquared={animatedRSquared} />
        </div>
        <div style={sectionStyle}>
          <h3 style={{ color: '#333', textAlign: 'center' }}>Model Parameters</h3>
          <div>
            <label>User Slope: {userSlope.toFixed(2)}</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={userSlope}
              onChange={(e) => setUserSlope(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>User Intercept: {userIntercept.toFixed(2)}</label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={userIntercept}
              onChange={(e) => setUserIntercept(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Data Noise: {noise}</label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={noise}
              onChange={(e) => setNoise(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Number of Points: {numPoints}</label>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={numPoints}
              onChange={(e) => setNumPoints(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <button onClick={handleRegenerate} style={buttonStyle}>
            Regenerate Data
          </button>
          <button onClick={() => setShowResiduals(!showResiduals)} style={buttonStyle}>
            {showResiduals ? 'Hide Residuals' : 'Show Residuals'}
          </button>
          <button onClick={() => setShowLine(!showLine)} style={buttonStyle}>
            {showLine ? 'Hide Line' : 'Show Line'}
          </button>
          <button onClick={() => setIsAnimating(true)} style={buttonStyle}>
            Start Animation
          </button>
          <h3 style={{ color: '#333', textAlign: 'center' }}>Model Metrics</h3>
          <p>Best Fit Slope: {bestFitSlope.toFixed(2)}</p>
          <p>Best Fit Intercept: {bestFitIntercept.toFixed(2)}</p>
          <p>R-squared: {rSquared.toFixed(4)}</p>
          <p>Mean Squared Error: {mse.toFixed(4)}</p>
          <button onClick={() => setShowExplanation(!showExplanation)} style={buttonStyle}>
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
          </button>
          {showExplanation && (
  <div style={{ marginTop: '10px' }}>
    <h4>Linear Regression Explanation:</h4>
    <p>
      Linear regression finds the best-fitting straight line through a set of points. This line is described by two parameters:
    </p>
    <ul>
      <li><strong>Slope:</strong> Represents the change in Y for a one-unit change in X.</li>
      <li><strong>Intercept:</strong> The Y-value where the line crosses the Y-axis (X = 0).</li>
    </ul>
    <p>
      The best fit line minimizes the sum of squared differences between predicted and actual Y values.
    </p>
    <h4>Model Metrics:</h4>
    <ul>
      <li><strong>R-squared (R²):</strong> Measures how well the model fits the data. It ranges from 0 to 1, with 1 indicating a perfect fit.</li>
      <li><strong>Mean Squared Error (MSE):</strong> The average squared difference between predicted and actual values. Lower values indicate better fit.</li>
    </ul>
    <h4>Interaction:</h4>
    <ul>
      <li>Adjust the sliders to change the user line and see how it compares to the best fit line.</li>
      <li>Use "Regenerate Data" to create a new dataset with the current noise level and number of points.</li>
      <li>Toggle "Show Residuals" to visualize the differences between your line and the actual data points.</li>
      <li>Click "Start Animation" to see the user line automatically adjust to the best fit line and watch R² change.</li>
      <li>Use "Hide Line" to focus on just the data points.</li>
    </ul>
    <h4>R² Visualization:</h4>
    <ul>
      <li>The blue bar represents the total variance in the data (SS<sub>total</sub>).</li>
      <li>The red bar represents the unexplained variance (SS<sub>residual</sub>).</li>
      <li>R² is calculated as 1 - (SS<sub>residual</sub> / SS<sub>total</sub>).</li>
      <li>A larger R² (closer to 1) indicates a better fit, with the red bar becoming smaller.</li>
    </ul>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default LinearRegressionVisualizer;