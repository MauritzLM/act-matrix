import { describe, it, expect, vi, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../pages/dashboard';

describe('description component tests', () => {

  it('test loading state', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve([{ title: 'one' }]),
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const auth0Mock = vi.fn(() => ({
      user: {},
      isAuthenticated: true,
      isLoading: true,
      getAccessTokenSilently: vi.fn(),
    }));

    vi.stubGlobal('useAuth0', auth0Mock)

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

    const auth0Mock = vi.fn(() => ({
      user: {},
      isAuthenticated: true,
      isLoading: false,
      getAccessTokenSilently: vi.fn(),
    }));

    vi.stubGlobal('useAuth0', auth0Mock)

    expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
  })

  afterAll(() => {
    vi.unstubAllGlobals();
  });

});