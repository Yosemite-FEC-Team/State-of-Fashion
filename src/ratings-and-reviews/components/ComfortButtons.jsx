import React, { useState } from 'react';



function ComfortButtons() {
  const [selectedComfort, setSelectedComfort] = useState('');

  const handleComfortChange = (event) => {
    setSelectedComfort(event.target.value);
  }

  const options =['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];

  return (
    <>
      <p className='small-title'>Comfort</p>
      <div style={{ display: 'flex', padding: '10px' }}>
        {options.map((option, i) => (
          <div key={option} style={{ marginRight: '10px', marginLeft: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <input
                type='radio'
                value={option}
                checked={selectedComfort === option}
                onChange={handleComfortChange}
              />
              <span className='baby-text' style={{ textAlign: 'center' }}>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}


export default ComfortButtons;