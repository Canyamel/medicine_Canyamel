'use client'

import './style.css';
import { useCallback, useState, useEffect } from 'react';
import { Flex, Form, Input, Space, Descriptions, Badge, ConfigProvider, Select, Tag } from 'antd';
import type { DescriptionsProps } from 'antd';
import TextField from '@/components/Universal/TextField/TextField';
import Text from '@/components/Universal/Text/Text';
import Button from '@/components/Universal/Button/Button';
import Spacer from '@/components/Universal/Spacer/Spacer';

const { useForm, Item, useWatch } = Form;
const { TextArea } = Input;
const { Option } = Select;

interface Specialist {
    id: number;
    lastName: string;
    firstName: string;
    fatherName: string;
    medOrganisation: string;
}

const fullName = 'Алексеев Алексей Алексеевич';
const birthDate = '01.01.2000';
const policy = '1234512456123451';
const status = true;
const email = 'example@mail.ru';
const diagnosis = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere est, autem inventore accusantium voluptates, laborum libero atque distinctio magnam a ullam nesciunt hic veritatis quis alias. Facilis odio quis natus.';

const specialistList: Specialist[] = [
    { id: 1, lastName: 'Иванов', firstName: 'Иван', fatherName: 'Иванович', medOrganisation: 'Больница №1' },
    { id: 2, lastName: 'Петрова', firstName: 'Анна', fatherName: 'Сергеевна', medOrganisation: 'Клиника "Здоровье"' },
    { id: 3, lastName: 'Сидоров', firstName: 'Петр', fatherName: 'Алексеевич', medOrganisation: 'Медицинский центр "Вита"' },
    { id: 4, lastName: 'Иванов', firstName: 'Иван', fatherName: 'Иванович', medOrganisation: 'Больница №1' },
    { id: 5, lastName: 'Алексеевна', firstName: 'Анна', fatherName: 'Сергеевна', medOrganisation: 'Клиника "Здоровье"' },
    { id: 6, lastName: 'Сидоров', firstName: 'Петр', fatherName: 'Алексеевич', medOrganisation: 'Медицинский центр "Вита"' },
    { id: 7, lastName: 'Иванов', firstName: 'Иван', fatherName: 'Иванович', medOrganisation: 'Больница №1' },
    { id: 8, lastName: 'Петрова', firstName: 'Анна', fatherName: 'Сергеевна', medOrganisation: 'Клиника "Здоровье"' },
    { id: 9, lastName: 'Сидоров', firstName: 'Петр', fatherName: 'Алексеевич', medOrganisation: 'Медицинский центр "Вита"' },
    { id: 10, lastName: 'Иванов', firstName: 'Иван', fatherName: 'Иванович', medOrganisation: 'Больница №1' },
    { id: 11, lastName: 'Петрова', firstName: 'Анна', fatherName: 'Сергеевна', medOrganisation: 'Клиника "Здоровье"' },
    { id: 12, lastName: 'Сидоров', firstName: 'Петр', fatherName: 'Алексеевич', medOrganisation: 'Медицинский центр "Вита"' }
];

const formatTag = (id: number): string => {
    const specialist = specialistList.find((s) => s.id === id);
    if (specialist) {
        return `${specialist.lastName} ${specialist.firstName.charAt(0)}.${specialist.fatherName.charAt(0)}.`
    }
    return '';
};

const options = specialistList.map((specialist) => ({
    value: specialist.id,
    label: (
        <Space direction="vertical">
            <Text className="title_fio">{specialist.lastName + specialist.firstName + specialist.fatherName}</Text>
            <Text>{specialist.medOrganisation}</Text>
        </Space>
    ),
    specialist
}));

const items: DescriptionsProps['items'] = [
    { key: '1', label: 'ФИО', children: fullName },
    { key: '2', label: 'Дата рождения', children: birthDate },
    { key: '3', label: 'Полис', children: policy },
    { key: '4', label: 'Статус', children: <Badge status={status ? 'processing' : 'default'} text={status ? 'Активный' : 'Не активный'} /> },
    { key: '5', label: 'Email', children: email },
    { key: '6', label: 'Диагноз', children: diagnosis }
];

export default function SendCard() {
    const onFinish = useCallback((values: string[])=>{
        console.log(values);
    },[]);

    const [form] = useForm();

    //const watchedSpecialist = useWatch('specialist', form);

    //const [inputSpecialist, setInputSpecialist] = useState<string>('');
    //const handleInputSpecialist = (e: React.ChangeEvent<HTMLInputElement>) => {
    //    setInputSpecialist(e.target.value);
    //};

    //const isValidForm = inputSpecialist;

    return(
        <ConfigProvider theme={{
            token: {
                colorPrimary: "#0047e0",
                colorPrimaryActive: "#0236a5",
                colorPrimaryHover: "#3867df",
                controlHeightLG: 50
            }
        }}>
            <Flex className="page" justify='center' gap='large'>
                <Flex style={{width:'450px'}} vertical>
                    <Text className="title">
                        Отправить эксперту
                    </Text>

                    <Spacer space={10} />

                    <Descriptions style={{fontWeight:500, fontSize:60}} column={1} items={items} bordered />
                </Flex>

                <Flex vertical>
                    <Spacer space={30} />

                    <Form style={{width:1200, fontWeight:700, fontSize:60}} className="container" onFinish={onFinish} layout='vertical' form={form}>
                        <Item name='theme' label='Тема обсуждения'>
                            <Input size='large'/>
                        </Item>

                        <Spacer space={30} />

                        <Item name='commit' label='Комментарий'>
                            <TextArea placeholder='Комментарий' size='large'/>
                        </Item>

                        <Spacer space={20} />

                        <Item name='type' label='Тип узла'>
                            <Select size='large'>
                                <Option value='one'>1</Option>
                                <Option value='two'>2</Option>
                                <Option value='three'>3</Option>
                            </Select>
                        </Item>

                        <Spacer space={20} />

                        <Item name='specialist' label='Специалисты' required={true}>
                            <Select  mode='multiple' /*onChange={handleInputSpecialist}*/ options={options} labelInValue tagRender={(props) => (
                                <Tag style={{fontSize:14}} closable onClose={props.onClose}>
                                    {formatTag(props.value)}
                                </Tag>
                            )}
                                labelRender={(labelItem) => labelItem.label}
                            />
                        </Item>

                        <Spacer space={20} />

                        <Button
                            title='Отправить'
                            type='primary'
                            htmlType='submit'
                            size='large'
                            //disabled={!isValidForm}
                        />
                    </Form>
                </Flex>
            </Flex>
        </ConfigProvider>
    )
};