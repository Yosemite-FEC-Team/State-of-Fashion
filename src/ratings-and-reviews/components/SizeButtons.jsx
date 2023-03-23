import React, { useState } from 'react';

function SizeButtons() {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  }

  const options =['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'];
  return (
    <>
    <h5>Size</h5>
    <div>
      {options.map((option) => (
        <>
        <label key={option}>
          <input
          type='radio'
          value={option}
          checked={selectedSize === option}
          onChange={handleSizeChange}
          />
        </label>
        <span>{option}</span>
        </>
      ))}
    </div>
    </>
  )
}

export default SizeButtons;