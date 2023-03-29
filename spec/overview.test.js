import Gallery from '../src/overview/Gallery.jsx';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

test('renders the Gallery component, absolute bare minimum here', () => {
  render(<Gallery />);
  const overviewComponent = screen.getByTestId('gallery');
  expect(overviewComponent).toBeInTheDocument();
});