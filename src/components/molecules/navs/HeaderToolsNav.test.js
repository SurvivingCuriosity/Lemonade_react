import { MemoryRouter, Link } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

it('routes to a new route', async () => {
  const history = createMemoryHistory();

  // mock push function
  history.push = jest.fn();

  const { getByText } = render(
    <MemoryRouter history={history}>
      <Link to="/hello">Click me</Link>
    </MemoryRouter>
  );

  // could be userEvent.click
  fireEvent.click(getByText(''));

  // spy on push calls, assert on url (parameter)
  expect(history.push).toHaveBeenCalledWith('/hello');
});