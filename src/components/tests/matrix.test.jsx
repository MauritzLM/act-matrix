import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Matrix from '../matrix'
import { userContext } from '../../context/usercontext'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

// mocks
vi.mock('../quadrant');
vi.mock('../matrixPreview');

describe("matrix component rendering", () => {
    it("test no matrix selected", () => {
        render(
            <userContext.Provider value={{ selectedMatrix: {} }}>
                <Matrix />
            </userContext.Provider>
        );

        expect(screen.getByText(/select a matrix/i)).toBeInTheDocument();

    });

    it("test preview state", async () => {
        render(
            <BrowserRouter>
                <userContext.Provider value={{ selectedMatrix: { title: 'One' } }}>
                    <Matrix />
                </userContext.Provider>
            </BrowserRouter>
        );

        const user = userEvent.setup();

        // click preview button
        const previewBtn_1 = screen.getByTestId('preview-btn');
        await user.click(previewBtn_1);

        // assert back button and click
        const backBtn = screen.getByTestId('back-btn');
        expect(backBtn).toBeInTheDocument();
        await user.click(backBtn);

        // assert preview
        expect(screen.getByTestId('preview-btn')).toBeInTheDocument();
    });

    it("test displaying selected matrix", () => {
        render(
            <BrowserRouter>
                <userContext.Provider value={{ selectedMatrix: { title: 'One' } }}>
                    <Matrix />
                </userContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByText(/one/i)).toBeInTheDocument();
        expect(screen.getByText(/five senses awareness/i)).toBeInTheDocument();
        expect(screen.getByText(/inner experience/i)).toBeInTheDocument();
    });
});
