import React from "react";
import "./UserHeader.css"
import Button from "../../../Button/Button";
import Modal from "../../../Modal/Modal";
import settings_svg from "../../../../imgs/settings.svg";

function UserHeader(props) {
    const [state, setState] = React.useState({
        settingsModalIsOpen: false,
    });

    function closeModal() {
        setState({settingsModalIsOpen: false});
    }

    const modalButtons = [
        {title: "Change password", function: () => props.handlerSettings("changePassword")},
        {title: "Report", function: () => console.log('report')},
        {title: "Log out", function: () => props.handlerLogOut()},
    ];

    return (
        <div className="user-header-wrapper row">
            <div className="user-info col">
                <div className="row">
                    <div className="user-header-wrapper__avatar"
                         style={{backgroundImage: "url(" + props.data.userAvatarSrc + ")"}}/>
                    <div className="user-info__name">
                        <div className="row">
                            <p className="user-header-wrapper__user-nickname">{props.data.userNickName}</p>
                            <Button
                                class="settings-button"
                                img_src={settings_svg}
                                 onClick={() => setState({settingsModalIsOpen: true})}/>
                            {state.settingsModalIsOpen && <Modal buttons={modalButtons} cancelAction={() => closeModal()}/>}
                        </div>
                        <Button class="edit-button" text="edit profile" onClick={() => props.handlerSettings()}/>
                    </div>
                </div>
            </div>
            <div className="description-wrapper">
                <div className="col-wrapper col">
                    <div className="user-header-wrapper__description">
                        <div className="user-header-wrapper__description__name">{props.data.userName}</div>
                        <div
                            className="user-header-wrapper__description__description">{props.data.userDescription}</div>
                    </div>
                    <div className="user-header-wrapper__counters row">
                        <div className="user-header-wrapper__counters_counter col">
                            <div className="counter">{props.data.postCounter}</div>
                            <div className="counter-description">posts</div>
                        </div>
                        <div className="user-header-wrapper__counters_counter col">
                            <div className="counter">{props.data.followersCounter}</div>
                            <div className="counter-description">followers</div>
                        </div>
                        <div className="user-header-wrapper__counters_counter col">
                            <div className="counter">{props.data.followingCounter}</div>
                            <div className="counter-description">following</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHeader;
