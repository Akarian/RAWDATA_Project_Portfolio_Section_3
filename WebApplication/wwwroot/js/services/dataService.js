define(["jquery"], function($) {
    var get = (url, callback) => {
        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    return response
                }
                return response.json();
            })
            .then(callback);
    };

    var post = (url, jObject, callback) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jObject)
        })
            .then(function (response) {
                if (!response.ok) {
                    return response
                }
                return response.json();
            })
            .then(callback);
    }


    var deleteItem = (url, callback) => {
        fetch(url, {
            method: 'DELETE'
        })
            .then(function (response) {
                if (!response.ok) {
                    return response;
                }
                return response.json();
            })
            .then(callback);
    }

    var put = (url, jObject, callback) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jObject)
        })
            .then(function (response) {
                if (!response.ok) {
                    return response
                }
                return response.json();
            })
            .then(callback);
    }

    return {
        get,
        post,
        deleteItem,
        put
    }
});