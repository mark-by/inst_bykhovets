import React from "react";
import "./SearchForm.css"
import search_svg from "../../../imgs/search.svg"

function SearchForm (props) {

    function search(event) {
        event.preventDefault();
        const input = document.querySelector(".search-input");
        if (input.value) {
            props.searchAction(input.value);
            input.value = '';
        }
    }
    
    return (
      <form className="search-form" onSubmit={(event)=>search(event)}>
        <input className="search-input" type="text" placeholder="search"/>
        <button type="submit"><img src={search_svg} alt={"search_button"}/></button>
      </form>
    );
}

export default SearchForm;
