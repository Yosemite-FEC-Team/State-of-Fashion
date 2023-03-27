import React, { useState } from 'react';

function SizeButtons() {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  }

  const options =['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'];

  return (
    <>
      <p className='small-title'>Size</p>
      <div style={{ display: 'flex', padding: '10px' }}>
        {options.map((option, i) => (
          <div key={option} style={{ marginRight: '10px', marginLeft: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <input
                type='radio'
                value={option}
                checked={selectedSize === option}
                onChange={handleSizeChange}
              />
              <span className='baby-text' style={{ textAlign: 'center' }}>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}




export default SizeButtons;