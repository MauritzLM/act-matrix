// quadrant component
import PropTypes from 'prop-types'
import TextEditor from './editor';

export default function Quadrant({ title, id }) {
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
        <>
            <div className="quadrant">
                <label>{title}</label>
                {/* <textarea id="quadrant-1" name="quadrant-1"></textarea>  */}
                <div className="container">
                    <TextEditor id={id} placeholder={placeholder} />
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