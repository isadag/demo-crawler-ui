import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(2, 0, 4),
    },
}));

const Form = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <form onSubmit={props.onSubmit}>
                <TextField error={props.error} helperText={props.error} inputProps={{ inputMode: 'url' }} fullWidth name="url" placeholder="https://www.google.com" id="standard-required" label="Web page URL" onChange={props.onChange} value={props.pageUrl} />
                <Button fullWidth variant="contained" color="primary" type="submit" className={classes.button}>
                    Something
                </Button>
            </form>
        </React.Fragment>
    )
}

export default Form;