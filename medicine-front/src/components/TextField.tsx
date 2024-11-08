"use client"

import { Input, Form } from "antd";

const { Item } = Form;
const { Password } = Input;

interface TextFieldProps {
    name:string,
    status?:any,
    label:string,
    type?: 'string' | 'number' | 'email',
    errorText:string,
    isError?:boolean,
    isPassword?:boolean,
    isRequired?:boolean,
    onChange?:any,
    condition?:(value: any) => boolean,
    fontWeight?:number,
};

const TextField=({
    name,
    status,
    label,
    type='string',
    errorText,
    isError,
    isPassword=false,
    isRequired=true,
    onChange,
    condition,
    fontWeight
    }:TextFieldProps) => {
    return(
        <Item
            style={{fontWeight:`${fontWeight}`, marginBottom: isError ? 25 : 5}}
            label={label}
            name={name}
            rules={[
                {
                    type: type,
                    required: isRequired,
                    message: errorText,
                    ...(condition && {
                        validator(_: any, value: any) {
                            if (!value)
                                return Promise.resolve();
                            if (!condition(value))
                                return Promise.reject(errorText);
                            return Promise.resolve();
                        },
                    }),
                },
            ]}
        >
            {isPassword?
                <Password size="large" status={status} onChange={onChange} />
                :
                <Input size="large" status={status} onChange={onChange} />
            }
        </Item>
    )
};

export default TextField;