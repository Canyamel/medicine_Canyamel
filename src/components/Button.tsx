"use client"

import { Button, ConfigProvider } from "antd";

export default function CustomInput({title, htmlType, type, disabled}: {
        title:string;
        type:any;
        htmlType:any;
        disabled:boolean;
    }) {

    return(
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#0047E0",
                    colorPrimaryActive: "#0236A5",
                    colorPrimaryHover: "#2E64EA"
                }
            }}>
            <Button
                style={{height: 50, width: 350}}
                size="large"
                type={type}
                htmlType={htmlType}
                disabled={disabled}
                >
                {title}
            </Button>
        </ConfigProvider>
    )
}
