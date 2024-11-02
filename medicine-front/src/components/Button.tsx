"use client"

import { Button } from "antd";

export default function CustomInput({title, htmlType, disabled, type="primary"}:
{
    title:string,
    type:any,
    htmlType:any,
    disabled:boolean
})
{
    return(
        <Button
            style={{height: 50, width: 350}}
            type={type}
            size="large"
            htmlType={htmlType}
            disabled={disabled}
        >
            {title}
        </Button>
    )
}

