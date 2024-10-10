import { Link } from "react-router-dom"

export default function Description() {
    return (
        <div className="description-text">
            <h1>ACT Matrix Online Tool</h1>
            <div className="section-wrapper">
                <section>
                    <h2>What is the ACT Matrix</h2>
                    <p>The Act Matrix is a tool designed to help increase awareness, promote acceptance, and guide actions aligned with personal values</p>
                    <Link to='https://en.wikipedia.org/wiki/Acceptance_and_commitment_therapy' target="_blank">Act wikipedia page (opens in new tab)</Link>
                </section>
                <section>
                    <h2>How to use this site</h2>

                    <p>You can create an account by clicking on the login button (top right) and choosing the sign up option.</p>
                    <p>Once you are signed up and logged in you can access the dashboard where you can create and manage up to three matrices and use them as you like. Remember to save your work!</p>

                    <p>Or</p>

                    <p>You can use the  <Link to='/act-matrix'>sample matrix</Link> which uses browser strorage so the content would be erased if you clear your browser history.</p>
                </section>
                <section>
                    <h2>Using the matrix</h2>

                    <p>Below are links to various examples in using the ACT Matrix. (links will open in a new tab)</p>

                    <div className="links">
                        <Link to='https://www.youtube.com/watch?v=cCCSpOtDPV0' target="_blank">Video exercise</Link>
                        <Link to='https://www.du.edu/sport-sense/news/unleashing-power-act-matrix-helpful-tool-coaches-nurture-athletes-mindset-build-psychological-flexibility-and-increase-resilience' target="_blank">College athlete example</Link>
                        <Link to='https://masteraba.com/how-to-use-the-act-matrix-to-reach-your-goals/' target="_blank">Behaviour analyst example</Link>
                    </div>
                </section>
            </div>

        </div>
    )
}