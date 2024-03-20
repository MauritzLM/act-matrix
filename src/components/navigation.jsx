import PropTypes from 'prop-types'

export default function Nav({ location }) {
    
    // render different nav for dashboard*

    return (
        <>
            <nav id="nav">
                <ul>
                    <li><a className={location === '/' ? 'cs-active' : ''} href='/'>Home</a></li>
                    <li><a className={location === '/signup' ? 'cs-active' : ''} href='/signup'>Signup</a></li>
                    <li><a className={location === '/login' ? 'cs-active' : ''} href='/login'>Login</a></li>
                    <li><a className={location === '/act-matrix' ? 'cs-active' : ''} href='/act-matrix'>Matrix</a></li>
                </ul>
            </nav>
        </>
    )
}

Nav.propTypes = {
    location: PropTypes.string,
};