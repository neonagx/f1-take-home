import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter, Route, Router, Routes } from 'react-router-dom';

describe('<App/>', () => {

  test('should test Home Page as Overall Standing Page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Overall Standing 2022/i)).toBeInTheDocument();
    expect(screen.getByText(/GO TO RACE RESULTS/i)).toBeInTheDocument();
  });

  test('should test route to driver results', () => {
    render(
      <MemoryRouter initialEntries={["/driverresults/:id"]}>
        <App/>
      </MemoryRouter>
    );

    expect(screen.getByText(/Go Back To Overall Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Round/i)).toBeInTheDocument();
  });

  test('should test route to race results', () => {
    render(
      <MemoryRouter initialEntries={["/raceresults/:round"]}>
        <App/>
      </MemoryRouter>
    );

    expect(screen.getByText(/Go Back To Overall Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Driver Number/i)).toBeInTheDocument();
  });
})

