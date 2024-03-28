// quadrant component
import PropTypes from 'prop-types'
import TextEditor from './editor';
import { useContext, useState } from 'react';
import { userContext } from '../context/usercontext';

export default function Quadrant({ title, id }) {
    // const [placeholder, setPlaceholder] = useState('');
    const userInfo = useContext(userContext);

    return (
        <>
            <div className="quadrant">
                <label>{title}</label>
                <div className="quadrant-container">
                    <TextEditor id={id} content={userInfo.selectedMatrix[`quadrant_${id}`]} />
                </div>

            </div>
        </>
    )
}

Quadrant.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number
};

Quadrant.defaultProps = {
    title: 'Quadrant',
};