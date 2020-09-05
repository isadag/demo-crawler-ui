import React, { useState, useEffect } from 'react';
import "./App.css";

function App() {
  // const statusApiUrl = "https://demo-crawler-api.herokuapp.com/api/crawlerstatus";
  const screenshotApiUrl = "https://localhost:5001/api/pagecrawler";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setStatus] = useState(null);

  // useEffect(() => {
  //   fetch(statusApiUrl)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setStatus(result.status);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])

  useEffect(() => {
    fetch(screenshotApiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setStatus(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <h1>Web page screenshot</h1>
        <div className="imageContainer">
          <img src={`data:image/png;base64,${status}`} alt="screenshot" />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
