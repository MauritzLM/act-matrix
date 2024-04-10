import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import UpdateForm from '../updateForm';

describe('update form', () => {
    const updateObj = { type: 'profile', errorMsg: 'please enter a valid name', }
    const setUpdate = vi.fn()
    const updateFunction = vi.fn()

    it('update form rendering with error message', () => {

        render(<UpdateForm updateObj={updateObj} setUpdate={setUpdate} updateFunction={updateFunction} />)

        expect(screen.getByTestId('form')).toBeInTheDocument()
        expect(screen.getByTestId('error')).toHaveTextContent('please enter a valid name')
        expect(screen.queryByTestId('delete')).not.toBeInTheDocument()

    });

    it('submit button testing', async () => {
        const user = userEvent.setup()
        render(<UpdateForm updateObj={updateObj} setUpdate={setUpdate} updateFunction={updateFunction} />)

        const submitBtn = screen.getByTestId('submit')

        await user.click(submitBtn)

        expect(updateFunction).toHaveBeenCalled()
    });

    it('close button testing', async () => {
        const user = userEvent.setup()
        render(<UpdateForm updateObj={updateObj} setUpdate={setUpdate} updateFunction={updateFunction} />)

        const closeBtn = screen.getByTestId('close')

        await user.click(closeBtn)

        expect(setUpdate).toHaveBeenCalled()
    });

    it('delete message and no error', () => {
        const deleteObj = {type: 'delete', title: 'One', errorMsg: ''}

        render(<UpdateForm updateObj={deleteObj} setUpdate={setUpdate} updateFunction={updateFunction}/>)

        expect(screen.getByText('Are you sure you want to delete One?')).toBeInTheDocument()
        expect(screen.getByTestId('error')).toHaveTextContent('')
    });

});
