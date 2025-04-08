import SampleQuadrant from './sampleQuadrant'
import '../../assets/sass/matrix.scss'
import { HashLink } from 'react-router-hash-link'
import { useState } from 'react'
import MatrixPreview from '../matrixPreview'
import { convertHtml } from '../../helpers/text'

export default function SampleMatrix() {
    // preview state
    const [preview, setPreview] = useState(false)

    // current content state
    // current matrix (all quadrants) state
    const [currentContent, setCurrentContent] = useState({
        quadrant_1: window.localStorage.getItem(1) || "<h4>How am I responding/reacting to my inner experience?</h4>",
        quadrant_2: window.localStorage.getItem(2) || "<h4>What can I do to move toward what matters?</h4>",
        quadrant_3: window.localStorage.getItem(3) || "<h4>What inner experience is showing up for me?</h4>",
        quadrant_4: window.localStorage.getItem(4) || "<h4>What matters to me?</h4>"
    })

    // download handler 
    async function downloadText() {

        // convert html string
        const text = convertHtml([`<h2>1. Actions that move us away</h2>${currentContent.quadrant_1}<hr />`, `<h2>2. Committed Actions</h2>${currentContent.quadrant_2}<hr />`,
        `<h2>3. What gets in the way</h2>${currentContent.quadrant_3}<hr />`, `<h2>4. What / Who is important</h2>${currentContent.quadrant_4}<hr />`])

        const blob = new Blob([...text], { type: 'text/plain' });

        // Create an object URL for the blob object
        const url = URL.createObjectURL(blob);

        // Create the a element and append it invisibly
        const a = document.createElement('a')

        a.href = url
        a.download = 'matrix.txt'
        a.style.display = 'none';
        document.body.append(a);
        a.click()

        // Revoke the blob URL and remove the element.
        setTimeout(() => {
            URL.revokeObjectURL(url);
            a.remove();
        }, 1000);
    }

    // if preview state return preview component
    if (preview) {
        return (
            <>
                <div className="matrix-container">
                    <button data-testid="back-btn" className="back-btn" onClick={() => setPreview(false)}>Editor</button>
                    <MatrixPreview currentContent={currentContent} />
                </div>
            </>
        )
    }


    return (
        <div className='container'>
            
            <div id="top" className='matrix-container'>
                <div id="quadrant-skip">
                    <h3>Where would you like to start?</h3>
                    <div>
                        <HashLink smooth to="#q1">Actions that move us away</HashLink>
                        <HashLink smooth to="#q2">Committed Actions</HashLink>
                        <HashLink smooth to="#q3">What gets in the way?</HashLink>
                        <HashLink smooth to="#q4">What / Who is important?</HashLink>
                    </div>

                    {/* show preview */}
                    <button data-testid="preview-btn" className="preview-btn" onClick={() => setPreview(true)}>preview</button>

                    <button className='download-btn' onClick={() => downloadText()}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>save text file</span>
                    </button>
                </div>

                <button data-testid="preview-btn-desktop" className="preview-btn-desktop" onClick={() => setPreview(true)}>preview</button>

                <button className='download-btn-desktop' onClick={() => downloadText()}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>save text file</span>
                </button>

                <section>

                    <h3 className='matrix-heading'>FIVE SENSES AWARENESS</h3>

                    <div id="matrix">
                        {/* top */}
                        <div className="top">
                            <SampleQuadrant title={'Actions that move us away'} id={1} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                            <div className="arrow-up"></div>
                            <SampleQuadrant title={'Committed actions'} id={2} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                        </div>

                        {/* arrow pointing left and right */}
                        <div className="middle">
                            <div className="arrow-left">
                                <span className='left'>AWAY</span>
                                <div></div>
                            </div>

                            <div className="circle"><span>Me noticing (awareness)</span></div>

                            <div className="arrow-right">
                                <span className='right'>TOWARD</span>
                                <div></div>
                            </div>
                        </div>

                        {/* bottom */}
                        <div className="bottom">
                            <SampleQuadrant title={'What gets in the way?'} id={3} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                            <div className="arrow-down"></div>
                            <SampleQuadrant title={'What / Who is important?'} id={4} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                        </div>
                    </div>

                    <h3 className='matrix-heading'>INNER EXPERIENCE</h3>

                </section>

                <HashLink className="scroll-top" smooth to="#top">back to top</HashLink>

            </div>
        </div>
    )
}