"use client"
import { Flex, Form, Typography } from "antd";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { useCallback, useMemo, useState } from "react";
import Spacer from "@/components/Spacer";

export default function Auth() {
    const onFinish = useCallback((values: string[])=>{
        console.log(values);
    },[]);

    const { Text, Link } = Typography;

    //const emailErrorText = useMemo(() => {
    //    if(isRegisterError) {
    //        return "Этот Email уже зарегистрирован";
    //    } else {
    //        return "Введите Вашу электронную почту";
    //    }
    //},[isRegisterError]);

    const [form] = Form.useForm<{ email:string }>();
    //const email = Form.useWatch("email", form);
    //useEffect(()=>alert(email), [email]);

    const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

    const [inputSurname, setInputSurname] = useState<string>("");
    const [inputName, setInputName] = useState<string>("");
    const [inputPatr, setInputPatr] = useState<string>("");
    const [inputOrg, setInputOrg] = useState<string>("");
    const [inputEmail, setInputEmail] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputRepPassword, setInputRepPassword] = useState<string>("");

    const handleChangeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputSurname(event.target.value);
        console.log("inputSurname:", event.target.value);
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
        console.log("inputName:", event.target.value);
    };

    const handleChangePatr = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPatr(event.target.value);
        console.log("inputPatr", event.target.value);
    };

    const handleChangeOrg = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputOrg(event.target.value);
        console.log("inputOrg", event.target.value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(event.target.value);
        console.log("inputEmail:", event.target.value);

        const hasEmailPattern = /^[^\s@]+@[a-zа-я]{2,}\.[a-zа-я]{2,}$/.test(event.target.value);
        setIsValidEmail(hasEmailPattern);
        console.log("isValidEmail:", hasEmailPattern);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(event.target.value);
        console.log("inputPassword:", event.target.value);

        const hasMinLength = event.target.value.length >= 8;
        const hasUpperLetter = /[A-ZА-Я]/.test(event.target.value);
        const hasLowerLetter = /[a-zа-я]/.test(event.target.value);
        const hasSpecialCharacter = /[#!\$%&^*_+\|=?,\.\/\\]/.test(event.target.value);

        setIsValidPassword(hasMinLength && hasUpperLetter && hasLowerLetter && hasSpecialCharacter);
        console.log("isValidPassword:",
            hasMinLength && hasUpperLetter && hasLowerLetter && hasSpecialCharacter
        );
    };

    const handleChangeRepPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputRepPassword(event.target.value);
        console.log("inputRepPassword:", event.target.value);
    };

    return(
        <Flex style={{marginTop:"50px"}} justify="space-evenly">
            <Flex style={{marginTop:"130px"}} vertical>
                <Text
                    style={{
                        lineHeight: 1,
                        color: "#222831",
                        fontSize: "55px", fontWeight: "bold"
                }}>
                    Виртуальный<br/>ассистент
                </Text>

                <Text
                    style={{
                        lineHeight: 1.5,
                        color: "#818181",
                        fontSize: "20px",
                        marginTop:"20px",
                }}>
                    Слепая диагностика узловых образований<br/>щитовидной железы
                </Text>
            </Flex>

            <Form onFinish={onFinish} layout="vertical" wrapperCol={{ span: 25 }} form={form}>
                <Flex vertical>
                    <Text
                        style={{
                            width: "100%",
                            color: "#222831",
                            fontSize: "35px", fontWeight: "bold"
                        }}>
                        Зарегистрироваться
                    </Text>

                    <TextField
                        errorText="Введите вашу фамилию"
                        name="surname"
                        label="Фамилия"
                        onChange={handleChangeSurname}
                    />

                    <TextField
                        errorText="Введите Ваше имя"
                        name="name"
                        label="Имя"
                        onChange={handleChangeName}
                    />

                    <TextField
                        errorText="Введите Ваше отчество"
                        name="patronymic"
                        label="Отчество"
                        onChange={handleChangePatr}
                    />

                    <TextField
                        errorText="Введите название медицинской организации, в которой Вы работаете"
                        name="organisation"
                        label="Мед. организация"
                        onChange={handleChangeOrg}
                    />

                    <TextField
                        errorText="Введите почту"
                        name="email"
                        label="Электронная почта"
                        //isError={isRegisterError}
                        onChange={handleChangeEmail}
                        status={isValidEmail ? "" : "error"}
                    />

                    <TextField
                        errorText="Ввведите пароль"
                        name="password"
                        label="Пароль"
                        isPassword
                        //isError={isRegisterError}
                        onChange={handleChangePassword}
                        status={isValidPassword ? "" : "error"}
                    />
                    <Text
                        style={{
                            display: isValidPassword ? 'none' : 'block'
                        }}>
                        Пароль должен содержать:<br/>
                        - Заглавную букву<br/>
                        - Строчную букву<br/>
                        - Cпециальный символ (- # ! $ % ^ & * _ + | = ? , . / \)<br/>
                        - Минимум 8 знаков
                    </Text>

                    <TextField
                        errorText="Повторите пароль"
                        name="repeatPassword"
                        label="Повторите пароль"
                        isPassword
                        onChange={handleChangeRepPassword}
                        status={inputPassword === inputRepPassword && inputRepPassword != "" ? "" : "error"}
                    />

                    <Button
                        type="primary"
                        htmlType="submit"
                        title="Создать аккаунт"
                        disabled={!(inputSurname && inputName && inputPatr && inputOrg && inputEmail &&
                        inputPassword && inputRepPassword && isValidPassword && isValidEmail) || inputPassword != inputRepPassword}
                    />

                    <Text
                        strong
                        style={{
                            fontSize: "16px",
                            marginTop: "10px"}}>
                        Уже есть аккаунт?
                        <Link
                            style={{
                                fontSize: "16px",
                                color: "#0047E0",
                                marginLeft: "5px"}}
                            href="/login/auth">
                                Войти
                        </Link>
                    </Text>
                </Flex>
            </Form>
        </Flex>
    );
}