import React from 'react'
import useFetchWithPaginate from "../../Utils/useFetchWithPaginate";
import useRefLastItem from "../../Utils/useRefLastItem";
import Button from "../Button/Button";
import defaultAvatar from "../../imgs/user.svg"
import './UserList.css'

export default function UserList(props) {
    let [page, setPage] = React.useState(1);
    const {loading, data, hasMore, refresh} = useFetchWithPaginate(props.url, page, 20, props.additionalParams);
    const lastUserRef = useRefLastItem(loading, hasMore, setPage);


    return (
        <div className="user-list-wrapper" onClick={() => props.close()}>
            <div className="user-list">
                {data.length === 0 && <div>Empty yet</div>}
                {data.map((user, idx) => {
                    if (idx + 1 === data.length) {
                        return <div ref={lastUserRef} className="user-list__item" key={idx}>
                            <Button class="post__header_user-avatar" noFilterOnHover={true} img_src={user.avatar ? user.avatar : defaultAvatar}
                                    onClick={() => props.handlerGetUser(user.id)}/>
                            <Button
                                class="post__comment_user-name"
                                text={user.username}
                                onClick={() => props.handlerGetUser(user.id)}
                            />
                        </div>
                    } else {
                        return <div ref={lastUserRef} className="user-list__item" key={idx}>
                            <Button class="post__header_user-avatar" noFilterOnHover={true} img_src={user.avatar ? user.avatar : defaultAvatar}
                                    onClick={() => props.handlerGetUser(user.id)}/>
                            <Button
                                class="post__comment_user-name"
                                text={user.username}
                                onClick={() => props.handlerGetUser(user.id)}
                            />
                        </div>
                    }
                })}
            </div>
        </div>
    )
}