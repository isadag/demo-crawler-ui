import React, { useState } from 'react';
import Form from './form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Validator from 'validator';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%'
    },
    gridItem: {
        margin: theme.spacing(3, 0, 3),
    }
}));


function PageResultWrapper() {
    const classes = useStyles();
    const pageCrawlerApiUrl = "https://demo-crawler-api.herokuapp.com/api/page-crawler";
    // const pageCrawlerApiUrl = "https://localhost:5001/api/page-crawler";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageScreenshot, setPageScreenshot] = useState(null);
    const [pageUrl, setPageUrl] = useState(null);

    function addHttpIfMissing(link) {
        if (link.search(/^http[s]?:\/\//) === -1) {
            link = 'http://' + link;
        }
        return link;
    }

    /* Function used to make sure the keyboard is dismissed
    on mobile devices if the user submits via the 
    keyboard's enter key instead of using the button
    */
    const focusOnElement = (elementQuerySelector) => {
        let element = document.querySelector(elementQuerySelector);
        element.tabIndex = 1;
        element.focus();
    }

    const onInputChange = (e) => {
        let url = e.target.value;
        setPageUrl(url);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        // Dismiss keyboard on mobile devices, disturbing otherwise
        focusOnElement('body');

        setError(null);
        setPageScreenshot(null);

        if (pageUrl != null && Validator.isURL(pageUrl)) {
            getPageFromCrawler(addHttpIfMissing(pageUrl));
        } else {
            setError("Provide a valid URL");
        }
    }

    const getPageFromCrawler = (url) => {
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
                    setError(null);
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
                pageScreenshot != null &&
                <Fade in={pageScreenshot} timeout={1500}>
                    <Grid item xs={10} sm={8}>
                        <Card raised>
                            <CardContent>
                                <img src={`data:image/png;base64,${pageScreenshot}`} alt="screenshot" className={classes.image} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Fade>
            }
        </Grid>
    );
}

export default PageResultWrapper;