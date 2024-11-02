"use client"

import { Input, Form } from "antd";
import Password from "antd/es/input/Password";
import { memo, useMemo } from "react";

const { Item } = Form;

interface TextFieldProps {
    isError?:boolean,
    isPassword?:boolean,
    isRequired?:boolean,
    errorText:string,
    label:string,
    name:string,
    onChange?:any,
    status?:any
}

const TextField=({
    isError,
    errorText,
    isPassword=false,
    isRequired=true,
    label,
    name,
    onChange,
    status
    }:TextFieldProps) => {

    const { rules } = useMemo(() => ({
            rules: [{
                required: isRequired,
                message: errorText,
                type: 'string',
                validator: (_:void, value:string) => isError || (isRequired && !value) ?
                    Promise.reject(new Error(errorText)) :
                    Promise.resolve()
            }]

        }),[isError, errorText, isRequired])

    return(
        <Item
            style={{fontWeight:"700"}}
            label={label}
            name={name}
            rules={rules}
            onChange={onChange}
        >
            {isPassword? <Password style={{height: 50, width: 350}} size="large" status={status} />:<Input style={{height: 50, width: 350}} size="large" status={status} />}
        </Item>
    )
}

export default memo(TextField);

