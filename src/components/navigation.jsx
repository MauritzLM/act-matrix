import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login';
import LogoutButton from './logout';


export default function Nav({ location }) {
    const { isAuthenticated } = useAuth0();

    return (
        <>
            <nav id="nav">
                <ul>
                    <li><a className={location === '/' ? 'cs-active' : ''} href='/'>Home</a></li>
                    <li><a className={location === '/act-matrix' ? 'cs-active' : ''} href='/act-matrix'>Matrix</a></li>
                    {isAuthenticated && (<li><a className={location === '/dashboard' ? 'cs-active' : ''} href='/dashboard'>Dashboard</a></li>)}
                </ul>

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
};