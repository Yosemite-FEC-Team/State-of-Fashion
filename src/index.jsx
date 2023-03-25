// Bring React in to build a component.
import React from 'react';
// Import from react-dom the ability to create a root render
import { createRoot } from 'react-dom/client';
import { Overview } from './overview/Overview.jsx';
import RelatedAndCompModule from './related/components/RelatedAndCompModule.jsx';

const root = createRoot(document.getElementById('root'));

// Huzzah for jsx!
const App = () => {
  return (
    <div>
      <h1>Hello World. Yes, we're leaving this here.</h1>
      <Overview />
      <RelatedAndCompModule />
    </div>
    )
}

root.render(<App />);