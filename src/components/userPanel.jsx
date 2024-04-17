import { useContext, useState } from "react";
import { userContext } from "../context/usercontext";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateForm from "./updateForm";

function Userpanel() {
    const { getAccessTokenSilently, user } = useAuth0();
    const userInfo = useContext(userContext);

    const [update, setUpdate] = useState({ type: '', errorMsg: '', id: '', title: '' });

    // create new matrix function
    const createNewMatrix = async function (event) {

        const audience = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {
            event.preventDefault();

            // get title from input
            const formData = new FormData(event.target);
            const title = formData.get("title");

            // get access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: audience,
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
                setUpdate({ ...update, errorMsg: message.errors[0].msg })
                console.log(message.errors[0].msg)
                return;
            }

            // update state
            userInfo.setUpdateMade(userInfo.updateMade + 1);
            setUpdate({ type: '', errorMsg: '', id: '', title: '' });
            console.log(message);
        }
        catch (error) {
            console.log(error);
        }
    }

    // change title function
    async function changeTitle(event) {
        const audience = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {
            event.preventDefault();

            // get form data
            const formData = new FormData(event.target);

            // access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: audience,
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
                body: JSON.stringify({ instance_id: update.id, newTitle: formData.get('title') })
            });

            // response
            const message = await response.json();

            // validation errors
            if (message.errors) {
                setUpdate({ ...update, errorMsg: message.errors[0].msg })
                console.log(message.errors[0].msg);
                return;
            }

            console.log(message);

            // update state
            userInfo.setUpdateMade(userInfo.updateMade + 1);
            setUpdate({ type: '', errorMsg: '', id: '', title: '' });
        }
        catch (error) {
            console.log(error);
        }
    }

    // delete matrix instance function
    async function handleDelete(event) {
        const audience = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {
            event.preventDefault();

            // get form data
            const formData = new FormData(event.target);

            // access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: audience,
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
                body: JSON.stringify({ instance_id: update.id, user_id: `${userInfo.user.sub.slice(6)}`, title: formData.get('title') })
            });

            const message = await response.json()

            // validation errors
            if (message.errors) {
                setUpdate({ ...update, errorMsg: message.errors[0].msg })
                console.log(message.errors[0].msg)
                return;
            }

            console.log(message)
            // update state
            userInfo.setUpdateMade(userInfo.updateMade + 1);
            // change selected matrix to empty object
            userInfo.changeMatrix({});
            setUpdate({ type: '', errorMsg: '', id: '', title: '' });
        }
        catch (error) {
            console.log(error)
        }
    }

    // update user profile data function
    // send request and data to api
    async function updateProfile(event) {
        const audience = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {

            event.preventDefault();

            const formData = new FormData(event.target);

            // access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: audience,
                    scope: "read:current_user update:current_user_metadata",
                },
            });

            const response = await fetch('http://localhost:3000/update-profile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname: formData.get('title'), user_id: user.sub })
            });

            const message = await response.json();

            console.log(message)

            // validation errors
            if (message.errors) {
                setUpdate({ ...update, errorMsg: message.errors[0].msg })
                console.log(message.errors[0].msg)
                return;
            }

            setUpdate({ type: '', errorMsg: '', id: '', title: '' });
            userInfo.setUpdateMade(userInfo.updateMade + 1);

        }
        catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="user-panel">

            <div className="greeting">
                <h1>Hi {user?.nickname}</h1>
                <button title="update display name" onClick={() => setUpdate({ ...update, type: 'profile' })}>
                    edit name
                </button>

                <p>This is your user panel where you can select or create / delete a matrix instance.</p>
            </div>


            {/* update profile form */}
            {update.type === 'profile' && (
                <UpdateForm updateObj={update} setUpdate={setUpdate} updateFunction={updateProfile} />
            )}

            {/* render list item for each matrix instance with edit and delete button */}
            <div className="user-list">
                <h2>Your matrices</h2>
                <ul>
                    {userInfo.userMatrices.map(item =>
                        <li key={item.instance_id} className={item.title === userInfo.selectedMatrix.title ? 'cs-active' : ''}>
                            {/* select button */}
                            <button title="select instance" className={item.title === userInfo.selectedMatrix.title ? 'cs-active cs-button' : 'cs-button'} onClick={() => userInfo.changeMatrix(item)}>{item.title}</button>
                            {/* edit and delete buttons */}
                            <div>
                                <button title="edit title" onClick={() => setUpdate({ ...update, type: 'new title', id: item.instance_id })}>
                                    <img alt="" src='./src/assets/svgs/edit.svg'></img>
                                </button>

                                <button title="delete matrix" onClick={() => setUpdate({ ...update, type: 'delete', id: item.instance_id, title: item.title })}>
                                    <img alt="" src='./src/assets/svgs/delete.svg'></img>
                                </button>
                            </div>

                        </li>
                    )}
                </ul>

                {/* if user has less than 3 instances render create new button */}
                {userInfo.userMatrices.length < 3 && (
                    <button data-testid="new" title="create new matrix" className="new-btn" onClick={() => setUpdate({ ...update, type: 'new matrix' })}>
                        {/* <img alt="" src="./src/assets/svgs/add.svg" height='30px' width='30px'></img> */}
                       Create New
                    </button>
                )}

            </div>


            {/* create new instance form */}
            {update.type === 'new matrix' && (
                <UpdateForm updateObj={update} setUpdate={setUpdate} updateFunction={createNewMatrix} />
            )}

            {/* update title form */}
            {update.type === 'new title' && (
                <UpdateForm updateObj={update} setUpdate={setUpdate} updateFunction={changeTitle} />
            )}

            {/* delete matrix form */}
            {update.type === 'delete' && (
                <UpdateForm updateObj={update} setUpdate={setUpdate} updateFunction={handleDelete} />
            )}
        </div>
    )

}

export default Userpanel;