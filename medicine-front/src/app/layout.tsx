import type { Metadata } from "next";
import "./reset.css";
import "../styles/global.css";

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { ConfigProvider } from 'antd';

export const metadata: Metadata = {
    title: "Виртуальный ассистент",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="ru">
            <body>
                <AntdRegistry>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#0047E0",
                                colorPrimaryActive: "#0236A5",
                                colorPrimaryHover: "#2E64EA"
                            }
                    }}>
                        {children}
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
