// Bring React in to build a component.
import React, { useState } from 'react';
// Import from react-dom the ability to create a root render
import { createRoot } from 'react-dom/client';
import { Overview } from './overview/Overview.jsx';
import axios from 'axios';
import RelatedProductsComparisonsOutfit from './related/components/RelatedProductsComparisonsOutfit.jsx';
import RatingsReviews from './ratings-and-reviews/components/RatingsReviews.jsx';

const root = createRoot(document.getElementById('root'));



// Huzzah for jsx!
const App = () => {
  const [currentId, setCurrentId] = useState('');

  const handleProductCardClick = (id) => {
    axios.post('/products', {id: id})
    .then(result => {
      if (typeof result.data === 'number') {
        result.data = result.data.toString();
      }
      return setCurrentId(result.data);
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Overview currentId={currentId} />
      <RelatedProductsComparisonsOutfit currentId={currentId} handleProductCardClick={handleProductCardClick} />
      <RatingsReviews currentId={currentId} />
    </div>
    )
}

root.render(<App />);