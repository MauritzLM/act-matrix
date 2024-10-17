/* eslint-disable no-import-assign */
import { describe, it, expect, vi, afterAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dashboard from '../../pages/dashboard'
// eslint-disable-next-line no-unused-vars
import { useAuth0 } from '@auth0/auth0-react'

vi.mock('@auth0/auth0-react');

describe('description component tests', () => {

  it('test loading state', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve([{ title: 'one' }]),
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: true,
      isLoading: true
    });

    render(<Dashboard />)

    // displays loading state
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  })

  it('test not loading', () => {
    const fetchMock = vi.fn();
    fetchMock.mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve([{ title: 'one' }]),
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: true,
      isLoading: false
    });

    expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
  })

  afterAll(() => {
    vi.unstubAllGlobals();
  });

});