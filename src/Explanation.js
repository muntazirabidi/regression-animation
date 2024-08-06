import React from 'react';

const Explanation = () => (
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
);

export default Explanation;
