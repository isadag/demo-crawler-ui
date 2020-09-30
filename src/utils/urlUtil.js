function addHttpIfMissing(link) {
    if (link.search(/^http[s]?:\/\//) === -1) {
        link = 'http://' + link;
    }
    return link;
}

export { addHttpIfMissing };