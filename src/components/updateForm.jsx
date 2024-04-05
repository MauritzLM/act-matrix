import PropTypes from 'prop-types'

export default function UpdateForm({ updateObj, setUpdate, updateFunction }) {

    return (
        <div id="update-form">
            <button onClick={() => setUpdate({ ...updateObj, type: '', errorMsg: '' })}>Close</button>
            <form onSubmit={(e) => updateFunction(e)}>
                <label htmlFor="title">{updateObj.type}</label>
                <input type="text" name="title" id="title"></input>
                <span>{updateObj.errorMsg}</span>
                <button>submit</button>
            </form>
        </div>
    )
}

UpdateForm.propTypes = {
    updateObj: PropTypes.object,
    setUpdate: PropTypes.func,
    updateFunction: PropTypes.func
}