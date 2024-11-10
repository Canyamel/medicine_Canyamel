'use client'

import { useCallback, useState } from 'react';
import { Flex, Form, Space } from 'antd';
import Link from "next/link";
import TextField from '@/components/Universal/TextField/TextField';
import Text from '@/components/Universal/Text/Text';
import Button from '@/components/Universal/Button/Button';
import Spacer from '@/components/Universal/Spacer/Spacer';

export default function Auth() {
    const fontWeight = 700;

    const onFinish = useCallback((values: string[]) => {
        console.log(values);
    }, []);

    const [form] = Form.useForm();

    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hasEmailPattern = /^[^\s@]+@[a-zа-я]{2,}\.[a-zа-я]{2,}$/;
        setIsValidEmail(hasEmailPattern.test(e.target.value));
    };

    const [inputPassword, setInputPassword] = useState<string>('');
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value);
    };

    const isFormValid =
        isValidEmail &&
        inputPassword;

    return(
        <>
            <Form className="container" onFinish={onFinish} layout='vertical' form={form}>
                <Flex vertical>
                    <Text className="title_auth">
                        Войти
                    </Text>

                    <Spacer space={5}/>

                    <TextField
                        fontWeight={fontWeight}
                        errorText='Введите электронную почту пользователя!'
                        name='email'
                        type='email'
                        label='Электронная почта'
                        onChange={handleChangeEmail}
                    />

                    <TextField
                        fontWeight={fontWeight}
                        errorText='Введите пароль пользователя!'
                        name='password'
                        label='Пароль'
                        onChange={handleChangePassword}
                        isPassword
                    />

                    <Spacer space={10}/>

                    <Button
                        title='Войти'
                        type='primary'
                        htmlType='submit'
                        size='large'
                        disabled={!isFormValid}
                    />

                    <Spacer space={10}/>

                    <Space>
                        <Text className="text_strong">
                            У вас нет аккаунта?
                        </Text>

                        <Link href='/auth/register' className="link_strong">
                            Зарегистрироваться
                        </Link>
                    </Space>
                </Flex>
            </Form>
        </>
    )
}