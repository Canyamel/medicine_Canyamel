"use client"

import { Button } from "antd";

export default function FormButton({title, type='primary', size='large', htmlType, disabled, width}:{
    title:string;
    type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
    size?: 'large' | 'middle' | 'small';
    htmlType?:any;
    disabled?:boolean;
    width?:number;
}){
    return(
        <Button
            style={{width:`${width}px`}}
            size={size}
            type={type}
            htmlType={htmlType}
            disabled={disabled}
        >
            {title}
        </Button>
    )
}