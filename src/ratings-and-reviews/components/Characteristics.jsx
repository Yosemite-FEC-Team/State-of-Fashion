import React, {useEffect, useState} from 'react';
const axios = require('axios');


const Characteristics = () => {


  const [charObject, setCharObject] = useState({});
  const [sizeRating, setSizeRating] =useState(0);
  const [widthRating, setWidthRating] =useState(0);
  const [comfortRating, setComfortRating] =useState(0);
  const [qualityRating, setQualityRating] =useState(0);
  const [lengthRating, setLengthRating] =useState(0);
  const [fitRating, setFitRating] =useState(0);
  useEffect(() => {
    axios.get('/products/reviews/meta')
    .then(data => {

      if (data.data.characteristics.Size) {
        //take this number divided by 5 and times 100 and do setSizeRating
        var sizeRawNumber = data.data.characteristics.Size.value;

        var sizePercent = ((sizeRawNumber/5)*100).toFixed(0);
        setSizeRating(sizePercent)
      }
      if (data.data.characteristics.Width) {
        //take this number divided by 5 and times 100 and do setSizeRating
        var widthRawNumber = data.data.characteristics.Width.value;

        var widthPercent = ((widthRawNumber/5)*100).toFixed(0);
        setWidthRating(widthPercent)
      }
      if (data.data.characteristics.Comfort) {
        //take this number divided by 5 and times 100 and do setSizeRating
        var comfortRawNumber = data.data.characteristics.Comfort.value;

        var comfortPercent = ((comfortRawNumber/5)*100).toFixed(0);
        setComfortRating(comfortPercent)
      }
      if (data.data.characteristics.Quality) {
        //take this number divided by 5 and times 100 and do setSizeRating
        var qualityRawNumber = data.data.characteristics.Quality.value;

        var qualityPercent = ((qualityRawNumber/5)*100).toFixed(0);
        setQualityRating(qualityPercent)
      }
      if (data.data.characteristics.Length) {
        //take this number divided by 5 and times 100 and do setSizeRating
        var lengthRawNumber = data.data.characteristics.Length.value;

        var lengthPercent = ((lengthRawNumber/5)*100).toFixed(0);
        setLengthRating(lengthPercent)
      }
      if (data.data.characteristics.Fit) {
        //take this number divided by 5 and times 100 and do setSizeRating
        var fitRawNumber = data.data.characteristics.Fit.value;

        var fitPercent = ((fitRawNumber/5)*100).toFixed(0);
        setFitRating(fitPercent)
      }
      setCharObject(data.data)
      })
      .catch(err => {
      console.log(err, 'Error getting review metadata from the server');
      });

  }, [])


  console.log(charObject, 'should be the charObject');

  var characteristicsRatings = charObject.characteristics

  console.log('object of chars', characteristicsRatings)


  return (
    <>
    {sizeRating > 0 && (
       <div className='characteristics-bars'>
    <p className='small-text'>Size</p>
    <div className="triangle-container">
      <div className="rectangle" />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className="triangle" style={{ left: `${sizeRating}%` }} />
    </div>
    <div className='char-labels'>
      <div>Too small</div>
      <div>Perfect</div>
      <div>Too big</div>
    </div>
    </div>)}



    {widthRating > 0 && (
    <div className='characteristics-bars'>
    <p className='small-text'>Width</p>
    <div className='triangle-container'>
      <div className='rectangle' />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className='triangle' style={{left: `${widthRating}%`}} />
    </div>
    <div className='char-labels'>
      <div>Too narrow</div>
      <div>Perfect</div>
      <div>Too wide</div>
    </div>
   </div>
  )}

  {comfortRating > 0 && (
        <div className='characteristics-bars'>
        <p className='small-text'>Comfort</p>
      <div className='triangle-container'>
        <div className='rectangle' />
        <div className="rectangle" />
        <div className="right-rectangle" />
        <div className='triangle' style={{left: `${comfortRating}%`}} />
      </div>
      <div className='char-labels'>
      <div>Uncomfortable</div>
        <div>As expected</div>
        <div>Perfect</div>
      </div>
      </div>
  )}

  {qualityRating > 0 && (
        <div className='characteristics-bars'>
        <p className='small-text'>Quality</p>
      <div className='triangle-container'>
        <div className='rectangle' />
        <div className="rectangle" />
        <div className="right-rectangle" />
        <div className='triangle' style={{left: `${qualityRating}%`}} />
      </div>
      <div className='char-labels'>
      <div>Poor</div>
        <div>Okay</div>
        <div>Perfect</div>
      </div>
      </div>
  )}

  {lengthRating > 0 && (
      <div className='characteristics-bars'>
      <p className='small-text'>Length</p>
    <div className='triangle-container'>
      <div className='rectangle' />
      <div className="rectangle" />
      <div className="right-rectangle" />
      <div className='triangle' style={{left: `${lengthRating}%`}} />
    </div>
    <div className='char-labels'>
    <div>Runs short</div>
      <div>Perfect</div>
      <div>Runs long</div>
    </div>
    </div>
  )}


  {fitRating > 0 && (
    <div className='characteristics-bars'>
    <p className='small-text'>Fit</p>
  <div className='triangle-container'>
    <div className='rectangle' />
    <div className="rectangle" />
    <div className="right-rectangle" />
    <div className='triangle' style={{left:`${fitRating}%`}} />
  </div>
  <div className='char-labels'>
  <div>Runs tight</div>
    <div>Perfect</div>
    <div>Runs loose</div>
  </div>
  </div>
  )}

   </>
  )
}

export default Characteristics;