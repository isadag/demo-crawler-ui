import React, { useState } from 'react';
import Form from './form';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Validator from 'validator';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%'
    },
    gridItem: {
        margin: theme.spacing(3, 0, 3),
    },
}));


function PageResultWrapper() {
    const classes = useStyles();
    const pageCrawlerApiUrl = "https://demo-crawler-api.herokuapp.com/api/page-crawler";
    // const pageCrawlerApiUrl = "https://localhost:5001/api/page-crawler";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageScreenshot, setPageScreenshot] = useState(null);
    const [pageUrl, setPageUrl] = useState(null);

    const handleClose = () => {
        setIsLoading(false);
    };

    function addHttpIfMissing(link) {
        if (link.search(/^http[s]?:\/\//) === -1) {
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

    if (isLoading) {
        return (
            <React.Fragment>
                <Backdrop open={isLoading} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </React.Fragment>
        );
    } else {
        return (
            <Grid container direction="column" alignItems="center" justify="center">
                <Grid item xs={12}>
                    <Form xs={12} className="center" onSubmit={onSubmit} onChange={onInputChange} pageUrl={pageUrl} error={error} />
                </Grid>
                {
                    pageScreenshot != null &&
                    <Slide direction="up" in={pageScreenshot} mountOnEnter unmountOnExit>
                        <Grid item xs={10} sm={8}>
                            <Card>
                                <CardContent>
                                    <img src={`data:image/png;base64,${pageScreenshot}`} alt="screenshot" className={classes.image} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Slide>
                }
            </Grid>
        );
    }
}

export default PageResultWrapper;