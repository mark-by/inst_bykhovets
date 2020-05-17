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
import Cookies from 'js-cookie';


function App() {

    let lenta = <Lenta handlerGetUser={handlerGetUser}/>

    const [state, setState] = React.useState({
        content: lenta,
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
        if (!response.ok) {
            setState({
                content: <LogIn handlerAuthorize={handlerAuthorize}/>,
                type: "login"
            });
        }
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
            content: lenta,
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
                    content: <LogIn handlerAuthorize={handlerAuthorize}/>,
                    type: "login"
                });
            }
        });
    }

    function getState() {
        return (state)
    }

    function handlerAuthorize() {
        setState({
            content: lenta,
            type: "home"
        });
        fetchUrl('api/user_home');
        localStorage.setItem("authorized", "1");
        handlerHome();
        j
    }

    function handlerUser() {
        fetch('api/user_home').then(res => res.json()).then(res => {
            setState({
                content: <UserHome isHome={true} data={res} handlerLogOut={handlerLogOut}
                                   handlerSettings={handlerSettings}/>,
                type: "userhome"
            })
        })
    }

    function handlerGetUser(userId) {
        fetch('api/user_home?id=' + userId).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(res => {
            setState({
                content: <UserHome isHome={false} data={res} id={userId}/>,
                type: "getuser",
            })
        })
    }

    let header;
    if (Cookies.get("authorized") === "1") {
        header = <Header
            avatar={avatar}
            searchAction={handlerSearch}
            homeAction={handlerHome}
            browseAction={handlerBrowse}
            userAction={handlerUser}
        />
    } else {
        state.content = <LogIn handlerAuthorize={handlerAuthorize}/>;
    }

    let addbutton;
    if (Cookies.get("authorized") === "1" && (
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
