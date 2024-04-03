import Quadrant from "./quadrant";
import '../assets/sass/matrix.scss';
import { useContext } from "react";
import { userContext } from "../context/usercontext";

export default function Matrix() {
    const userInfo = useContext(userContext);

    // conditional rendering when no matrix selected
    if (!Object.keys(userInfo.selectedMatrix).length) {
        return (
            <>
                <h2>Select a matrix</h2>
            </>
        )
    }

    return (
        <>
            <div className="matrix-container">

                <h2 className="title">{userInfo.selectedMatrix.title}</h2>

                <div id="matrix">
                    {/* top */}
                    <div className="top">
                        <Quadrant title={'Actions that move us away'} id={1} content={userInfo.selectedMatrix.quadrant_1}/>
                        <div className="arrow-up"></div>
                        <Quadrant title={'Committed Actions'} id={2} content={userInfo.selectedMatrix.quadrant_2}/>
                    </div>

                    {/* arrow pointing left and right */}
                    <div className="middle">
                        <div className="arrow-left"></div>
                        <div className="circle"><span>Me noticing</span></div>
                        <div className="arrow-right"></div>
                    </div>

                    {/* bottom */}
                    <div className="bottom">
                        <Quadrant title={'What gets in the way?'} id={3} content={userInfo.selectedMatrix.quadrant_3}/>
                        <div className="arrow-down"></div>
                        <Quadrant title={'What / Who is important?'} id={4} content={userInfo.selectedMatrix.quadrant_4}/>
                    </div>
                </div>
            </div>
        </>
    )
}