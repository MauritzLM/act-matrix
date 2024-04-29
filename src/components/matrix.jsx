import Quadrant from "./quadrant";
import '../assets/sass/matrix.scss';
import { useContext } from "react";
import { userContext } from "../context/usercontext";
import { HashLink } from "react-router-hash-link";

// sample content
const quadrantContent = {
    1: '<h4>How am I responding/reacting to my inner experience?</h4>',
    2: '<h4>What can I do to move toward what matters?</h4>',
    3: '<h4>What inner experience is showing up for me?</h4>',
    4: '<h4>What matters to me?</h4>'
};

export default function Matrix() {
    const userInfo = useContext(userContext);

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
                </div>

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

                {/* scroll to top */}
                <HashLink className="scroll-top" smooth to="#top">back to top</HashLink>

            </div>
        </>
    )
}