import React, { useState, useEffect } from "react";

/*  TODO: break out into multiple smaller components
    - search form
    - loading indicator
    - search result
*/
function PageFetch() {
    const screenshotApiUrl = "https://localhost:5001/api/pagecrawler";
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetch(screenshotApiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setStatus(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.log(error);
                }
            )
    }, [])

    // TODO: add error handling and proper feedback
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
export default PageFetch;