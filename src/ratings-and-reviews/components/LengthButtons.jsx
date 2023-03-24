import React, { useState } from 'react';

function LengthButtons() {
  const [selectedLength, setSelectedLength] = useState('');

  const handleLengthChange = (event) => {
    setSelected(event.target.value);
  }

  const options =['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
  return (
    <>
    <h5>Length</h5>
    <div>
      {options.map((option) => (
        <>
        <label key={option}>
          <input
          type='radio'
          value={option}
          checked={selectedLength === option}
          onChange={handleLengthChange}
          />
        </label>
        <span>{option}</span>
        </>
      ))}
    </div>
    </>
  )
}

export default LengthButtons;