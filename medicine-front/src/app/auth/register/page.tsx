'use client'

import { Flex, Form, Space } from 'antd';
import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import TextField from '@/components/Universal/TextField/TextField';
import Text from '@/components/Universal/Text/Text';
import Button from '@/components/Universal/Button/Button';
import Spacer from '@/components/Universal/Spacer/Spacer';

const { useForm, useWatch } = Form;

export default function Register() {
    const onFinish = useCallback((values: string[])=>{
        console.log(values);
    },[]);

    const [form] = useForm();

    const validatePassword = (password:string) => {
        const hasMinLength = password.length >= 8;
        const hasUpperLetter = /[A-ZА-Я]/.test(password);
        const hasLowerLetter = /[a-zа-я]/.test(password);
        const hasSpecialCharacter = /[#!\$%&^*_+\|=?,\.\/\\]/.test(password);
        return hasMinLength && hasUpperLetter && hasUpperLetter && hasLowerLetter && hasSpecialCharacter;
    };

    const watchedLastName = useWatch('lastName', form);
    const watchedFirstName = useWatch('firsName', form);
    const watchedFatherName = useWatch('fatherName', form);
    const watchedMedOrganisation = useWatch('medOrganisation', form);
    const watchedEmail = useWatch('email', form);
    const watchedPassword = useWatch('password', form);
    const watchedConfirmPassword = useWatch('confirmPassword', form);

    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

    useEffect(() => {
        setIsValidEmail(/^[^\s@]+@[a-zа-я]{2,}\.[a-zа-я]{2,}$/.test(watchedEmail))
    },[watchedEmail]);

    useEffect(() => {
        console.log(typeof watchedPassword)
        if (typeof watchedPassword === 'string')
            setIsValidPassword(validatePassword(watchedPassword))
    },[watchedPassword]);

    const [isVisibleSupportTextPassword, setIsVisibleSupportTextPassword] = useState<boolean>(false)

    const handleInputFocus = () => {
        setIsVisibleSupportTextPassword(true);
    };

    const handleInputBlur = () => {
        setIsVisibleSupportTextPassword(false);
    };

    const isValidForm =
        watchedLastName != '' &&
        watchedFirstName != '' &&
        watchedFatherName != '' &&
        watchedMedOrganisation != '' &&
        isValidEmail &&
        isValidPassword &&
        watchedPassword === watchedConfirmPassword;

    return(
        <>
            <Form className="container" style={{fontWeight:700}} onFinish={onFinish} layout='vertical' form={form}>
                <Flex vertical>
                    <Text className="title_auth">
                        Зарегистрироваться
                    </Text>

                    <Spacer space={5}/>

                    <TextField
                        errorText='Введите вашу фамилию'
                        name='lastName'
                        label='Фамилия'
                    />

                    <TextField
                        errorText='Введите Ваше имя'
                        name='firstName'
                        label='Имя'
                    />

                    <TextField
                        errorText='Введите Ваше отчество'
                        name='fatherName'
                        label='Отчество'
                    />

                    <TextField
                        errorText='Введите название медицинской организации, в которой Вы работаете'
                        name='medOrganisation'
                        label='Мед. организация'
                    />

                    <TextField
                        errorText='Введите почту'
                        name='email'
                        type='email'
                        label='Электронная почта'
                    />

                    <TextField
                        errorText='Ввведите надёжный пароль'
                        name='password'
                        label='Пароль'
                        isPassword
                        condition={validatePassword}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />

                    <Space style={{overflow: 'hidden', height: isVisibleSupportTextPassword ? 115 : 0, transition: 'height 0.5s ease-in-out'}}>
                        <Text className="condition_password">
                            Пароль должен содержать:<br/>
                            - Заглавную букву<br/>
                            - Строчную букву<br/>
                            - Cпециальный символ (- # ! $ % ^ & * _ + | = ? , . / \)<br/>
                            - Минимум 8 знаков
                        </Text>
                    </Space>

                    <TextField
                        errorText='Повторите пароль'
                        name='confirmPassword'
                        label='Повторите пароль'
                        isPassword
                        condition={validatePassword}
                        status={watchedPassword === watchedConfirmPassword ? '' : 'error'}
                    />

                    <Spacer space={10}/>

                    <Button
                        title='Создать аккаунт'
                        type='primary'
                        htmlType='submit'
                        size='large'
                        disabled={!isValidForm}
                    />

                    <Spacer space={10}/>

                    <Space>
                        <Text className="text_strong">
                            Уже есть аккаунт?
                        </Text>

                        <Link href='/auth/login' className="link_strong">
                            Войти
                        </Link>
                    </Space>
                </Flex>
            </Form>
        </>
    );
};