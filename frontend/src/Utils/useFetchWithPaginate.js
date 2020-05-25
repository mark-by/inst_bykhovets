import React from 'react';
import axios from 'axios';

export default function useFetchWithPaginate(url, pageNumber, limit, additionalParams) {
    if (!limit) {
        limit = 5;
    }
    const params = {...{page : pageNumber, limit: limit}, ...additionalParams}
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(false);

    function refresh(setPage) {
        setData([]);
        setPage(1);
    }

    React.useEffect(() => {
        setLoading(true);
        let cancel;
        axios({
            method: 'GET',
            url: url,
            params: params,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            if (response.status === 200) {
                setData(prevPosts => {
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

    return {loading, data, hasMore, refresh}
}