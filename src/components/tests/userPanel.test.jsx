import { describe, it, expect, vi, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import Userpanel from '../userPanel';
import { userContext } from '../../context/usercontext';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line no-unused-vars
import { useAuth0 } from '@auth0/auth0-react'

// mocks
vi.mock('@auth0/auth0-react');
const contextMock = { userMatrices: [{ instance_id: '1', title: 'one' }, { instance_id: '2', title: 'two' }], updateUserMatrices: () => { return 1 }, user: {}, selectedMatrix: { instance_id: '2', title: 'two' }, changeMatrix: () => { return 1 } }

describe('userpanel tests', () => {

    it('test show / hide panel buttons', async () => {

        // eslint-disable-next-line no-import-assign
        useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: vi.fn()
          });

        render(<Userpanel />)

        const user = userEvent.setup();

        const user_panel = screen.getByTestId('userpanel');
        const show_panel_btn = screen.getByTestId('showpanel');

        expect(user_panel).toBeInTheDocument();
        expect(user_panel).not.toHaveClass('cs-active');

        expect(show_panel_btn).toBeInTheDocument();

        // click show panel button
        await user.click(show_panel_btn);
        // active user panel
        expect(user_panel).toHaveClass('cs-active');

        const hide_panel_button = screen.getByTestId('hidepanel');

        // click to hide panel
        await user.click(hide_panel_button);
        expect(user_panel).not.toHaveClass('cs-active');
    });

    it('test user matrices', async () => {
        // eslint-disable-next-line no-import-assign
        useAuth0 = vi.fn().mockReturnValue({
            user: { nickname: 'Frodo' },
            isAuthenticated: true,
            getAccessTokenSilently: vi.fn()
          });

        render(
            <userContext.Provider value={contextMock}>
                <Userpanel />
            </userContext.Provider>
        )

        const user = userEvent.setup()

        const user_list = screen.getAllByRole('listitem');
        const select_buttons = screen.getAllByTestId('select-btn');
        
        // username
        expect(screen.getByText(/hi frodo/i)).toBeInTheDocument();
        expect(user_list).toHaveLength(2);
        expect(user_list[1]).toHaveClass('cs-active');
        expect(screen.getByTestId('new')).toBeInTheDocument();

        await user.click(select_buttons[0]);

    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

});