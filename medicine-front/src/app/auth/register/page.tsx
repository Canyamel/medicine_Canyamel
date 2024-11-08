'use client'

import { Flex, Form, Space } from 'antd';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Spacer from '@/components/Spacer';

export default function Auth() {
    const fontWeight = 700;

    const [form] = Form.useForm();

    const onFinish = useCallback((values: string[])=>{
        console.log(values);
    },[]);

    const [inputLastName, setInputLastName] = useState<string>('');
    const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLastName(e.target.value);
    };

    const [inputFirstName, setInputFirstName] = useState<string>('');
    const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFirstName(e.target.value);
    };

    const [inputFatherName, setInputFatherName] = useState<string>('');
    const handleChangeFatherName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFatherName(e.target.value);
    };

    const [inputMedOrganization, setInputMedOrganization] = useState<string>('');
    const handleChangeMedOrganization = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMedOrganization(e.target.value);
    };

    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hasEmailPattern = /^[^\s@]+@[a-zа-я]{2,}\.[a-zа-я]{2,}$/;
        setIsValidEmail(hasEmailPattern.test(e.target.value));
    };

    const [inputPassword, setInputPassword] = useState<string>('');
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
    const validatePassword = (password:string) => {
        const hasMinLength = password.length >= 8;
        const hasUpperLetter = /[A-ZА-Я]/.test(password);
        const hasLowerLetter = /[a-zа-я]/.test(password);
        const hasSpecialCharacter = /[#!\$%&^*_+\|=?,\.\/\\]/.test(password);
        return hasMinLength && hasUpperLetter && hasUpperLetter && hasLowerLetter && hasSpecialCharacter;
    };
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value);

        setIsValidPassword(validatePassword(e.target.value));
    };

    const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
    const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputConfirmPassword(e.target.value);
    };

    const isFormValid =
        inputLastName &&
        inputFirstName &&
        inputFatherName &&
        inputMedOrganization &&
        isValidEmail &&
        isValidPassword &&
        inputPassword === inputConfirmPassword;

    return(
        <>
            <Form className="container" onFinish={onFinish} layout='vertical' form={form}>
                <Flex vertical>
                    <Text className="title_auth">
                        Зарегистрироваться
                    </Text>
    
                    <Spacer space={5}/>
    
                    <TextField
                        fontWeight={fontWeight}
                        errorText='Введите вашу фамилию'
                        name='lastName'
                        label='Фамилия'
                        onChange={handleChangeLastName}
                    />
    
                    <TextField
                        fontWeight={fontWeight}
                        errorText='Введите Ваше имя'
                        name='firstName'
                        label='Имя'
                        onChange={handleChangeFirstName}
                    />
    
                    <TextField
                        fontWeight={fontWeight}
                        errorText='Введите Ваше отчество'
                        name='fatherName'
                        label='Отчество'
                        onChange={handleChangeFatherName}
                    />
    
                    <TextField
                        fontWeight={fontWeight}
                        errorText='Введите название медицинской организации, в которой Вы работаете'
                        name='medOrganisation'
                        label='Мед. организация'
                        onChange={handleChangeMedOrganization}
                    />
    
                    <TextField
                        fontWeight={fontWeight}
                        errorText='Введите почту'
                        name='email'
                        type='email'
                        label='Электронная почта'
                        onChange={handleChangeEmail}
                    />
    
                    <TextField
                        fontWeight={fontWeight}
                        errorText='Ввведите надёжный пароль'
                        name='password'
                        label='Пароль'
                        isPassword
                        condition={validatePassword}
                        onChange={handleChangePassword}
                        status={inputPassword === inputConfirmPassword ? '' : 'error'}
                    />
    
                    <Space style={{overflow: 'hidden', height: isValidPassword ? 0 : 115, transition: 'height 0.5s ease-in-out'}}>
                        <Text>
                            Пароль должен содержать:<br/>
                            - Заглавную букву<br/>
                            - Строчную букву<br/>
                            - Cпециальный символ (- # ! $ % ^ & * _ + | = ? , . / \)<br/>
                            - Минимум 8 знаков
                        </Text>
                    </Space>
    
                    <TextField
                        fontWeight={fontWeight}
                        errorText='Повторите пароль'
                        name='confirmPassword'
                        label='Повторите пароль'
                        isPassword
                        condition={validatePassword}
                        onChange={handleChangeConfirmPassword}
                        status={inputPassword === inputConfirmPassword ? '' : 'error'}
                    />
    
                    <Spacer space={10}/>
    
                    <Button
                        title='Создать аккаунт'
                        type='primary'
                        htmlType='submit'
                        size='large'
                        disabled={!isFormValid}
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
}
