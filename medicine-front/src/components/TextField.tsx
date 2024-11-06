"use client"

import { Input, Form } from "antd";
import Password from "antd/es/input/Password";
import { memo, useMemo } from "react";

const { Item } = Form;

interface TextFieldProps {
    errorText:string,
    label:string,
    name:string,
    status?:any,
    isError?:boolean,
    isPassword?:boolean,
    isRequired?:boolean,
    onChange?:any,
    width?:number;
    fontWeight?:number
};

const TextField=({
    label,
    name,
    errorText,
    isError,
    isPassword=false,
    isRequired=true,
    onChange,
    status,
    width,
    fontWeight
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
            style={{fontWeight:`${fontWeight}`}}
            label={label}
            name={name}
            rules={rules}
            onChange={onChange}
        >
            {isPassword? <Password style={{width:`${width}px`}} size="large" status={status} />:<Input size="large" style={{width:`${width}px`}} status={status} />}
        </Item>
    )
};

export default memo(TextField);