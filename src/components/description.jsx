import { useState } from "react"
import { Link } from "react-router-dom"

export default function Description() {
    const [activeAnswer, setActiveAnswer] = useState(1)
    // add youtube videos iframe*

    // event handler to toggle answer visibility*
    function answerToggle(num) {
        setActiveAnswer(num)
    }

    return (
        <div className="description-text">

            <div className="section-wrapper">
                <section>
                    <h1>ACT Matrix Online Tool</h1>
                    <p>The Act Matrix is a tool designed to help increase awareness, promote acceptance, and guide actions aligned with personal values.</p>
                    <p>You can use this tool to create and save your own matrix.</p>
                    <div className="home-button-group">
                        <Link className="home-button" to='https://en.wikipedia.org/wiki/Acceptance_and_commitment_therapy' target="_blank">
                            <span>Wikipedia</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                        </Link>
                        <Link className="home-button" to='/act-matrix'>Get started</Link>
                    </div>

                </section>
                <section>
                    <h2>How to use this site</h2>

                    <div className="faq">
                        <ul>
                            <li className={activeAnswer === 1 ? 'active' : ''} onClick={() => answerToggle(1)}>
                                <span className="topic">Using the editor</span>
                                <div className="icon">
                                    <span className="line line1"></span>
                                    <span className="line line2"></span>
                                </div>
                                <span className="text">The matrix tool consists of four text editors each of them saves individually. The default matrix saves the content in your browser storage.</span>
                            </li>
                            <li className={activeAnswer === 2 ? 'active' : ''} onClick={() => answerToggle(2)}>
                                <span className="topic">Account</span>
                                <div className="icon">
                                    <span className="line line1"></span>
                                    <span className="line line2"></span>
                                </div>
                                <span className="text">You can create an account by clicking on the login button (top right) and choosing the sign up option. Once you are logged in you can access the dashboard page.</span>
                            </li>
                            <li className={activeAnswer === 3 ? 'active' : ''} onClick={() => answerToggle(3)}>
                                <span className="topic">Dashboard</span>
                                <div className="icon">
                                    <span className="line line1"></span>
                                    <span className="line line2"></span>
                                </div>
                                <span className="text">The dashboard page is where you can create and manage up to three matrices. Remember to save your work!</span>

                            </li>
                        </ul>

                    </div>
                </section>
                <section>
                    <h2>Using the matrix</h2>

                    <p>Below are links to some examples using the ACT Matrix. (links will open in a new tab)</p>

                    <ol className="links">
                        <li>
                            <Link to='https://www.youtube.com/watch?v=cCCSpOtDPV0' target="_blank">Video exercise</Link>
                        </li>
                        <li>
                            <Link to='https://www.du.edu/sport-sense/news/unleashing-power-act-matrix-helpful-tool-coaches-nurture-athletes-mindset-build-psychological-flexibility-and-increase-resilience' target="_blank">College athlete example</Link>
                        </li>
                        <li>
                            <Link to='https://masteraba.com/how-to-use-the-act-matrix-to-reach-your-goals/' target="_blank">Behaviour analyst example</Link>
                        </li>
                    </ol>
                </section>
            </div>

        </div>
    )
}