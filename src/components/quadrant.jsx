// quadrant component
import PropTypes from 'prop-types';
import TextEditor from './editor';
import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { userContext } from '../context/usercontext';

export default function Quadrant({ title, id, currentContent, setCurrentContent }) {
    const userInfo = useContext(userContext);
    const { getAccessTokenSilently } = useAuth0();
    const [savedText, setSavedText] = useState('save');

    // function to save quadrant content in db and update context
    async function handleSave() {

        const domain = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {
            // get access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: domain,
                    scope: "read:current_user",
                },
            })

            // post request to update route containing instance_id, content, quadrant number
            const response = await fetch('https://actmatrixserver-production.up.railway.app/update-matrix', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ instance_id: userInfo.selectedMatrix.instance_id, quadrant_content: currentContent[`quadrant_${id}`], quadrant_number: id })
            });

            // eslint-disable-next-line no-unused-vars
            const message = await response.json();

            // update matrix in context
            userInfo.updateUserMatrices(userInfo.selectedMatrix.instance_id, `quadrant_${id}`, currentContent[`quadrant_${id}`])

            setSavedText('saved');

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // after 3 seconds set saved text to save
        setTimeout(() => setSavedText('save'), 3000)

    }, [savedText])

    return (
        <>
            <div className="quadrant">
                <label id={`q${id}`}>{title}</label>
                <div className="quadrant-container">
                    <TextEditor id={id} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                    <button data-testid="save" className='cs-button' onClick={handleSave}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" /></svg>
                        {savedText}
                    </button>
                </div>

            </div>
        </>
    )
}

Quadrant.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    currentContent: PropTypes.object,
    setCurrentContent: PropTypes.func
};