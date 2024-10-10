
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { userContext } from "../context/usercontext";
import "../assets/sass/dashboard.scss";

const Dashboard = ({ children }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [userMatrices, setUserMatrices] = useState([]);
  const [selectedMatrix, setSelectedMatrix] = useState({});
  const [updateMade, setUpdateMade] = useState(0);

  function changeMatrix(obj) {
    setSelectedMatrix({ ...obj })
  }
  
  // function to update context when saving quadrant
  function updateUserMatrices(id, quadrant, quadrant_content) {
    setUserMatrices(userMatrices.map(matrix => {
      if (matrix.instance_id === id) {
        // Create a *new* object with changes
        return { ...matrix, [quadrant]: quadrant_content };
      }

      else {
        return matrix
      }
    }));
  }

  // get user data
  useEffect(() => {

    // async function to get user data
    const getUserMetadata = async () => {

      const audience = import.meta.env.VITE_AUTH0_API_AUDIENCE;

      try {

        // instances fetch
        // get access token
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            scope: "read:current_user",
          },
        });

        // fetch all instances for user
        const userInstancesUrl = `https://actmatrixserver-production.up.railway.app/all-matrix`;

        const userInstancesResponse = await fetch(userInstancesUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'user_id': `${user?.sub.slice(6)}` })
        });


        const response = await userInstancesResponse.json();

        setUserMatrices([...response]);

      } catch (e) {
        console.log(e.message);
      }
    }

    // run function if user loaded from auth0
    if (user) {
      getUserMetadata();
    }

  }, [getAccessTokenSilently, user, updateMade]);

  // context data
  const contextData = {
    userMatrices: userMatrices,
    updateUserMatrices: updateUserMatrices,
    user: user,
    selectedMatrix: selectedMatrix,
    changeMatrix: changeMatrix,
    updateMade: updateMade,
    setUpdateMade: setUpdateMade
  }

  if (isLoading) {
    return <div className="container">Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="container">
        <userContext.Provider value={contextData}>
          {children}
        </userContext.Provider>
      </div>
    )
  );
};

export default Dashboard;