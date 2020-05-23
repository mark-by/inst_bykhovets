import React from 'react';
import axios from 'axios';

export default function usePostSearch(pageNumber) {
    const [loading, setLoading] = React.useState(true);
    const [posts, setPosts] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        let cancel;
        axios({
            method: 'GET',
            url: '/api/index',
            params: {page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            if (response.status === 200) {
                setPosts(prevPosts => {
                    return [...new Set([...prevPosts, ...response.data])]
                })
                setHasMore(true);
                setLoading(false);
            } else {
                setHasMore(false);
            }
        }) .catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel();
    }, [pageNumber])

    return {loading, posts, hasMore}
}