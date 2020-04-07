import React from "react";
import "./Button.css";


function Button (props) {
    const [state, setState] = React.useState({
            classes : ["button"],
    });
    let contain;
    if (props.img_src) {
      contain = <img src={props.img_src} alt="button" />;
      if (props.size !== "none") {
          switch (props.size) {
              case 16:
                  state.classes.push("button16");
                  break;
              case 32:
                  state.classes.push("button32");
                  break;
              default:
                state.classes.push("button24");
          }
      }
    } else {
      contain = props.text;
    }
    if (props.class) {
      state.classes.push(props.class);
    }

    if (!props.noFilterOnHover) {
        state.classes.push('filtered-on-hover');
    }

    return (
      <div className={state.classes.join(" ")} onClick={(event) => props.onClick(event)}>
        {contain}
      </div>
    );
}

export default Button;
