
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [userMetadata, setUserMetadata] = useState(null);

  // get user data
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = import.meta.env.VITE_AUTH0_API_AUDIENCE;

      try {
        // get access token
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: domain,
            scope: "read:current_user",
          },
        });

        // url
        const userDetailsByIdUrl = `http://localhost:3000/matrix`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'id': '6' })
        });

        const response = await metadataResponse.json();
        console.log(response);

        setUserMetadata(response);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.nickname}</h2>
        <p>{user.sub.split('auth0|')}</p>
        <h3>User Metadata</h3>
        <p>instance_id: {userMetadata.instance_id}</p>
        <p>quadrant_1 content: {userMetadata.quadrant_1}</p>
      </div>
    )
  );
};

export default Dashboard;