import { Link } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';


export default function Footer() {
    const { isAuthenticated } = useAuth0()
    return (
        <>
            <footer>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/act-matrix">Matrix</Link></li>
                    {isAuthenticated && (<li><Link to='/dashboard'>Dashboard</Link></li>)}
                    <li><Link to="https://github.com/MauritzLM/act-matrix">Github</Link></li>
                </ul>
            </footer>
        </>
    )
}