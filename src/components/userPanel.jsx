import { useContext, useState } from "react";
import { userContext } from "../context/usercontext";
import { useAuth0 } from "@auth0/auth0-react";

function Userpanel() {
    const { getAccessTokenSilently } = useAuth0();
    const userInfo = useContext(userContext);

    const [createNew, setCreateNew] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(false);


    // function to create new matrix
    const createNewMatrix = async function (event) {

        const domain = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {

            // get title from input
            const formData = new FormData(event.target);
            const title = formData.get("title");

            console.log(title);

            // get access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: domain,
                    scope: "read:current_user",
                },
            });

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
                console.log(message.errors[0].msg)
            }

            userInfo.setUpdateMade(userInfo.updateMade + 1);
            console.log(message);
        }
        catch (error) {
            console.log(error);
        }
    }

    // change title
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

            // request
            const response = await fetch('http://localhost:3000/update-title', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ instance_id: updateTitle, newTitle: formData.get('new-title') })
            });


            // response
            const message = await response.json();

            // validation errors
            if (message.errors) {
                console.log(message.errors[0].msg)
            }

            console.log(message);

            userInfo.setUpdateMade(userInfo.updateMade + 1);
            setUpdateTitle(false);
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="user-info">

                <h2>{userInfo.user?.sub}</h2>

                {/* render list item for each matrix instance */}
                <ul>
                    {userInfo.userMatrices.map(item =>
                        <li key={item.instance_id}><button className={item.title === userInfo.selectedMatrix.title ? 'cs-active' : ''} onClick={() => userInfo.changeMatrix(item)}>{item.title}</button> <button onClick={() => setUpdateTitle(item.instance_id)}>edit</button></li>
                    )}
                </ul>

                <button disabled onClick={() => setCreateNew(true)}>Create new</button>

                {/* create new instance form */}
                {createNew && (
                    <div id="new-matrix-form">
                        <button onClick={() => setCreateNew(false)}>Close</button>
                        <form onSubmit={(e) => createNewMatrix(e)}>
                            <label htmlFor="title">title</label>
                            <input type="text" name="title" id="title"></input>
                            <button>new</button>
                        </form>
                    </div>
                )}

                {/* update title form */}
                {updateTitle && (
                    <div id="update-matrix-title">
                        <button onClick={() => setUpdateTitle(false)}>close</button>
                        <form onSubmit={(e) => changeTitle(e)}>
                            <label htmlFor="new-title">New title</label>
                            <input type="text" name="new-title" id="new-title"></input>
                            <button>change title</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default Userpanel;