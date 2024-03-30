// quadrant component
import PropTypes from 'prop-types'
import TextEditor from './editor';
import { useContext, useState } from 'react';
import { userContext } from '../context/usercontext';

export default function Quadrant({ title, id }) {
    const userInfo = useContext(userContext);
    const [editorContent, setEditorContent] = useState(userInfo.selectedMatrix[`quadrant_${id}`]);
   
    return (
        <>
            <div className="quadrant">
                <label>{title}</label>
                <div className="quadrant-container">
                    <TextEditor id={id} editorContent={editorContent} setEditorContent={setEditorContent} />
                </div>

            </div>
        </>
    )
}

Quadrant.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number
};