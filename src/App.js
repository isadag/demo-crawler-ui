import React from 'react';
import PageWrapper from './components/pageResultWrapper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4, 0, 3),
  },
}));

function App() {
  // const statusApiUrl = "https://demo-crawler-api.herokuapp.com/api/crawlerstatus";
  // const screenshotApiUrl = "https://demo-crawler-api.herokuapp.com/api/pagecrawler";
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" color="primary">
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <Link href="/" color="inherit" className="menu-btn">
                Demo crawler
              </Link>
            </Typography>
          </Toolbar>
        </Grid>
      </AppBar>
      <Grid container direction="column" alignItems="center" justify="center" className={classes.container}>
        <Grid item xs={12} className={classes.container}>
          <Typography variant="h3" component="h1" align="center">
            Web page stuff
          </Typography>
          <Typography variant="h5" component="p" align="center">
            Do something to find something yada yada yada...
          </Typography>
        </Grid>
          <Grid item xs={12}>
            <PageWrapper />
          </Grid>
      </Grid>
    </React.Fragment>

  );
}

export default App;