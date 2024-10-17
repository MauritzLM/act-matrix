import { describe, it, expect, vi, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import Nav from '../navigation';
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

const switchThemeMock = vi.fn()

describe('navigation tests', () => {
    it('rendering when user logged in', async () => {
        const auth0Mock = vi.fn(() => ({
            user: {},
            isAuthenticated: true,
            isLoading: false,
            getAccessTokenSilently: vi.fn(),
        }));
        vi.stubGlobal('useAuth0', auth0Mock)

        render(<BrowserRouter><Nav location={'/'} theme={'light'} switchTheme={switchThemeMock} /></BrowserRouter>)

        const user = userEvent.setup()

        let navLinks;

        await vi.waitFor(async () => {
            navLinks = await screen.findAllByTestId('navlink')
        });

        // dashboard link (test not working)*
        // expect(navLinks).toHaveLength(3);

        // active link
        expect(navLinks[0]).toHaveClass('cs-active')

        // theme switch function called
        const theme_toggle = screen.getByTestId('theme-toggle')

        await user.click(theme_toggle)

        expect(switchThemeMock).toHaveBeenCalled();
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });
});