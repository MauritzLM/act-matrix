import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import LoginButton from './login';
import LogoutButton from './logout';


export default function Nav({ location, theme, switchTheme }) {
    const { isAuthenticated } = useAuth0();

    return (
        <>
            <nav id="nav">
                <ul>
                    <li><Link className={location === '/' ? 'cs-active' : ''} to='/'>Home</Link></li>
                    <li><Link className={location === '/act-matrix' ? 'cs-active' : ''} to='/act-matrix'>Matrix</Link></li>
                    {isAuthenticated && (<li><Link className={location === '/dashboard' ? 'cs-active' : ''} to='/dashboard'>Dashboard</Link></li>)}
                </ul>

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
            </nav>
        </>
    )
}

Nav.propTypes = {
    location: PropTypes.string,
    switchTheme: PropTypes.func,
    theme: PropTypes.string
};