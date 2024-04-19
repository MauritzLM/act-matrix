import Quadrant from "./quadrant";
import '../assets/sass/matrix.scss';
import { useContext } from "react";
import { userContext } from "../context/usercontext";

// sample content
const quadrantContent = {
    1: '<h3>How am I responding/reacting to my inner experience?</h3>',
    2: '<h3>What can I do to move toward what matters?</h3>',
    3: '<h3>What inner experience is showing up for me?</h3>',
    4: '<h3>What matters to me?</h3>'
};

export default function Matrix() {
    const userInfo = useContext(userContext);

    // conditional rendering when no matrix selected
    if (!Object.keys(userInfo.selectedMatrix).length) {
        return (
            <>
                <div className="matrix-container">
                    <h2>Select a matrix or create a new one</h2>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="matrix-container">

                <h2 className="title">{userInfo.selectedMatrix.title}</h2>

                <h3 className="matrix-heading">Five senses awareness</h3>

                <div id="matrix">
                    {/* top */}
                    <div className="top">
                        <Quadrant title={'Actions that move us away'} id={1} content={!userInfo.selectedMatrix.quadrant_1 ? quadrantContent[1] : userInfo.selectedMatrix.quadrant_1} />
                        <div className="arrow-up"></div>
                        <Quadrant title={'Committed Actions'} id={2} content={!userInfo.selectedMatrix.quadrant_2 ? quadrantContent[2] : userInfo.selectedMatrix.quadrant_2} />
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
                        <Quadrant title={'What gets in the way?'} id={3} content={!userInfo.selectedMatrix.quadrant_3 ? quadrantContent[3] : userInfo.selectedMatrix.quadrant_3} />
                        <div className="arrow-down"></div>
                        <Quadrant title={'What / Who is important?'} id={4} content={!userInfo.selectedMatrix.quadrant_4 ? quadrantContent[4] : userInfo.selectedMatrix.quadrant_4} />
                    </div>
                </div>

                <h3 className="matrix-heading">Inner experience</h3>
            </div>
        </>
    )
}