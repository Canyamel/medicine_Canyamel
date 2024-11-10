'use client'

import './style.css';
import { Flex, ConfigProvider } from 'antd';
import Text from '@/components/Universal/Text/Text';
import Spacer from '@/components/Universal/Spacer/Spacer';

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
            <Flex className="page page_auth" justify='space-evenly'>
                <Flex vertical>
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
