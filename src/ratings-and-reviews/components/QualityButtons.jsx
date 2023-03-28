import React, { useState } from 'react';

function QualityButtons() {
  const [selectedQuality, setSelectedQuality] = useState('');

  const handleQualityChange = (event) => {
    setSelectedQuality(event.target.value);
  }

  const options =['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect'];

  return (
    <>
      <p className='small-title'>Quality</p>
      <div style={{ display: 'flex', padding: '10px' }}>
        {options.map((option, i) => (
          <div key={option} style={{ marginRight: '10px', marginLeft: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <input
                type='radio'
                value={option}
                checked={selectedQuality === option}
                onChange={handleQualityChange}
              />
              <span className='baby-text' style={{ textAlign: 'center' }}>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default QualityButtons;