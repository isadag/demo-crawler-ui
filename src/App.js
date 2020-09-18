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
    margin: theme.spacing(2, 0, 2),
  },
}));

function App() {
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
            Grab a screenshot!
          </Typography>
          <Typography variant="h6" component="p" align="center">
            Enter a web page's URL to grab a screenshot of it
          </Typography>
        </Grid>
        <PageWrapper />
      </Grid>
    </React.Fragment>

  );
}

export default App;