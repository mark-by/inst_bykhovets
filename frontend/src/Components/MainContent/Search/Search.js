import React from "react";
import ShortPost from "./ShortPost/ShortPost";
import "./Search.css"
import {useFetch} from "../../useFetch";

function Search(props) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    async function fetchUrl(url) {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    React.useEffect(() => {
        if (props.isHome) {
            fetchUrl('api/post?self=1');
        }
    }, []);

    let content;
    if (!loading) {
        content = data.map((post, idx) => {
            return (
                <ShortPost img_src={post.content} id={post.id} key={idx}/>
            )
        })
    }

    return (
        <div className="search-wrapper" id="search-wrapper" onClick={(event) => {
            if (event.target === document.getElementById('search-wrapper')) {
                setLoading(true);
                fetchUrl('api/post?self=1')
            }
        }}>
            {content}
        </div>
    );
}

export default Search;