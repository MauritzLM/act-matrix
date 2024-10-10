import SampleQuadrant from './sampleQuadrant'
import '../../assets/sass/matrix.scss'
import { HashLink } from 'react-router-hash-link'

export default function SampleMatrix() {
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
                </div>

                <section>

                    <h3 className='matrix-heading'>FIVE SENSES AWARENESS</h3>

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
                            <SampleQuadrant title={'What gets in the way?'} id={3} />
                            <div className="arrow-down"></div>
                            <SampleQuadrant title={'What / Who is important?'} id={4} />
                        </div>
                    </div>

                    <h3 className='matrix-heading'>INNER EXPERIENCE</h3>

                </section>

                <HashLink className="scroll-top" smooth to="#top">back to top</HashLink>

            </div>
        </div>
    )
}