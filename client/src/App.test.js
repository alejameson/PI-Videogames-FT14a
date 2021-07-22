import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from "./components/Landing/Landing";
import App from "./App";


test('Deberia renderizar el logo', () => {
  const { queryByTestId } = render (<Landing />);
  expect(queryByTestId("titlearcade")).toBeTruthy();
});