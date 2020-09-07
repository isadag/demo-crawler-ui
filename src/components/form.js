import React from "react";

const Form = (props) => {
    return (
        <React.Fragment>
            <form onSubmit={props.onSubmit} className={props.className}>
                <input type="text" name="url" placeholder="http://www.google.com" onChange={props.onChange} autoFocus />
                <input type="submit" value="Get result" />
            </form>
        </React.Fragment>
    )
}

export default Form;