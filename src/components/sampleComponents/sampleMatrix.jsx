import SampleQuadrant from './sampleQuadrant'
import '../../assets/sass/matrix.scss'

export default function SampleMatrix() {
    return (
        <div id="matrix">
            {/* top */}
            <div className="top">
                <SampleQuadrant title={'Actions that move us away'} id={1}/>
                <div className="arrow-up"></div>
                <SampleQuadrant title={'Committed actions'} id={2}/>
            </div>

            {/* arrow pointing left and right */}
            <div className="middle">
                <div className="arrow-left"></div>
                <div className="circle"><span>Me noticing</span></div>
                <div className="arrow-right"></div>
            </div>

            {/* bottom */}
            <div className="bottom">
                <SampleQuadrant title={'What gets in the way?'} id={3}/>
                <div className="arrow-down"></div>
                <SampleQuadrant title={'What / Who is important?'} id={4}/>
            </div>
        </div>
    )
}