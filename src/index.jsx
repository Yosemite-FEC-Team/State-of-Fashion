// Bring React in to build a component.
import React, {useEffect} from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
import axios from 'axios';
import RelatedAndCompModule from './related/components/RelatedAndCompModule.jsx';
import { Overview } from './overview/Overview.jsx'
const root = createRoot(document.getElementById("root"));
import RatingsReviews from './ratings-and-reviews/components/RatingsReviews.jsx'

// Huzzah for jsx!
const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Overview />
      <RelatedAndCompModule />
      <RatingsReviews />
    </div>
    )
}

root.render(<App />);

// useEffect(() => {
//   axios.get('http://localhost:3000/products/37311/related')
//   .then(result => console.log('result from react axios call', result.data))
//   .catch(err => console.log(err));
// }, [])

