// quadrant component
import PropTypes from 'prop-types';
import SampleTextEditor from './sampleEditor';

export default function SampleQuadrant({ title, id, currentContent, setCurrentContent }) {
    
    return (
            <div className="quadrant">
                <label id={`q${id}`}>{title}</label>
                <div className="quadrant-container">
                    <SampleTextEditor id={id} currentContent={currentContent} setCurrentContent={setCurrentContent} />
                </div>
            </div>
    )
}

SampleQuadrant.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    currentContent: PropTypes.object,
    setCurrentContent: PropTypes.func
};

SampleQuadrant.defaultProps = {
    title: 'Quadrant',
};