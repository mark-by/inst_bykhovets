import Cookies from 'js-cookie'

function cfetch(url, options) {
    let csrfToken = Cookies.get('csrftoken');
    let additionalHeader = {
            'X-CSRFToken': csrfToken,
    };
    options.headers = {...options.headers, ...additionalHeader};
    return fetch(url, options);
}

export default cfetch;
