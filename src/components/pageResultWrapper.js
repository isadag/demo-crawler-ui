import React, { useState } from 'react';
import Form from './form';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    const pageCrawlerApiUrl = "https://demo-crawler-api.herokuapp.com/api/pagecrawler";
    // const pageCrawlerApiUrl = "https://localhost:5001/api/page-crawler";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageScreenshot, setPageScreenshot] = useState(null);
    const [pageUrl, setPageUrl] = useState('http://www.google.com');

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
        getPageFromCrawler(addHttpIfMissing(pageUrl));
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
                }
                else {
                    throw Error("Something something wrong");
                }
            })
            .catch((ex => {
                console.log(ex);
                setIsLoading(false);
                setError(ex);
            }));
    }

    if (error) {
        return (
            <React.Fragment>
                <Typography>
                    Error: {error.message}
                </Typography>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Form xs={12} className="center" onSubmit={onSubmit} onChange={onInputChange} pageUrl={pageUrl} />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    } else if (isLoading) {
        return (
            <React.Fragment>
                <Backdrop open={isLoading} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </React.Fragment>
        );
    } else {
        if (pageScreenshot != null) {
            return (
                <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Form onSubmit={onSubmit} onChange={onInputChange} pageUrl={pageUrl} />
                    </Grid>
                    <Slide direction="up" in={pageScreenshot} mountOnEnter unmountOnExit>
                        <Grid item xs={10} sm={8}>
                            <Card>
                                <CardContent>
                                    <img src={`data:image/png;base64,${pageScreenshot}`} alt="screenshot" className={classes.image} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Slide>
                </Grid>
            );
        } else {
            return (
                <React.Fragment>
                    <Grid container direction="column" alignItems="center" justify="center">
                        <Grid item xs={12}>
                            <Form className="center" onSubmit={onSubmit} onChange={onInputChange} />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
        }
    }
}

export default PageResultWrapper;