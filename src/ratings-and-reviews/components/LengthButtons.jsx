import React, { useState } from 'react';


function LengthButtons() {
  const [selectedLength, setSelectedLength] = useState('');

  const handleLengthChange = (event) => {
    setSelectedLength(event.target.value);
  }

  const options =['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];

  return (
    <>
      <p className='small-title'>Length</p>
      <div style={{ display: 'flex', padding: '10px' }}>
        {options.map((option, i) => (
          <div key={option} style={{ marginRight: '10px', marginLeft: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <input
                type='radio'
                value={option}
                checked={selectedLength === option}
                onChange={handleLengthChange}
              />
              <span className='baby-text' style={{ textAlign: 'center' }}>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}


export default LengthButtons;