import React, { useState } from 'react';


function FitButtons() {
  const [selectedFit, setSelectedFit] = useState('');

  const handleFitChange = (event) => {
    setSelectedFit(event.target.value);
  }

  const options =['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose'];

  return (
    <>
      <p className='small-title'>Fit</p>
      <div style={{ display: 'flex', padding: '10px' }}>
        {options.map((option, i) => (
          <div key={option} style={{ marginRight: '10px', marginLeft: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <input
                type='radio'
                value={option}
                checked={selectedFit === option}
                onChange={handleFitChange}
              />
              <span className='baby-text' style={{ textAlign: 'center' }}>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}



export default FitButtons;