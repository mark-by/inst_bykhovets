import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Lenta from "./Components/MainContent/Lenta/Lenta";
import UserHome from "./Components/MainContent/UserHome/UserHome";
import Settings from "./Components/MainContent/Settings/Settings";
import Search from "./Components/MainContent/Search/Search";
import LogIn from "./Components/LogIn/LogIn";


function App() {
    const [state, setState] = React.useState({
        content: <Lenta/>,
        isAuthorized: false,
    });

    function handlerSearch(someData) {
        setState({
            content: <Search data={someData}/>
        })
    }

    function handlerBrowse() {
        setState({
            content: <Search/>
        })
    }

    function handlerSettings(type) {
        setState({
            content: <Settings type={type}/>
        })
    }

    function handlerHome() {
        setState({
            content: <Lenta/>
        });
    }

    function handlerLogOut() {
        localStorage.setItem("authorized", "0");
        setState({
            content: <LogIn handlerAuthorize={handlerAuthorize}/>
        });
    }

    function handlerAuthorize() {
        setState({
            content: <Lenta/>,
        });
        localStorage.setItem("authorized", "1");
        handlerHome();
    }

    function handlerUser() {
        setState({
            content: <UserHome handlerLogOut={handlerLogOut} handlerSettings={handlerSettings}/>
        })
    }

    let header;
    if (localStorage.getItem("authorized") === "1") {
        header = <Header
            searchAction={handlerSearch}
            homeAction={handlerHome}
            browseAction={handlerBrowse}
            userAction={handlerUser}
        />
    } else {
        localStorage.setItem("authorized", "0");
        state.content =  <LogIn handlerAuthorize={handlerAuthorize}/>;
    }

    return (
        <div>
            {header}
            <main className="container">
                {state.content}
            </main>
        </div>
    );
}

export default App;
