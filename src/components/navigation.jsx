import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import LoginButton from './login';
import LogoutButton from './logout';
import { useEffect, useState } from 'react';
import darkmode from '../assets/svgs/dark_mode.svg';
import lightmode from '../assets/svgs/light_mode.svg';


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
                        <li><Link data-testid="navlink" className={location === '/' ? 'cs-active' : ''} to='/'>Home</Link></li>
                        <li><Link data-testid="navlink" className={location === '/act-matrix' ? 'cs-active' : ''} to='/act-matrix'>Matrix</Link></li>
                        {isAuthenticated && (<li><Link data-testid="navlink" className={location === '/dashboard' ? 'cs-active' : ''} to='/dashboard'>Dashboard</Link></li>)}
                    </ul>
                </div>


                <div className='theme-login-wrapper'>
                    {/* theme toggle */}
                    <button data-testid="theme-toggle" onClick={switchTheme} className='theme-toggle' title={theme === 'light' ? 'switch to dark theme' : 'switch to light theme'}>
                        <img src={theme === 'light' ? darkmode : lightmode} alt="theme-toggle"></img>
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