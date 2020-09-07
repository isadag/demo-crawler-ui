import React from 'react';
import PageWrapper from './components/pageResultWrapper';
import "./App.css";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function App() {
  // const statusApiUrl = "https://demo-crawler-api.herokuapp.com/api/crawlerstatus";
  // const screenshotApiUrl = "https://demo-crawler-api.herokuapp.com/api/pagecrawler";

  return (
    <React.Fragment>
      <AppBar position="static" color="primary">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <Link href="/" color="inherit" className="menu-btn">
                Demo crawler
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Web page stuff
        </Typography>
          <PageWrapper />
        </Box>
      </Container>
    </React.Fragment>

  );
}

export default App;