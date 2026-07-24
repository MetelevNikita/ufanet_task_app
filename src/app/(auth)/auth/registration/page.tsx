'use client'

// style

import styles from './page.module.css'

// 

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Row, Col } from 'react-bootstrap'

// components

import MyInput from '@/components/UI/MyInput/MyInput'
import MyButton from '@/components/UI/MyButton/MyButton'
import MySelect from '@/components/UI/MySelect/MySelect'

// types

import { MenuType } from '@/types/types'



const page: FC = () => {

  const router = useRouter()

  // 

  const [user, setUser] = useState<any>(null)

  // 

  const [disabledBtn, setDisabledBtn] = useState<{disable: boolean, text: string}>({disable: false, text: 'Регистрация'})
  const [errorAuth, setErrorAuth] = useState<string | null>(null)
  const [resultHandler, setResultHandler] = useState<any>(null)

  // 

  const branchSelectorsArr: MenuType[] = [
    {
      id: 1,
      label: 'Уфа',
      value: 'Уфа',
    },
    {
      id: 2,
      label: 'Оренбуржье',
      value: 'Оренбуржье',
    },
    {
      id: 3,
      label: 'Поволжье',
      value: 'Поволжье',
    },
    {
      id: 4,
      label: 'Южный куст',
      value: 'Южный куст',
    },
    {
      id: 5,
      label: 'Северный куст',
      value: 'Северный куст',
    },
    {
      id: 6,
      label: 'Западный куст',
      value: 'Западный куст',
    },
    {
      id: 7,
      label: 'Московская область',
      value: 'Московская область',
    },
    {
      id: 8,
      label: 'Нижегородский филиал',
      value: 'Нижегородский филиал',
    }
  ]

  // 

  async function createNewUserHandler (user: any) {
    try {
      setDisabledBtn({disable: true, text: 'Отправка данных'})

      const response = await fetch('/api/auth/registration', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      if (!response.ok) {
        throw new Error(`Сетевая ошибка ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.success) {
        setErrorAuth(data.message)
        return
      }

      setResultHandler(data)
      alert(data.message)
      
      router.push('/auth')
      return data
      
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error(`Ошибка ${error.message}`)
        return `Ошибка`
      }

      console.error(error)
      return error
    }
  }



  return (
    <Container>
      <Row md={12} className='d-flex flex-md-row flex-column justify-content-center align-items-center'>
        <Col className='d-flex flex-md-row flex-column justify-content-center align-items-center mt-2'>
          <div>Регистрация</div>
        </Col>
      </Row>

      <Row md={12} className='d-flex flex-column justify-content-center align-items-center'>

        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='name'
            type="text"
            placeholder="Имя Фамилия"
            value={user?.name || ''}
            onChange={(e: any) => setUser({...user, name: e.target.value})}
          />
        </Col>

        <Col md={8} className="mt-3">
          <MySelect
            title={''}
            name={'branch'}
            options={branchSelectorsArr}
            onChange={
              (e: any) => {
                setUser({...user, branch: e.target.value})
              }
            }
            value={user?.brnach}
          />
        </Col>

        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='department'
            type="text"
            placeholder="Ваша служба/отдел"
            value={user?.department || ''}
            onChange={(e: any) => setUser({...user, department: e.target.value})}
          />
        </Col>
        
        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='email'
            type="email"
            placeholder="Почта для входа"
            value={user?.email || ''}
            onChange={(e: any) => setUser({...user, email: e.target.value})}
          />
        </Col>

        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='telegramId'
            type="text"
            placeholder="TelegramId: пример 00000000 (не имя пользователя) "
            value={user?.telegramId || ''}
            onChange={(e: any) => setUser({...user, telegramId: e.target.value})}
          />
        </Col>

        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='loginCorp'
            type="text"
            placeholder="Логин под которым авторизуетесь на корп сайте"
            value={user?.loginCorp || ''}
            onChange={(e: any) => setUser({...user, loginCorp: e.target.value})}
          />
        </Col>

        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='password'
            type="password"
            placeholder="Пароль не менее 6 симоволов"
            value={user?.password}
            onChange={
              (e: any) => setUser({...user, password: e.target.value})}
            />
        </Col>
      </Row>

      <Row md={12} className='d-flex flex-md-row flex-column justify-content-center align-items-center'>
        <Col md={4} sm={12} className="mt-3">
          <MyButton
            type='button'
            disabled={disabledBtn.disable}
            text={disabledBtn.text}
            onClick={() => {
              createNewUserHandler(user)
            }}
          />
        </Col>

        <Col md={4} sm={12} className="mt-3">
          <MyButton
            type='button'
            text="Назад"
            onClick={() => {
              router.push('/auth')
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default page