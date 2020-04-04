import React from "react";
import "./Header.css";
import Button from "../Button/Button";
import SearchForm from "./SearchForm/SearchForm";
import home_svg from "../../imgs/home.svg";
import browse_svg from "../../imgs/browse.svg";
import heart_svg from "../../imgs/heart.svg";
import user_svg from "../../imgs/user.svg";
import Events from "./Events/Events"

function Header(props) {
    const [state, setState] = React.useState({
        eventsIsOpen: false,
    });

    function closeEvents() {
        setState({eventsIsOpen: false});
    }
    return (
        <header>
            <div className="container">
                <div className="header__logo" onClick={() => props.homeAction()}>Techno<span>Inst</span></div>

                <SearchForm searchAction={props.searchAction}/>

                <div className="header__button-wrapper">
                    <Button img_src={home_svg} onClick={() => props.homeAction()}/>
                    <Button img_src={browse_svg} onClick={() => props.browseAction()}/>
                    <Button img_src={heart_svg} onClick={() => setState({eventsIsOpen: !state.eventsIsOpen})}/>
                    <Button img_src={user_svg} onClick={() => props.userAction()}/>
                </div>
                {(state.eventsIsOpen) && <Events closeEvents={closeEvents}/>}
            </div>
        </header>
    );
}

export default Header;