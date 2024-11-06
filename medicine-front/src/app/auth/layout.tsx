'use client'

import './style.css';
import { Flex, ConfigProvider } from 'antd';
import Spacer from '@/components/Spacer';
import Text from "@/components/Text";

export default function AuthLayout({ children }: React.PropsWithChildren) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#0047e0",
                    colorPrimaryActive: "#0236a5",
                    colorPrimaryHover: "#3867df",
                    controlHeightLG: 50
                }
        }}>
            <Flex className="page" justify='space-evenly'>
                <Flex vertical>
                    <Spacer space={130}/>
                    <Text className="title_first">
                        Виртуальный<br/>ассистент
                    </Text>
                    <Spacer space={20}/>
                    <Text className="title_second">
                        Слепая диагностика узловых образований<br/>щитовидной железы
                    </Text>
                </Flex>
                {children}
            </Flex>
        </ConfigProvider>
    );
}
