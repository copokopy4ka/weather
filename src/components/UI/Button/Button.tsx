import React from "react";
import { IButtonProps } from "../../../types/types";

const Button = ({children, ...props}: IButtonProps) => {
    return(
        <button {...props}>
            {children}
        </button>
    )
}

export default Button;