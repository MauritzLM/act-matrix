// eslint-disable-next-line no-unused-vars
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TextEditor from '../editor'
import userEvent from '@testing-library/user-event'

// https://github.com/ueberdosis/tiptap/discussions/4008 - example

// id, currentcontent, setcurrent content
const setContentMock = vi.fn();
const content = {
    quadrant_1: '<li>quadrant 1</li>',
    quadrant_2: '<p data-testid="test"></p>',
    quadrant_3: '',
    quadrant_4: '<li>quadrant 4</li>',
};
// test content, input

function getBoundingClientRect() {
    const rec = {
        x: 0,
        y: 0,
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
    }
    return { ...rec, toJSON: () => rec }
}

class FakeDOMRectList extends DOMRect {
    item(index) {
        return this[index]
    }
}

document.elementFromPoint = () => null
HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect
HTMLElement.prototype.getClientRects = () => new FakeDOMRectList()
Range.prototype.getBoundingClientRect = getBoundingClientRect
Range.prototype.getClientRects = () => new FakeDOMRectList()


describe('test text editor content and user interaction', () => {
    it('test initial content', async () => {
        render(<TextEditor id={1} currentContent={content} setCurrentContent={setContentMock} />);

        expect(screen.getByText('quadrant 1')).toBeInTheDocument();
    });

    it('test user input', async () => {
        const { container } = render(<TextEditor id={2} currentContent={content} setCurrentContent={setContentMock} />);

        const user = userEvent.setup()

        // const test_editor = screen.getByTestId('2');
        
        // find element
        const editor = await vi.waitFor(() =>
            container.querySelector('.ProseMirror').querySelector('p')
        )
        
        await user.type(editor, 'New content');

        expect(screen.getByText('New content')).toBeInTheDocument();

        expect(editor).toMatchInlineSnapshot(`
             <p>
               New content
             </p>
        `)
    });

});