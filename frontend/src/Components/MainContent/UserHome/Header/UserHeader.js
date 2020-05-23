import React from "react";
import "./UserHeader.css"
import Button from "../../../Button/Button";
import Modal from "../../../Modal/Modal";
import settings_svg from "../../../../imgs/settings.svg";
import user_svg from "../../../../imgs/user.svg";
import cfetch from "../../../CsrfToken/cfetch";

function UserHeader(props) {
    const [state, setState] = React.useState({
        settingsModalIsOpen: false,
    });
    let [isFollowing, setIsFollowing] = React.useState(props.is_following);

    let followButtonText = "Follow";
    if (isFollowing) {
        followButtonText = "Unfollow";
    }
    function closeModal() {
        setState({settingsModalIsOpen: false});
    }

    const modalButtons = [
        {title: "Change password", function: () => props.handlerSettings("changePassword")},
        {title: "Report", function: () => console.log('report')},
        {title: "Log out", function: () => props.handlerLogOut()},
    ];

    let avatar = user_svg;
    if (props.data.avatar) {
        avatar = props.data.avatar;
    }

    let button = <Button class="edit-button" text="edit profile" onClick={() => props.handlerSettings()}/>;
    if (!props.isHome) {
        button = <Button class="edit-button" text={followButtonText} onClick={() => {
            cfetch('/api/follow', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({id : props.id}),
            }).then(res=> {
                if (res.ok) {
                    res.json().then(data => {
                        setIsFollowing(data.is_following);
                    })
                }
            })
        }}/>
    }

    return (
        <div className="user-header-wrapper row">
            <div className="user-info col">
                <div className="row">
                    <img className="user-header-wrapper__avatar" src={avatar}/>
                    <div className="user-info__name">
                        <div className="row">
                            <p className="user-header-wrapper__user-nickname">{props.data.username}</p>
                            {props.isHome && <Button
                                class="settings-button"
                                img_src={settings_svg}
                                 onClick={() => setState({settingsModalIsOpen: true})}/> }
                            {state.settingsModalIsOpen && <Modal buttons={modalButtons} cancelAction={() => closeModal()}/>}
                        </div>
                        {button}
                    </div>
                </div>
            </div>
            <div className="description-wrapper">
                <div className="col-wrapper col">
                    <div className="user-header-wrapper__description">
                        <div className="user-header-wrapper__description__name">{props.data.name}</div>
                        <div
                            className="user-header-wrapper__description__description">{props.data.description}</div>
                    </div>
                    <div className="user-header-wrapper__counters row">
                        <div className="user-header-wrapper__counters_counter col">
                            <div id="post-counter" className="counter">{props.data.post_count}</div>
                            <div className="counter-description">posts</div>
                        </div>
                        <div className="user-header-wrapper__counters_counter col">
                            <div id="followers-counter" className="counter">{props.data.followers_count}</div>
                            <div className="counter-description">followers</div>
                        </div>
                        <div className="user-header-wrapper__counters_counter col">
                            <div id="following-counter" className="counter">{props.data.following_count}</div>
                            <div className="counter-description">following</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHeader;
