export default function searchPosts(id) {
    let result
    fetch('api/get_user_posts?id=' + id).then(response => {
        if (response.ok) {
            response.json().then(json => {result = json;});
        }
    });
    return result;
}

