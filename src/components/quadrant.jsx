// quadrant component
import PropTypes from 'prop-types'
import TextEditor from './editor';

export function Quadrant({ title, id }) {

    return (
        <>
            <div className="quadrant">
                <label>{title}</label>
                {/* <textarea id="quadrant-1" name="quadrant-1"></textarea>  */}
                <div className='container'>
                    <TextEditor id={id} />
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