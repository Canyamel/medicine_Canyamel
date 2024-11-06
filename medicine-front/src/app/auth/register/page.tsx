'use client'

import { Flex, Form, Space, Tooltip } from 'antd';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Spacer from '@/components/Spacer';

export default function Auth() {
    const onFinish = useCallback((values: string[])=>{
        console.log(values);
    },[]);

    const [form] = Form.useForm();

    const [inputLastName, setInputLastName] = useState<string>('');
    const [inputFirstName, setInputFirstName] = useState<string>('');
    const [inputFatherName, setInputFatherName] = useState<string>('');

    const [inputEmail, setInputEmail] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

    const [inputMedOrganization, setInputMedOrganization] = useState<string>('');

    const [inputPassword, setInputPassword] = useState<string>('');
    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
    const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');


    const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLastName(e.target.value);
    };

    const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFirstName(e.target.value);
    };

    const handleChangeFatherName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFatherName(e.target.value);
    };

    const handleChangeMedOrganization = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMedOrganization(e.target.value);
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(e.target.value);

        const hasEmailPattern = /^[^\s@]+@[a-zа-я]{2,}\.[a-zа-я]{2,}$/.test(e.target.value);
        setIsValidEmail(hasEmailPattern);
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value);

        const hasMinLength = e.target.value.length >= 8;
        const hasUpperLetter = /[A-ZА-Я]/.test(e.target.value);
        const hasLowerLetter = /[a-zа-я]/.test(e.target.value);
        const hasSpecialCharacter = /[#!\$%&^*_+\|=?,\.\/\\]/.test(e.target.value);

        setIsValidPassword(hasMinLength && hasUpperLetter && hasLowerLetter && hasSpecialCharacter);
    };

    const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputConfirmPassword(e.target.value);
    };

    const isFormValid =
        inputLastName &&
        inputFirstName &&
        inputFatherName &&
        inputMedOrganization &&
        inputEmail &&
        isValidEmail &&
        inputPassword &&
        isValidPassword &&
        inputConfirmPassword &&
        inputPassword === inputConfirmPassword;

    return(
        <Form onFinish={onFinish} layout='vertical' form={form}>
            <Flex vertical>
                <Text className="title_auth">
                    Зарегистрироваться
                </Text>

                <TextField
                    fontWeight={700}
                    errorText='Введите вашу фамилию'
                    name='lastName'
                    label='Фамилия'
                    onChange={handleChangeLastName}
                />

                <TextField
                    fontWeight={700}
                    errorText='Введите Ваше имя'
                    name='firstName'
                    label='Имя'
                    onChange={handleChangeFirstName}
                />

                <TextField
                    fontWeight={700}
                    errorText='Введите Ваше отчество'
                    name='fatherName'
                    label='Отчество'
                    onChange={handleChangeFatherName}
                />

                <TextField
                    fontWeight={700}
                    errorText='Введите название медицинской организации, в которой Вы работаете'
                    name='medOrganisation'
                    label='Мед. организация'
                    onChange={handleChangeMedOrganization}
                />

                <TextField
                    fontWeight={700}
                    errorText='Введите почту'
                    name='email'
                    label='Электронная почта'
                    onChange={handleChangeEmail}
                    status={isValidEmail ? '' : 'error'}
                />

                <Tooltip
                    placement='left'
                    open={!isValidPassword}
                    title={
                        <Text>
                            Пароль должен содержать:<br/>
                            - Заглавную букву<br/>
                            - Строчную букву<br/>
                            - Cпециальный символ (- # ! $ % ^ & * _ + | = ? , . / \)<br/>
                            - Минимум 8 знаков
                        </Text>
                }>
                    <Space>
                        <TextField
                            fontWeight={700}
                            width={350}
                            errorText='Ввведите пароль'
                            name='password'
                            label='Пароль'
                            isPassword
                            onChange={handleChangePassword}
                            status={isValidPassword ? '' : 'error'}
                        />
                    </Space>
                </Tooltip>

                <TextField
                    fontWeight={700}
                    errorText='Повторите пароль'
                    name='confirmPassword'
                    label='Повторите пароль'
                    isPassword
                    onChange={handleChangeConfirmPassword}
                    status={inputPassword === inputConfirmPassword && inputConfirmPassword != '' ? '' : 'error'}
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
    );
}