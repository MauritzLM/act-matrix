import { Quadrant } from "./quadrant";
import '../assets/css/matrix.css'

export function Matrix() {
    return (
        <>
        <div id="matrix">
            {/* top */}
            <div className="top">
                <Quadrant title={'Actions that moves us away'} />
                <div className="arrow-up"></div>
                <Quadrant title={'Committed actions'} />
            </div>

            {/* arrow pointing left and right */}
            <div className="middle">
                <div className="arrow-left"></div>
                <div className="circle">Me noticing</div>
                <div className="arrow-right"></div>
            </div>

            {/* bottom */}
            <div className="bottom">
                <Quadrant title={'What gets in the way?'} />
                <div className="arrow-down"></div>
                <Quadrant title={'What/Who is important?'} />
            </div>
        </div>
        </>

    )
}