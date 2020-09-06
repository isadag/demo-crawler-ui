import React from 'react';
import PageFetch from './components/pageFetch';
import "./App.css";

function App() {
  // const statusApiUrl = "https://demo-crawler-api.herokuapp.com/api/crawlerstatus";
  // const screenshotApiUrl = "https://demo-crawler-api.herokuapp.com/api/pagecrawler";
  return (
    <React.Fragment>
      <PageFetch />
    </React.Fragment>
  );
}

export default App;