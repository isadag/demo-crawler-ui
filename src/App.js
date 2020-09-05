import React, { useState, useEffect } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("https://demo-crawler-api.herokuapp.com/api/crawlerstatus")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setStatus(result.status);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <h1>
        The status is: {status}
      </h1>
    );
  }
}

export default App;
