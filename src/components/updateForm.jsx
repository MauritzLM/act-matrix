import PropTypes from 'prop-types'

export default function UpdateForm({ updateObj, setUpdate, updateFunction }) {

    return (
        <div id="update-form">

            <button data-testid="close" className='close-btn' onClick={() => setUpdate({ ...updateObj, type: '', errorMsg: '' })}>
                <img alt='' src='./src/assets/svgs/close.svg'></img>
            </button>

            <form data-testid="form" onSubmit={(e) => updateFunction(e)}>
                <label htmlFor="title">{updateObj.type}</label>
                <input type="text" name="title" id="title"></input>
                <span data-testid="error">{updateObj.errorMsg}</span>
                
                {/* delete warning */}
                {updateObj.type === 'delete' && (
                    <p data-testid="delete">Are you sure you want to delete {updateObj.title}?</p>
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