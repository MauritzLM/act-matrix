import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Userpanel from '../userPanel';


describe('userpanel', () => {
    it('rendering correct welcome message', () => {

        render(<Userpanel />)

        expect(screen.getByRole('heading')).toHaveTextContent('Hi')
        expect(screen.getByTestId('new')).toBeInTheDocument();
    });

});