/* eslint-disable no-import-assign */
import { describe, it, expect, vi, afterAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from '../navigation'
import { BrowserRouter } from "react-router-dom"
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line no-unused-vars
import { useAuth0 } from '@auth0/auth0-react'

vi.mock('@auth0/auth0-react');

const switchThemeMock = vi.fn()

describe('navigation tests', () => {
    it('rendering when user logged in', async () => {
        useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            isLoading: false
        });

        render(<BrowserRouter><Nav location={'/'} theme={'light'} switchTheme={switchThemeMock} /></BrowserRouter>)

        const user = userEvent.setup()

        let navLinks;

        await vi.waitFor(async () => {
            navLinks = await screen.findAllByTestId('navlink')
        });

        // dashboard link
        expect(navLinks).toHaveLength(3);
        expect(navLinks[2]).toHaveTextContent(/dashboard/i);

        // active link
        expect(navLinks[0]).toHaveClass('cs-active')

        // theme switch function called
        const theme_toggle = screen.getByTestId('theme-toggle')

        await user.click(theme_toggle)

        expect(switchThemeMock).toHaveBeenCalled();

        // logout button
        expect(screen.getByText(/log out/i)).toBeInTheDocument();
    });

    it('rendering when user not logged in', async () => {
        useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: false,
            isLoading: false
        });

        render(<BrowserRouter><Nav location={'/'} theme={'light'} switchTheme={switchThemeMock} /></BrowserRouter>);

        const navLinks = await screen.findAllByTestId('navlink');

        expect(navLinks).toHaveLength(2);

        // login button
        expect(screen.getByText(/log in/i)).toBeInTheDocument();

    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });
});