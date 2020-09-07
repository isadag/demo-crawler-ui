import React, { useState } from 'react';
import Form from './form';

function PageResultWrapper() {
    const pageCrawlerApiUrl = "https://demo-crawler-api.herokuapp.com/api/pagecrawler";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [pageUrl, setPageUrl] = useState('http://www.google.com');

    function addHttpIfMissing(link) {
        if (link.search(/^http[s]?\:\/\//) === -1) {
            link = 'http://' + link;
        }
        return link;
    }

    const onInputChange = (e) => {
        let url = e.target.value;
        setPageUrl(url);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // TODO: Add validation and feedback on error instead
        if (pageUrl == null || pageUrl === '') {
            setPageUrl('http://www.google.com');
        }
        getPageFromCrawler(addHttpIfMissing(pageUrl));
    }

    const getPageFromCrawler = (url) => {
        setIsLoading(true);
        fetch(`${pageCrawlerApiUrl}?url=${url}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoading(false);
                    setStatus(result);
                },
                (error) => {
                    setIsLoading(false);
                    setError(error);
                    console.log(error);
                }
            )
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (isLoading) {
        return <div>Loading...</div>;
    } else {
        if (status != null) {
            return (
                <React.Fragment>
                    <div className="container">
                        <Form className="center" onSubmit={onSubmit} onChange={onInputChange} />
                        <h1>Web page screenshot</h1>
                        <div className="imageContainer">
                            <img src={`data:image/png;base64,${status}`} alt="screenshot" />
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <Form className="center" onSubmit={onSubmit} onChange={onInputChange} />
            );
        }
    }
}

export default PageResultWrapper;