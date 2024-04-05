import { useContext, useState } from "react";
import { userContext } from "../context/usercontext";
import { useAuth0 } from "@auth0/auth0-react";

function Userpanel() {
    const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
    const userInfo = useContext(userContext);

    const [createNew, setCreateNew] = useState({ status: false, errorMsg: '' });
    const [updateTitle, setUpdateTitle] = useState({ status: false, errorMsg: '' });
    const [deleteMatrix, setDeleteMatrix] = useState({ status: false, errorMsg: '' });


    // create new matrix function
    const createNewMatrix = async function (event) {

        const domain = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {
            event.preventDefault();

            // get title from input
            const formData = new FormData(event.target);
            const title = formData.get("title");

            // get access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: domain,
                    scope: "read:current_user",
                },
            });

            // request with title and user_id
            const createResponse = await fetch('http://localhost:3000/new-matrix', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, user_id: `${userInfo.user.sub.slice(6)}` })
            });

            const message = await createResponse.json();

            // validation errors
            if (message.errors) {
                setCreateNew({ ...createNew, errorMsg: message.errors[0].msg })
                console.log(message.errors[0].msg)
                return;
            }

            // update state
            userInfo.setUpdateMade(userInfo.updateMade + 1);
            setCreateNew({ status: false, errorMsg: '' });
            console.log(message);
        }
        catch (error) {
            console.log(error);
        }
    }

    // change title function
    async function changeTitle(event) {
        const domain = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {
            event.preventDefault();

            // get form data
            const formData = new FormData(event.target);

            // access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: domain,
                    scope: "read:current_user",
                },
            });

            // request with instance id and new title
            const response = await fetch('http://localhost:3000/update-title', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ instance_id: updateTitle.status, newTitle: formData.get('new-title') })
            });

            // response
            const message = await response.json();

            // validation errors
            if (message.errors) {
                setUpdateTitle({ ...updateTitle, errorMsg: message.errors[0].msg })
                console.log(message.errors[0].msg);
                return;
            }

            console.log(message);

            // update state
            userInfo.setUpdateMade(userInfo.updateMade + 1);
            setUpdateTitle({ status: false, errorMsg: '' });
        }
        catch (error) {
            console.log(error);
        }
    }

    // delete matrix instance function
    async function handleDelete(event) {
        const domain = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {
            event.preventDefault();

            // get form data
            const formData = new FormData(event.target);

            // access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: domain,
                    scope: "read:current_user",
                },
            });

            // request with instance id, user id and instance title
            const response = await fetch('http://localhost:3000/delete-matrix', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ instance_id: deleteMatrix.status, user_id: `${userInfo.user.sub.slice(6)}`, title: formData.get('delete-title') })
            });

            const message = await response.json()

            // validation errors
            if (message.errors) {
                setDeleteMatrix({ ...deleteMatrix, errorMsg: message.errors[0].msg })
                console.log(message.errors[0].msg)
                return;
            }

            console.log(message)
            // update state
            userInfo.setUpdateMade(userInfo.updateMade + 1);
            // change selected matrix to empty object
            userInfo.changeMatrix({});
            setDeleteMatrix({ status: false, errorMsg: '' });
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        isAuthenticated && (
            <div className="user-info">

                <h2>Hi {user.nickname}</h2>

                {/* render list item for each matrix instance with edit and delete button */}
                <ul>
                    {userInfo.userMatrices.map(item =>
                        <li key={item.instance_id}>
                            {/* select button */}
                            <button className={item.title === userInfo.selectedMatrix.title ? 'cs-active' : ''} onClick={() => userInfo.changeMatrix(item)}>{item.title}</button>
                            {/* edit and delete buttons */}
                            <div>
                                <button onClick={() => setUpdateTitle({ ...updateTitle, status: item.instance_id })}>edit</button>
                                <button onClick={() => setDeleteMatrix({ ...deleteMatrix, status: item.instance_id })}>delete</button>
                            </div>

                        </li>
                    )}
                </ul>

                {/* if user has less than 3 instances render create new button */}
                {userInfo.userMatrices.length < 3 && (
                    <button onClick={() => setCreateNew({ ...createNew, status: true })}>Create new</button>
                )}


                {/* create new instance form */}
                {createNew.status && (
                    <div id="new-matrix-form">
                        <button onClick={() => setCreateNew({ status: false, errorMsg: '' })}>Close</button>
                        <form onSubmit={(e) => createNewMatrix(e)}>
                            <label htmlFor="title">title</label>
                            <input type="text" name="title" id="title"></input>
                            <span>{createNew.errorMsg}</span>
                            <button>new</button>
                        </form>
                    </div>
                )}

                {/* update title form */}
                {updateTitle.status && (
                    <div id="update-matrix-title">
                        <button onClick={() => setUpdateTitle({ status: false, errorMsg: '' })}>close</button>
                        <form onSubmit={(e) => changeTitle(e)}>
                            <label htmlFor="new-title">New title</label>
                            <input type="text" name="new-title" id="new-title"></input>
                            <span>{updateTitle.errorMsg}</span>
                            <button>change title</button>
                        </form>
                    </div>
                )}

                {/* delete matrix form */}
                {deleteMatrix.status && (
                    <div id="delete-matrix">
                        <button onClick={() => setDeleteMatrix({status:false, errorMsg: ''})}>close</button>
                        <form onSubmit={(e) => handleDelete(e)}>
                            <label htmlFor="delete-title">Enter title</label>
                            <input type="text" name="delete-title" id="delete-title"></input>
                            <span>{deleteMatrix.errorMsg}</span>
                            <button>delete</button>
                        </form>
                    </div>
                )}

            </div>
        )
    )
}

export default Userpanel;