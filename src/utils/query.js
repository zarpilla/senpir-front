function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getSlugFromHash() {
    if (window.location.hash) {
        var slug = window.location.hash.substring(2)
        var index = slug.indexOf('/')
        if (index > 0) {
            slug = slug.substring(0, index)
        }
        return slug
    }
    return '';
}


    
export default { getParameterByName, getSlugFromHash }