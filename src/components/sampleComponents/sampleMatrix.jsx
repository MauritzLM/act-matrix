import SampleQuadrant from './sampleQuadrant'
import '../../assets/sass/matrix.scss'
import { HashLink } from 'react-router-hash-link'
import { useState } from 'react'
import MatrixPreview from '../matrixPreview'

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
                </div>

                <button data-testid="preview-btn-desktop" className="preview-btn-desktop" onClick={() => setPreview(true)}>preview</button>

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