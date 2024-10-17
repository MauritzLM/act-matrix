import { describe, it, expect, vi, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import Userpanel from '../userPanel';
import { userContext } from '../../context/usercontext';
import userEvent from '@testing-library/user-event';


// auth0 -> user, getaccesstokensilently
// state -> active panel
// mocks
const contextMock = { userMatrices: [{ instance_id: '1', title: 'one' }, { instance_id: '2', title: 'two' }], updateUserMatrices: () => { return 1 }, user: {}, selectedMatrix: { instance_id: '2', title: 'two' }, changeMatrix: () => { return 1 } }
// const updateSelectionMock = vi.spyOn(Userpanel, 'updateSelection');

describe('userpanel tests', () => {

    it('test show / hide panel buttons', async () => {
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
        const auth0Mock = vi.fn(() => ({
            user: { nickname: 'Frodo' },
            isAuthenticated: true,
            isLoading: false,
            getAccessTokenSilently: vi.fn(),
        }));

        vi.stubGlobal('useAuth0', auth0Mock);

        render(
            <userContext.Provider value={contextMock}>
                <Userpanel />
            </userContext.Provider>
        )

        const user = userEvent.setup()

        const user_list = screen.getAllByRole('listitem');
        const select_buttons = screen.getAllByTestId('select-btn');

        expect(user_list).toHaveLength(2);
        expect(user_list[1]).toHaveClass('cs-active');
        expect(screen.getByTestId('new')).toBeInTheDocument();

        await user.click(select_buttons[0]);

        // how to mock function inside component ?*
        // expect(updateSelectionMock).toHaveBeenCalled();
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

});