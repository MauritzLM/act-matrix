import { useContext, useState } from "react";
import { userContext } from "../context/usercontext";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateForm from "./updateForm";
import editIcon from "../assets/svgs/edit.svg";
import deleteIcon from "../assets/svgs/delete.svg"
import addIcon from "../assets/svgs/add.svg";

function Userpanel() {
    const { getAccessTokenSilently, user } = useAuth0();
    const userInfo = useContext(userContext);

    const [update, setUpdate] = useState({ type: '', errorMsg: '', id: '', title: '', label: '' });
    const [activePanel, setActivePanel] = useState('')

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
            const createResponse = await fetch('https://actmatrixserver-production.up.railway.app/new-matrix', {
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
            setUpdate({ type: '', errorMsg: '', id: '', title: '', label: '' });

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

            // request with instance id and new title https://actmatrixserver-production.up.railway.app/update-title
            const response = await fetch('https://actmatrixserver-production.up.railway.app/update-title', {
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

            // update state
            userInfo.setUpdateMade(userInfo.updateMade + 1);
            setUpdate({ type: '', errorMsg: '', id: '', title: '', label: '' });
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
            const response = await fetch('https://actmatrixserver-production.up.railway.app/delete-matrix', {
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

            // update state
            userInfo.setUpdateMade(userInfo.updateMade + 1);
            // change selected matrix to empty object
            userInfo.changeMatrix({});
            setUpdate({ type: '', errorMsg: '', id: '', title: '', label: '' });
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

            const response = await fetch('https://actmatrixserver-production.up.railway.app/update-profile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname: formData.get('title'), user_id: user.sub })
            });

            const message = await response.json();

            // validation errors
            if (message.errors) {
                setUpdate({ ...update, errorMsg: message.errors[0].msg })
                console.log(message.errors[0].msg)
                return;
            }

            setUpdate({ type: '', errorMsg: '', id: '', title: '', label: '' });
            userInfo.setUpdateMade(userInfo.updateMade + 1);

        }
        catch (error) {
            console.log(error)
        }
    }

    function updateSelection(listItem) {
        userInfo.changeMatrix(listItem)
        setActivePanel('')
    }

    return (
        <div className="user-panel-wrapper">
            <button className="show-panel-btn" onClick={() => setActivePanel('cs-active')}>Show user panel</button>

            <div className={`overlay ${activePanel}`}>
                <div className="user-panel">
                    <div className="greeting">
                        <h2>Hi {user?.nickname}</h2>
                        <button title="update display name" onClick={() => setUpdate({ ...update, type: 'profile', label: 'new display name' })}>
                            edit name
                        </button>

                        <p>This is your user panel.
                            Here you can manage your matrices.
                            Create a new one, edit the name or delete it.</p>

                        <p>Remember to save your work!
                            (You need to save each quadrant individually).</p>
                    </div>


                    {/* update profile form */}
                    {update.type === 'profile' && (
                        <div className="form-wrapper">
                            <UpdateForm updateObj={update} setUpdate={setUpdate} updateFunction={updateProfile} />
                        </div>
                    )}

                    {/* render list item for each matrix instance with edit and delete button */}
                    <div className="user-list">
                        <h2 className="heading-small">Your matrices</h2>
                        <ul>
                            {userInfo.userMatrices.map(item =>
                                <li key={item.instance_id} className={item.title === userInfo.selectedMatrix.title ? 'cs-active' : ''}>
                                    {/* select button */}
                                    <button title="select instance" className={item.title === userInfo.selectedMatrix.title ? 'cs-active cs-button' : 'cs-button'} onClick={() => updateSelection(item)}>{item.title}</button>
                                    {/* edit and delete buttons */}
                                    <div>
                                        <button title="edit title" onClick={() => setUpdate({ ...update, type: 'new title', id: item.instance_id, label: 'new title' })}>
                                            <img alt="edit" src={editIcon} aria-hidden='true'></img>
                                        </button>

                                        <button title="delete matrix" onClick={() => setUpdate({ ...update, type: 'delete', id: item.instance_id, title: item.title, label: 'enter the title you want to delete' })}>
                                            <img alt="delete" src={deleteIcon} aria-hidden='true'></img>
                                        </button>
                                    </div>

                                </li>
                            )}
                        </ul>

                        {/* if user has less than 3 instances render create new button */}
                        {userInfo.userMatrices.length < 3 && (
                            <button data-testid="new" title="create new matrix" className="new-btn" onClick={() => setUpdate({ ...update, type: 'new matrix', label: 'new matrix title' })}>
                                {/* <img alt="add" src={addIcon} aria-hidden="true" height="20px" width="20px"></img> */}
                                + New Matrix
                            </button>
                        )}

                    </div>


                    {/* create new instance form */}
                    {update.type === 'new matrix' && (
                        <div className="form-wrapper">
                            <UpdateForm updateObj={update} setUpdate={setUpdate} updateFunction={createNewMatrix} />
                        </div>
                    )}

                    {/* update title form */}
                    {update.type === 'new title' && (
                        <div className="form-wrapper">
                            <UpdateForm updateObj={update} setUpdate={setUpdate} updateFunction={changeTitle} />
                        </div>
                    )}

                    {/* delete matrix form */}
                    {update.type === 'delete' && (
                        <div className="form-wrapper">
                            <UpdateForm updateObj={update} setUpdate={setUpdate} updateFunction={handleDelete} />
                        </div>
                    )}

                    <button className="hide-panel-btn" onClick={() => setActivePanel('')}>Hide user panel</button>
                </div>
            </div>
        </div>
    )
}

export default Userpanel;