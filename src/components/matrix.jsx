import Quadrant from "./quadrant";
import '../assets/sass/matrix.scss';
import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/usercontext";
import { HashLink } from "react-router-hash-link";
import MatrixPreview from "./matrixPreview";

// sample content
const quadrantContent = {
    1: '<h4>How am I responding / reacting to my inner experience?</h4>',
    2: '<h4>What can I do to move toward what matters?</h4>',
    3: '<h4>What inner experience is showing up for me?</h4>',
    4: '<h4>What matters to me?</h4>'
};

export default function Matrix() {
    const userInfo = useContext(userContext);

    // current matrix (all quadrants) state
    const [currentContent, setCurrentContent] = useState({
        quadrant_1: !userInfo.selectedMatrix.quadrant_1 ? quadrantContent[1] : userInfo.selectedMatrix.quadrant_1,
        quadrant_2: !userInfo.selectedMatrix.quadrant_2 ? quadrantContent[2] : userInfo.selectedMatrix.quadrant_2,
        quadrant_3: !userInfo.selectedMatrix.quadrant_3 ? quadrantContent[3] : userInfo.selectedMatrix.quadrant_3,
        quadrant_4: !userInfo.selectedMatrix.quadrant_4 ? quadrantContent[4] : userInfo.selectedMatrix.quadrant_4
    })

    // show preview state
    const [preview, setPreview] = useState(false)

    // update state when selected matrix changes
    useEffect(() => {
        setCurrentContent({
            quadrant_1: !userInfo.selectedMatrix.quadrant_1 ? quadrantContent[1] : userInfo.selectedMatrix.quadrant_1,
            quadrant_2: !userInfo.selectedMatrix.quadrant_2 ? quadrantContent[2] : userInfo.selectedMatrix.quadrant_2,
            quadrant_3: !userInfo.selectedMatrix.quadrant_3 ? quadrantContent[3] : userInfo.selectedMatrix.quadrant_3,
            quadrant_4: !userInfo.selectedMatrix.quadrant_4 ? quadrantContent[4] : userInfo.selectedMatrix.quadrant_4
        })
    }, [userInfo.selectedMatrix])

    // conditional rendering when no matrix selected
    if (!Object.keys(userInfo.selectedMatrix).length) {
        return (
            <>
                <div className="matrix-container">
                    <h2>Select a matrix</h2>
                </div>
            </>
        )
    }

    // if preview state return preview component
    if (preview) {
        return (
            <>
                <div className="matrix-container">
                    <button className="back-btn" onClick={() => setPreview(false)}>Editor</button>
                    <h2 className="preview-title">{userInfo.selectedMatrix.title}</h2>
                    <MatrixPreview currentContent={currentContent} />
                </div>
            </>
        )
    }

    return (
        <>
            <div id="top" className="matrix-container">

                <h2 className="title">{userInfo.selectedMatrix.title}</h2>

                {/* skip to quadrant links */}
                <div id="quadrant-skip">
                    <h3>Where would you like to start?</h3>
                    <div>
                        <HashLink smooth to="#q1">Actions that move us away</HashLink>
                        <HashLink smooth to="#q2">Committed Actions</HashLink>
                        <HashLink smooth to="#q3">What gets in the way?</HashLink>
                        <HashLink smooth to="#q4">What / Who is important?</HashLink>
                    </div>

                    {/* show preview */}
                    <button className="preview-btn" onClick={() => setPreview(true)}>preview</button>
                </div>

                <h3 className="matrix-heading">Five senses awareness</h3>

                <div id="matrix">
                    {/* top */}
                    <div className="top">
                        <Quadrant title={'Actions that move us away'} id={1} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                        <div className="arrow-up"></div>
                        <Quadrant title={'Committed Actions'} id={2} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                    </div>

                    {/* arrow pointing left and right */}
                    <div className="middle">
                        <div className="arrow-left">
                            <span className='left'>Away</span>
                            <div></div>
                        </div>
                        <div className="circle"><span>Me noticing (awareness)</span></div>
                        <div className="arrow-right">
                            <span className='right'>Toward</span>
                            <div></div>
                        </div>
                    </div>

                    {/* bottom */}
                    <div className="bottom">
                        <Quadrant title={'What gets in the way?'} id={3} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                        <div className="arrow-down"></div>
                        <Quadrant title={'What / Who is important?'} id={4} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                    </div>
                </div>

                <h3 className="matrix-heading">Inner experience</h3>

                {/* scroll to top */}
                <HashLink className="scroll-top" smooth to="#top">back to top</HashLink>

            </div>
        </>
    )
}