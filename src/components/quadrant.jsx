// quadrant component
import PropTypes from 'prop-types';
import TextEditor from './editor';

export function Quadrant({ title }) {
    return (
        <>
            <div className="quadrant">
                <label htmlFor="quadrant-1">{title}</label>
                {/* <textarea id="quadrant-1" name="quadrant-1"></textarea>  */}
                <TextEditor />

            </div>
        </>
    )
}

Quadrant.propTypes = {
    title: PropTypes.string,
};

Quadrant.defaultProps = {
    title: 'Quadrant',
};