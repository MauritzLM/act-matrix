// quadrant component
import PropTypes from 'prop-types';
import SampleTextEditor from './sampleEditor';

export default function SampleQuadrant({ title, id }) {
    let placeholder;

    switch (id) {
        case 1:
            placeholder = "How am I responding/reacting to my inner experience?";
            break;
        case 2:
            placeholder = "What can I do to move toward what matters?";
            break;

        case 3:
            placeholder = "What inner experience is showing up for me?";
            break;

        case 4:
            placeholder = "What matters to me?";
            break;
    }

    return (
            <div className="quadrant">
                <label id={`q${id}`}>{title}</label>
                <div className="quadrant-container">
                    <SampleTextEditor id={id} placeholder={placeholder} />
                </div>
            </div>
    )
}

SampleQuadrant.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number
};

SampleQuadrant.defaultProps = {
    title: 'Quadrant',
};