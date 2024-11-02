"use client"
import { Flex, Form, Typography } from "antd";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { useCallback, useState } from "react";
import Spacer from "@/components/Spacer";

export default function Auth() {

    const { Text, Link } = Typography;

    const onFinish = useCallback((values: string[])=>{
        console.log(values);

    },[]);

    const [inputEmail, setInputEmail] = useState<string>("");

    const [inputPassword, setInputPassword] = useState<string>("");

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(event.target.value);
        console.log("inputEmail:", event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(event.target.value);
        console.log("inputPassword:", event.target.value);
    };

    return(
        <Flex style={{marginTop:"100px"}} justify="space-evenly">
            <Flex justify="center" vertical>
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

            <Form onFinish={onFinish} layout="vertical">
                <Flex vertical>
                    <Text
                        style={{
                            width: "100%",
                            color: "#222831",
                            fontSize: "35px", fontWeight: "bold"
                        }}>
                        Войти
                    </Text>

                    <TextField
                        errorText="Введите электронную почту пользователя!"
                        name="email"
                        label="Электронная почта"
                        onChange={handleChangeEmail}
                    />

                    <TextField
                        errorText="Введите пароль пользователя!"
                        name="password"
                        label="Пароль"
                        onChange={handleChangePassword}
                        isPassword
                    />

                    <Button
                        type="primary"
                        htmlType="submit"
                        title='Войти'
                        disabled={!(inputEmail && inputPassword)}
                    />

                    <Text
                        strong
                        style={{
                            fontSize: "16px",
                            marginTop: "10px"
                        }}>
                        У вас нет аккаунта?
                        <Link
                            href="/login/register"
                            style={{
                                fontSize: "16px",
                                color: "#0047E0",
                                marginLeft: "5px"
                        }}>
                            Зарегистрироваться
                        </Link>
                    </Text>
                </Flex>
            </Form>
        </Flex>
    )
}