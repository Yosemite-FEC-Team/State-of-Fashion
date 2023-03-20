import { createRoot } from "react-dom/client";
import React from 'react';
import { Overview } from './overview/Overview.jsx'
const axios = require('axios');

// Huzzah for jsx!
const App = () => {

  return (
    <>
      <Overview />
    </>
  )
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);