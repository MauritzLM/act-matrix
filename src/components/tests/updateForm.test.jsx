import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import UpdateForm from '../updateForm';

describe('update form', () => {
    const updateObj = { type: '', errorMsg: 'please enter a valid name', }
    const setUpdate = vi.fn()
    const updateFunction = vi.fn()

    it('update form rendering', () => {

        render(<UpdateForm updateObj={updateObj} setUpdate={setUpdate} updateFunction={updateFunction} />)

        expect(screen.getByTestId('form')).toBeInTheDocument()
        expect(screen.getByTestId('error')).toHaveTextContent('please enter a valid name')

    })

    it('submit button testing', async () => {
        const user = userEvent.setup()
        render(<UpdateForm updateObj={updateObj} setUpdate={setUpdate} updateFunction={updateFunction} />)

        const submitBtn = screen.getByTestId('submit')

        await user.click(submitBtn)

        expect(updateFunction).toHaveBeenCalled()
    })

    it('close button testing', async () => {
        const user = userEvent.setup()
        render(<UpdateForm updateObj={updateObj} setUpdate={setUpdate} updateFunction={updateFunction} />)

        const closeBtn = screen.getByTestId('close')

        await user.click(closeBtn)

        expect(setUpdate).toHaveBeenCalled()
    })

})
