import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Lenta from "./Components/MainContent/Lenta/Lenta";
import UserHome from "./Components/MainContent/UserHome/UserHome";
import Settings from "./Components/MainContent/Settings/Settings";
import Search from "./Components/MainContent/Search/Search";
import LogIn from "./Components/LogIn/LogIn";
import cfetch from "./Components/CsrfToken/cfetch";
import AddButton from "./Components/AddPost/AddButton/AddButton";
import user_svg from './imgs/user.svg'


function App() {
    const [state, setState] = React.useState({
        content: <Lenta/>,
        type: "home",
        isAuthorized: false,
    });

    const [avatar, setAvatar] = React.useState({
        src: null,
        changed: false,
    });

    const [userData, setUserData] = React.useState();

    async function fetchUrl(url) {
        const response = await fetch(url);
        const json = await response.json();
        setUserData(json);
        setAvatar({src: json.avatar ? json.avatar : user_svg})
    }

    React.useEffect(() => {
        fetchUrl('api/user_home');
    }, []);

    function handlerSearch(someData) {
        setState({
            content: <Search data={someData}/>
        })
    }

    function handlerBrowse() {
        setState({
            content: <Search/>,
            type: "search"
        })
    }

    function handlerSettings(type) {
        setState({
            content: <Settings avatar={avatar} avatarHandler={(src, changed) => setAvatar({src: src, changed: changed})}
                               type={type}/>,
            type: "settings",
        })
    }

    function handlerHome() {
        setState({
            content: <Lenta/>,
            type: "home",
        });
    }

    function handlerLogOut() {
        localStorage.setItem("authorized", "0");
        cfetch('api/log_out', {
            method: 'POST',
        }).then(response => {
            if (response.ok) {
                setState({
                    content: <LogIn handlerAuthorize={handlerAuthorize}/>
                });
            }
        });
    }

    function getState() {
        return (state)
    }

    function handlerAuthorize() {
        setState({
            content: <Lenta/>,
            type: "home"
        });
        fetchUrl('api/user_home');
        localStorage.setItem("authorized", "1");
        handlerHome();
    }

    function handlerUser() {
        fetch('api/user_home').then(res => res.json()).then(res => {
            setState({
                content: <UserHome avatar={avatar} isHome={true} data={res} handlerLogOut={handlerLogOut}
                                   handlerSettings={handlerSettings}/>,
                type: "userhome"
            })
        })
    }

    function handlerGetUser(username) {
        fetch('api/user?username=' + username).then(res => res.json()).then(res => {
            setState({
                content: <UserHome isHome={false} data={res} handlerLogOut={handlerLogOut}
                                   handlerSettings={handlerSettings}/>,
                type: "getuser",
            })
        })
    }


    let header;
    if (localStorage.getItem("authorized") === "1") {
        header = <Header
            avatar={avatar}
            searchAction={handlerSearch}
            homeAction={handlerHome}
            browseAction={handlerBrowse}
            userAction={handlerUser}
        />
    } else {
        localStorage.setItem("authorized", "0");
        state.content = <LogIn handlerAuthorize={handlerAuthorize}/>;
    }

    let addbutton;
    if (localStorage.getItem("authorized") === "1" && (
        state.type === "home" ||
        state.type === "userhome" ||
        state.type === "search"
    )) {
        addbutton = <AddButton getState={getState}/>
    }

    return (
        <div>
            {header}
            <main className="container">
                {state.content}
            </main>
            {addbutton}
        </div>
    );
}

export default App;
