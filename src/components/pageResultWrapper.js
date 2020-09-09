import React, { useState } from 'react';
import Form from './form';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%'
    },
}));


function PageResultWrapper() {
    const classes = useStyles();
    const pageCrawlerApiUrl = "https://demo-crawler-api.herokuapp.com/api/pagecrawler";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageResult, setPageResult] = useState(null);
    const [pageUrl, setPageUrl] = useState('http://www.google.com');
    // const [open, setOpen] = useState(isLoading);
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

        // TODO: Add validation and feedback on error instead
        if (pageUrl == null || pageUrl === '') {
            setPageUrl('http://www.google.com');
        }
        getPageFromCrawler(pageUrl);
    }

    const getPageFromCrawler = (url) => {
        setIsLoading(true);
        fetch(`${pageCrawlerApiUrl}?url=${url}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoading(false);
                    setPageResult(result);
                },
                (error) => {
                    if (!error) {
                        error = "An unexpected error occurred while fetching the page results. Please try again later.";
                    }
                    console.log(error);
                    setIsLoading(false);
                    setError(error);
                }
            )
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (isLoading) {
        // return <div>Loading...</div>;
        return (
            <React.Fragment>
                <Backdrop open={isLoading} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </React.Fragment>
        );
    } else {
        if (pageResult != null) {
            return (
                <React.Fragment>
                    <Grid container direction="column" alignItems="center" justify="center">
                        <Grid item xs={12}>
                            <Form onSubmit={onSubmit} onChange={onInputChange} pageUrl={pageUrl} />
                        </Grid>
                        <Slide direction="up" in={pageResult} mountOnEnter unmountOnExit>
                            <Grid item xs={10} sm={8}>
                                <Card>
                                    <CardContent>
                                        <img src={`data:image/png;base64,${pageResult}`} alt="screenshot" className={classes.image} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Slide>
                    </Grid>
                </React.Fragment>
            );
        } else {
            return (
                <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Form className="center" onSubmit={onSubmit} onChange={onInputChange} />
                    </Grid>
                </Grid>
            );
        }
    }
}

export default PageResultWrapper;