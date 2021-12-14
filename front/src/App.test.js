import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './views/dashboard';
import CryptoDetail from './views/crypto-detail';
import DefaultLayout from './layouts/DefaultLayout';
import {MemoryRouter} from "react-router-dom";

test('Comprobar renderizado del Layout', () => {
  render(
    <MemoryRouter>
      <DefaultLayout/>
    </MemoryRouter>
  )
  const linkElement = screen.getByText(/Cripto Currency/i);
  expect(linkElement).toBeInTheDocument();
});

test('Comprobar renderizado del Dashboard', () => {
  render(<Dashboard/>)
  const linkElement = screen.getByRole(/container-dashboard/i);
  expect(linkElement).toBeInTheDocument();
});



