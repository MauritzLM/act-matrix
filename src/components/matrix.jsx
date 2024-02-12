import Quadrant from "./quadrant";
import '../assets/css/matrix.css'

export default function Matrix() {
    return (
        <>
        <div id="matrix">
            {/* top */}
            <div className="top">
                <Quadrant title={'Actions that move us away'} id={1}/>
                <div className="arrow-up"></div>
                <Quadrant title={'Committed actions'} id={2}/>
            </div>

            {/* arrow pointing left and right */}
            <div className="middle">
                <div className="arrow-left"></div>
                <div className="circle"><span>Me noticing</span></div>
                <div className="arrow-right"></div>
            </div>

            {/* bottom */}
            <div className="bottom">
                <Quadrant title={'What gets in the way?'} id={3}/>
                <div className="arrow-down"></div>
                <Quadrant title={'What / Who is important?'} id={4}/>
            </div>
        </div>
        </>

    )
}