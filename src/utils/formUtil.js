/* Function used to make sure the keyboard is dismissed
   on mobile devices if the user submits via the 
   keyboard's enter key instead of using the button
*/
const focusOnElement = (elementQuerySelector) => {
    let element = document.querySelector(elementQuerySelector);
    element.tabIndex = 1;
    element.focus();
}

export { focusOnElement };