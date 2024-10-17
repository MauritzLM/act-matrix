import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MatrixPreview from '../matrixPreview'

// quadrant content
const content = {
    quadrant_1: '<li>quadrant 1</li>',
    quadrant_2: '<li>quadrant 2</li>',
    quadrant_3: '<li>quadrant 3</li>',
    quadrant_4: '<li>quadrant 4</li>',
}

describe('test matrix preview', () => {
    it('test component renders with correct content', () => {
        render(<MatrixPreview currentContent={content} />);

        const component_content = screen.getAllByRole('listitem');

        expect(component_content).toHaveLength(4);
        
        expect(component_content[0]).toHaveTextContent('quadrant 1');
        expect(component_content[1]).toHaveTextContent('quadrant 2');
        expect(component_content[2]).toHaveTextContent('quadrant 3');
        expect(component_content[3]).toHaveTextContent('quadrant 4');
    });
});