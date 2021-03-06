import React, { useState, useEffect } from 'react';
import Form from './form';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Screenshot from './screenshot';
import Validator from 'validator';
import { addHttpIfMissing } from '../../utils/urlUtil';
import { focusOnElement } from '../../utils/formUtil';

function PageResultWrapper() {
    const pageCrawlerApiUrl = "https://demo-crawler-api.herokuapp.com/api/page-crawler";
    // const pageCrawlerApiUrl = "https://localhost:5001/api/page-crawler";
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageScreenshot, setPageScreenshot] = useState<string>('');
    const [pageUrl, setPageUrl] = useState<string>('');

    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        let url = e.currentTarget.value;
        setPageUrl(url);
    }

    const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        // Dismiss keyboard on mobile devices, disturbing otherwise
        focusOnElement('body');

        setError('');
        setPageScreenshot('');

        if (pageUrl != null && Validator.isURL(pageUrl)) {
            getPageFromCrawler(addHttpIfMissing(pageUrl));
        } else {
            setError("Provide a valid URL");
        }
    }

    const getPageFromCrawler = (url: string) => {
        let requestUrl = `${pageCrawlerApiUrl}?url=${url}`;
        setIsLoading(true);
        fetch(requestUrl)
            .then((res => {
                if (!res.ok) {
                    if (res.status === 400) {
                        throw Error("Provide a valid URL");
                    }
                    throw Error(res.statusText);
                }
                return res;
            }))
            .then((res => res.json()))
            .then(responseJson => {
                if (responseJson.fullPageScreenshot !== '') {
                    setIsLoading(false);
                    setPageScreenshot(responseJson.fullPageScreenshot);
                    setError('');
                }
                else {
                    throw Error("Web page not found, try another URL");
                }
            })
            .catch((ex => {
                setIsLoading(false);
                setError(ex.message);
            }));
    }

    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Grid item xs={9} sm={4}>
                <Form className="center" loading={isLoading} onSubmit={onSubmit} onChange={onInputChange} pageUrl={pageUrl} error={error} />
            </Grid>
            {
                pageScreenshot !== '' &&
                <Fade in={true} timeout={1500}>
                    <Grid item xs={10} sm={8}>
                        <Screenshot pageScreenshot={pageScreenshot} />
                    </Grid>
                </Fade>
            }
        </Grid>
    );
}

export default PageResultWrapper;