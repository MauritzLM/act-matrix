import PropTypes from 'prop-types'
import closeIcon from '../assets/svgs/close.svg'

export default function UpdateForm({ updateObj, setUpdate, updateFunction }) {

    return (
        <div id="update-form">

            <h2>{updateObj.title}</h2>

            <button data-testid="close" className='close-btn' onClick={() => setUpdate({ ...updateObj, type: '', errorMsg: '' })}>
                <img alt='' src={closeIcon}></img>
            </button>

            <form data-testid="form" onSubmit={(e) => updateFunction(e)}>

                <div>
                    <label htmlFor="title">{updateObj.label}</label>
                    <input type="text" name="title" id="title"></input>
                    <span data-testid="error">{updateObj.errorMsg}</span>
                </div>

                {/* delete warning */}
                {updateObj.type === 'delete' && (
                    <p data-testid="delete">Are you sure you want to delete {updateObj.name}?</p>
                )}

                <button data-testid="submit">submit</button>
            </form>

        </div>
    )
}

UpdateForm.propTypes = {
    updateObj: PropTypes.object,
    setUpdate: PropTypes.func,
    updateFunction: PropTypes.func
}