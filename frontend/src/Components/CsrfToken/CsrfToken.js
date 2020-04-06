import React from 'react';
import Cookies from 'js-cookie'

var csrfToken = Cookies.get('csrftoken');

function CsrfToken() {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
    );
}

export default CsrfToken;