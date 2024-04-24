// quadrant component
import PropTypes from 'prop-types'
import TextEditor from './editor';
import { useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { userContext } from '../context/usercontext';

export default function Quadrant({ title, id, content }) {
    const userInfo = useContext(userContext);
    const { getAccessTokenSilently } = useAuth0();
    const [editorContent, setEditorContent] = useState(content);
    const [savedText, setSavedText] = useState('save');

    // function to save quadrant content in db
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
                body: JSON.stringify({ instance_id: userInfo.selectedMatrix.instance_id, quadrant_content: editorContent, quadrant_number: id })
            });

            const message = await response.json();
            
            setSavedText('saved');


            console.log(message);

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
                <label>{title}</label>
                <div className="quadrant-container">
                    <TextEditor editorContent={editorContent} setEditorContent={setEditorContent} initialContent={content} />
                    <button data-testid="save" className='cs-button' onClick={handleSave}>{savedText}</button>
                </div>

            </div>
        </>
    )
}

Quadrant.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    content: PropTypes.string
};