import React from 'react'

export default function useRefLastItem(loading, hasMore, setPage) {
    const observer = React.useRef();
    const lastPostElementRef = React.useCallback(node => {
        if (loading) {
            return
        }
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1)
            }
        })
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return lastPostElementRef;
}