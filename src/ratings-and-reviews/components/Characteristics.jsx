import React, {useEffect, useState} from 'react';

const Characteristics = () => {

  const trianglePercentage = 45;
  return (
    <>
    <div className='characteristics-bars'>
    <p className='small-text'>Size</p>
    <div className="triangle-container">
      <div className="rectangle" />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className="triangle" style={{ left: `${trianglePercentage}%` }} />
    </div>
    <div className='char-labels'>
      <div>Too small</div>
      <div>Perfect</div>
      <div>Too big</div>
    </div>
    </div>


    <div className='characteristics-bars'>
      <p className='small-text'>Width</p>
    <div className='triangle-container'>
      <div className='rectangle' />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className='triangle' style={{left: `40%`}} />
    </div>
    <div className='char-labels'>
    <div>Too narrow</div>
      <div>Perfect</div>
      <div>Too wide</div>
    </div>
    </div>


    <div className='characteristics-bars'>
      <p className='small-text'>Comfort</p>
    <div className='triangle-container'>
      <div className='rectangle' />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className='triangle' style={{left: `70%`}} />
    </div>
    <div className='char-labels'>
    <div>Uncomfortable</div>
      <div>As expected</div>
      <div>Perfect</div>
    </div>
    </div>

    <div className='characteristics-bars'>
      <p className='small-text'>Quality</p>
    <div className='triangle-container'>
      <div className='rectangle' />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className='triangle' style={{left: `50%`}} />
    </div>
    <div className='char-labels'>
    <div>Poor</div>
      <div>Okay</div>
      <div>Perfect</div>
    </div>
    </div>

    <div className='characteristics-bars'>
      <p className='small-text'>Length</p>
    <div className='triangle-container'>
      <div className='rectangle' />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className='triangle' style={{left: `30%`}} />
    </div>
    <div className='char-labels'>
    <div>Runs short</div>
      <div>Perfect</div>
      <div>Runs long</div>
    </div>
    </div>


    <div className='characteristics-bars'>
      <p className='small-text'>Fit</p>
    <div className='triangle-container'>
      <div className='rectangle' />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className='triangle' style={{left: `50%`}} />
    </div>
    <div className='char-labels'>
    <div>Runs tight</div>
      <div>Perfect</div>
      <div>Runs loose</div>
    </div>
    </div>
   </>
  )
}

export default Characteristics;