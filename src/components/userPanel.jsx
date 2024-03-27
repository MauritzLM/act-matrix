import { useContext } from "react";
import { userContext } from "../context/usercontext";
import { useAuth0 } from "@auth0/auth0-react";

function Userpanel() {
    const { getAccessTokenSilently } = useAuth0()
    const userInfo = useContext(userContext);

    // function to create new matrix
    const createNewMatrix = async function () {

        const domain = import.meta.env.VITE_AUTH0_API_AUDIENCE;

        try {
            // get access token
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: domain,
                    scope: "read:current_user",
                },
            })

            const createResponse = await fetch('http://localhost:3000/new-matrix', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: 'matrix title3', user_id: `${userInfo.user.sub.slice(6)}` })
            });

            const message = await createResponse.json()

            console.log(message);
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="user-info">

                <h2>{userInfo.user.username}</h2>

                {/* render list item for each matrix instance */}
                <ul>
                    {userInfo.userMetadata?.map(item =>
                        <li key={item.instance_id}><button onClick={() => userInfo.changeMatrix(item.title)}>{item.title}</button></li>
                    )}
                </ul>
                
                {/* add input / form to create a title* */}
                <button disabled onClick={createNewMatrix}>new</button>


            </div>
        </>
    )
}

export default Userpanel;