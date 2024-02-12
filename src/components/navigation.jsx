import PropTypes from 'prop-types'

export default function Nav({ changePage, currentPage }) {
    // add on click toggle
    return (
        <>
            <nav id="nav">
                <button onClick={() => changePage("description")} className={(currentPage === 'description' ? 'cs-active' : '')}>description</button>
                <button onClick={() => changePage("matrix")} className={(currentPage === 'matrix' ? 'cs-active' : '')}>matrix</button>
            </nav>
        </>
    )
}

Nav.propTypes = {
    changePage: PropTypes.func,
    currentPage: PropTypes.string
};