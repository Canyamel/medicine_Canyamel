'use client'

import { useCallback, useState, useEffect } from 'react';
import { Flex, Form, Space } from 'antd';
import Link from "next/link";
import TextField from '@/components/Universal/TextField/TextField';
import Text from '@/components/Universal/Text/Text';
import Button from '@/components/Universal/Button/Button';
import Spacer from '@/components/Universal/Spacer/Spacer';

const { useForm, useWatch } = Form;

export default function Login() {

    const onFinish = useCallback((values: string[]) => {
        console.log(values);
    }, []);

    const [form] = useForm();

    const watchedEmail = useWatch('email', form);
    const watchedPassword = useWatch('password', form);

    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    useEffect(() => {
        setIsValidEmail(/^[^\s@]+@[a-zа-я]{2,}\.[a-zа-я]{2,}$/.test(watchedEmail))
    },[watchedEmail]);

    const isValidForm = isValidEmail && watchedPassword;

    return(
        <>
            <Form className="container" style={{fontWeight:700}} onFinish={onFinish} layout='vertical' form={form} >
                <Flex vertical>
                    <Text className="title_auth">
                        Войти
                    </Text>

                    <Spacer space={5}/>

                    <TextField
                        errorText='Введите электронную почту пользователя!'
                        name='email'
                        type='email'
                        label='Электронная почта'
                    />

                    <TextField
                        errorText='Введите пароль пользователя!'
                        name='password'
                        label='Пароль'
                        isPassword
                    />

                    <Spacer space={10}/>

                    <Button
                        title='Войти'
                        type='primary'
                        htmlType='submit'
                        size='large'
                        disabled={!isValidForm}
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
    );
};