import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import LoginButton from './login';
import LogoutButton from './logout';
import { useEffect, useState } from 'react';


export default function Nav({ location, theme, switchTheme }) {
    const { isAuthenticated } = useAuth0();
    const [active, setActive] = useState('');

    function toggleActive() {
        setActive(active === '' ? 'cs-active' : '')
    }

    // remove active class on mobile menu when navigating to new page
    useEffect(() => {
        setActive('');
    }, [location])

    return (
        <>
            <nav id="nav" className={active}>

                {/* <!--Mobile Nav Toggle--> */}
                <button onClick={toggleActive} className={`cs-toggle ${active}`} aria-label="mobile menu toggle">
                    <div className="cs-box" aria-hidden="true">
                        <span className="cs-line cs-line1" aria-hidden="true"></span>
                        <span className="cs-line cs-line2" aria-hidden="true"></span>
                        <span className="cs-line cs-line3" aria-hidden="true"></span>
                    </div>
                </button>

                <div className={`ul-wrapper ${active}`}>
                    <ul>
                        <li><Link className={location === '/' ? 'cs-active' : ''} to='/'>Home</Link></li>
                        <li><Link className={location === '/act-matrix' ? 'cs-active' : ''} to='/act-matrix'>Matrix</Link></li>
                        {isAuthenticated && (<li><Link className={location === '/dashboard' ? 'cs-active' : ''} to='/dashboard'>Dashboard</Link></li>)}
                    </ul>
                </div>


                <div className='theme-login-wrapper'>
                    {/* theme toggle */}
                    <button onClick={switchTheme} className='theme-toggle'>
                        <img src={theme === 'light' ? './src/assets/svgs/dark_mode.svg' : './src/assets/svgs/light_mode.svg'}></img>
                    </button>

                    {!isAuthenticated && (
                        <LoginButton />
                    )}

                    {isAuthenticated && (

                        <LogoutButton />
                    )}
                </div>
            </nav>
        </>
    )
}

Nav.propTypes = {
    location: PropTypes.string,
    switchTheme: PropTypes.func,
    theme: PropTypes.string
};