// Bring React in to build a component.
import React, {useEffect} from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
import axios from 'axios';
import RelatedAndCompModule from './related/components/RelatedAndCompModule.jsx';
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <RelatedAndCompModule />
    </div>
    )
}

root.render(<App />);

// useEffect(() => {
//   axios.get('http://localhost:3000/products/37311/related')
//   .then(result => console.log('result from react axios call', result.data))
//   .catch(err => console.log(err));
// }, [])