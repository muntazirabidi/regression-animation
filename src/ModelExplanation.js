import React from 'react';

const ModelExplanation = ({ slope, intercept, error, rSquared, explanation, setExplanation }) => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Slope:</strong> {slope.toFixed(2)}</p>
        <p><strong>Intercept:</strong> {intercept.toFixed(2)}</p>
        <p><strong>Error (MSE):</strong> {error}</p>
        <p><strong>R² (R-squared):</strong> {rSquared}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          onClick={() => setExplanation('slope')} 
          style={{ padding: '10px', backgroundColor: explanation === 'slope' ? '#f1c40f' : '#f9f9f9', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          What is Slope?
        </button>
        <button 
          onClick={() => setExplanation('intercept')} 
          style={{ padding: '10px', backgroundColor: explanation === 'intercept' ? '#e74c3c' : '#f9f9f9', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          What is Intercept?
        </button>
        <button 
          onClick={() => setExplanation('error')} 
          style={{ padding: '10px', backgroundColor: explanation === 'error' ? '#3498db' : '#f9f9f9', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          What is Error?
        </button>
        <button 
          onClick={() => setExplanation('rSquared')} 
          style={{ padding: '10px', backgroundColor: explanation === 'rSquared' ? '#2ecc71' : '#f9f9f9', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          What is R²?
        </button>
      </div>
      <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', minHeight: '100px' }}>
        {explanation === 'slope' && (
          <p>The slope ({slope.toFixed(2)}) tells us how much Y changes when X increases by 1. A positive slope means Y increases as X increases.</p>
        )}
        {explanation === 'intercept' && (
          <p>The intercept ({intercept.toFixed(2)}) is where our line crosses the Y-axis. It's the predicted Y value when X is 0.</p>
        )}
        {explanation === 'error' && (
          <p>The error (MSE: {error}) measures how well our line fits the data. Lower error means a better fit!</p>
        )}
        {explanation === 'rSquared' && (
          <p>R² ({rSquared}) is a measure of how well the model fits the data. It ranges from 0 to 1, where 1 indicates a perfect fit. It represents the proportion of the variance in the dependent variable that is predictable from the independent variable.</p>
        )}
      </div>
    </div>
  );
};

export default ModelExplanation;