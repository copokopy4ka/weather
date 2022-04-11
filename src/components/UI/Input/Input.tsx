import React from "react";
import { IInputProps } from "../../../types/types";

const Input = ({...props}: IInputProps) => {
    return (
        <input {...props}/>
    )
}

export default Input;