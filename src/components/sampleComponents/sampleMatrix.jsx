import SampleQuadrant from './sampleQuadrant'
import '../../assets/sass/matrix.scss'

export default function SampleMatrix() {
    return (
        <div className='container'>
            <div className='matrix-container'>

                <h3 className='matrix-heading'>Five senses awareness</h3>

                <div id="matrix">
                    {/* top */}
                    <div className="top">
                        <SampleQuadrant title={'Actions that move us away'} id={1} />
                        <div className="arrow-up"></div>
                        <SampleQuadrant title={'Committed actions'} id={2} />
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
                        <SampleQuadrant title={'What gets in the way?'} id={3} />
                        <div className="arrow-down"></div>
                        <SampleQuadrant title={'What / Who is important?'} id={4} />
                    </div>
                </div>

                <h3 className='matrix-heading'>Inner experience</h3>

            </div>
        </div >
    )
}