'use client'

// style

import styles from './page.module.css'

// 

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Row, Col } from 'react-bootstrap'

// 

import MyInput from '@/components/UI/MyInput/MyInput'
import MyButton from '@/components/UI/MyButton/MyButton'


const page: FC = () => {

  const router = useRouter()

  const [dataPassword, setDataPassword] = useState<any>({})

  const [errorAuth, setErrorAuth] = useState<string | null>(null)
  const [resultHandler, setResultHandler] = useState<any>(null)





  async function newPasswordHandler(dataPassword: {password: string, repeat_password: string}) {
    
    try {

      const {password, repeat_password} = dataPassword

      if (password !== repeat_password) {
        setErrorAuth('Пароли не совпадают')
        return
      }



      const url = new URL(window.location.href)
      console.log(url.searchParams.get('id'))



      const newData = {
        id: url.searchParams.get('id'),
        ...dataPassword
      }


      const response = await fetch('/api/auth/new_password', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newData)
      })

      if (!response.ok) {
        throw new Error(`Сетевая ошибка ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log(data)

      if (!data.success) {
        setErrorAuth(data.message)
        return data.message
      }
      setResultHandler(data.message)
      console.log(data)
      setTimeout(() => {
        router.push('/auth')
      }, 2000)



      
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.log(`Ошибка ${error.message}`)
        return `Ошибка`
      } 

      console.error(error)
      return error
    }
  }






  return (
    <Container>
      <Row md={12} className='d-flex flex-column justify-content-center align-items-center'>
        <Col className='d-flex flex-column justify-content-center align-items-center mt-2'>
          <div>Форма сброса пароля</div>
        </Col>
      </Row>

      <Row md={12} className='d-flex flex-column justify-content-center align-items-center'>
        
        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='password'
            type="password"
            placeholder="Новый пароль"
            value={dataPassword.password}
            onChange={
              (e: any) => setDataPassword({...dataPassword, password: e.target.value})
            }
            onFocus={() => {
              setErrorAuth(null)
            }}
          />
        </Col>

        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='repeat_password'
            type="password"
            placeholder="Повтор пароля"
            value={dataPassword.repeat_password}
            onChange={
              (e: any) => setDataPassword({...dataPassword, repeat_password: e.target.value})
            }
            onFocus={() => {
              setErrorAuth(null)
            }}
          />
        </Col>


      </Row>



      {
        (errorAuth) && (
          <Row md={12} className='d-flex flex-md-row flex-column justify-content-center align-items-center'>
            <Col className='d-flex flex-md-row flex-column justify-content-center align-items-center mt-2 mb-2'>

              <div className={styles.error_field}>Ошибка: {errorAuth}</div>
            
            </Col>
          </Row>
        )
      }


      {
        (resultHandler) && (
          <Row md={12} className='d-flex flex-md-row flex-column justify-content-center align-items-center'>
            <Col className='d-flex flex-md-row flex-column justify-content-center align-items-center mt-2 mb-2'>

              <div className={styles.result_field}>{resultHandler}</div>
            
            </Col>
          </Row>
        )
      }

      <Row md={6} className='d-flex flex-md-row flex-column justify-content-center align-items-center'>
        <Col md={4} className="mt-2">
          <MyButton
            type='button'
            text="Отправить"
            onClick={() => {
             newPasswordHandler(dataPassword)
            }}
          />
        </Col>

        <Col md={4} className="mt-2">
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