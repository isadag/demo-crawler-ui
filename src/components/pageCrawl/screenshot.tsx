import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%'
    },
}));

const Screenshot = (props: any) => {
    const classes = useStyles();
    return (
        <Card raised>
            <CardContent>
                <img src={`data:image/png;base64,${props.pageScreenshot}`} alt="screenshot" className={classes.image} />
            </CardContent>
        </Card>
    );
}

export default Screenshot;