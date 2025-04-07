import { compile } from "html-to-text";

// set options for headings -> not uppercase

// create table for content?

// options
const options = {
    selectors: [
        { selector: 'h2', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: false } },
        { selector: 'h3', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: false } },
        { selector: 'h4', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: false } },
    ]
}

const compiledConvert = compile(options)

export function convertHtml(arr) {
    const texts = arr.map(compiledConvert)

    // save as text file*

    return texts.join('\n\n')
}