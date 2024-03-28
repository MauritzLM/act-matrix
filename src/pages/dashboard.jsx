
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, Children, useContext } from "react";
import { userContext } from "../context/usercontext";
import "../assets/sass/dashboard.scss";
// import Userpanel from "../components/userPanel";
// import Matrix from "../components/matrix";


const Dashboard = ({ children }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [userMatrices, setUserMatrices] = useState([]);
  const [selectedMatrix, setSelectedMatrix] = useState({});

  function changeMatrix (obj) {
    setSelectedMatrix({ ...obj })
  }

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

        // url / fetch all instances for user
        const userDetailsByIdUrl = `http://localhost:3000/all-matrix`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'user_id': `${user?.sub.slice(6)}` })
        });

        const response = await metadataResponse.json();
        console.log(response);

        setUserMatrices([...response]);

      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();

  }, [getAccessTokenSilently, user?.sub]);

  // context data
  const contextData = {
    userMatrices: userMatrices,
    user: user,
    selectedMatrix: selectedMatrix,
    changeMatrix: changeMatrix
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>

        <div className="container">
          {/* <div className="user-info">
            <img src={user.picture} alt={user.name} />
            <h2>{user.nickname}</h2>
            <p>{user.sub.split('auth0|')}</p>
            <h3>User Metadata</h3>
            
            <p>instance id: {userMetadata?.instance_id}</p>
            <p>quadrant_1 content: {userMetadata?.quadrant_1}</p>
          </div> */}
          <userContext.Provider value={contextData}>
            {children}
          </userContext.Provider>
        </div>

      </>
    )
  );
};

export default Dashboard;