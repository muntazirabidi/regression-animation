import React from 'react';

const AnimationControls = ({ isAnimating, setIsAnimating, handleRegenerate, noise, setNoise }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <button 
          onClick={() => setIsAnimating(!isAnimating)}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {isAnimating ? 'Pause Animation' : 'Start Animation'}
        </button>
        <button 
          onClick={handleRegenerate}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Regenerate Data
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
        <label style={{ marginRight: '10px' }}>Data Noise: </label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={noise} 
          onChange={(e) => setNoise(Number(e.target.value))} 
          style={{ width: '100px' }}
        />
        <span style={{ marginLeft: '10px' }}>{noise}</span>
      </div>
    </div>
  );
};

export default AnimationControls;