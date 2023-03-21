// Bring React in to build a component.
import React from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
import RatingsReviews from './ratings-and-reviews/components/RatingsReviews.jsx'

// Huzzah for jsx!
const App = () => {
  return (
    <>
    <RatingsReviews />
    </>
  )
}

root.render(<App />);