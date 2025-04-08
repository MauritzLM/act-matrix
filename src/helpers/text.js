import { compile } from "html-to-text";

// options
const options = {
    selectors: [
        { selector: 'h2', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: false } },
        { selector: 'h3', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: false } },
        { selector: 'h4', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: false } },
        // { selector: 'table', format: 'dataTable' }
    ],
}

const compiledConvert = compile(options)

export function convertHtml(arr) {
    const texts = arr.map(compiledConvert)

    return texts.join('\n\n')
}