import React, { useState } from 'react';



function WidthButtons() {
  const [selectedWidth, setSelectedWidth] = useState('');

  const handleWidthChange = (event) => {
    setSelectedWidth(event.target.value);
  }

  const options =['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly Wide', 'Too wide'];

  return (
    <>
      <p className='small-title'>Width</p>
      <div style={{ display: 'flex', padding: '10px' }}>
        {options.map((option, i) => (
          <div key={option} style={{ marginRight: '10px', marginLeft: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <input
                type='radio'
                value={option}
                checked={selectedWidth === option}
                onChange={handleWidthChange}
              />
              <span className='baby-text' style={{ textAlign: 'center' }}>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default WidthButtons;