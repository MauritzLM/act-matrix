import parse from 'html-react-parser'
import PropTypes from 'prop-types'

export default function MatrixPreview({ currentContent }) {

  return (
    <>
      <div id="matrix-preview">
        <span className="label">Five senses experience</span>
        <div className="quadrant-1">
          <h3 className="heading">Actions that move us away</h3>
          {parse(currentContent.quadrant_1)}
          <span className="label">away</span>

          {/* middle circle */}
          <div className="awareness">
            <span>Me noticing</span>
          </div>
        </div>

        <div className="quadrant-2">
          <h3 className="heading">Committed actions</h3>
          {parse(currentContent.quadrant_2)}
          <span className="label">Toward</span>
        </div>

        <div className="quadrant-3">
          <h3 className="heading">What gets in the way</h3>
          {parse(currentContent.quadrant_3)}
        </div>

        <div className="quadrant-4">
          <h3 className="heading">What / who is important</h3>
          {parse(currentContent.quadrant_4)}
        </div>
        <span className="label">Inner experience</span>
      </div>
    </>
  )
}

MatrixPreview.propTypes = {
  currentContent: PropTypes.object,
};