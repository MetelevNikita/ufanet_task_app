'use client'

// style

import styles from './page.module.css'

// 

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'motion/react'

// 

import MyInput from '@/components/UI/MyInput/MyInput'
import MyButton from '@/components/UI/MyButton/MyButton'
import MyCheckBox from '@/components/UI/MyCheckBox/MyCheckBox'

const page: FC = () => {

  const router = useRouter()

  const [user, setUser] = useState<any>({})

  const [errorAuth, setErrorAuth] = useState<string | null>(null)
  const [resultHandler, setResultHandler] = useState<any>(null)


  console.log(user)


  async function handleLogin(user: {email: string, password: string, policy: boolean}) {
    
    try {

      if (!user) {
        setErrorAuth('Поля не должны быть заполнены')
        console.log('Поля пустые')
        return
      }

      if (!user.policy) {
        setErrorAuth('Согласитесь с обработкой персональных данных')
        console.log('Поля пустые')
        return
      }

      const response = await fetch('/api/auth/login', {
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
      console.log(data)

      if (!data.success) {
        setErrorAuth(data.message)
        return data.message
      }
      setResultHandler(data.message)

      console.log(data)
      localStorage.setItem('data', data.data)
      router.push('/')

      
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.log(`Ошибка ${error.message}`)
        return `Ошибка`
      } 

      console.error(error)
      return error
    }
  }


  async function resetPasswordHandler () {
    router.push('/auth/reset')
  }



  return (
    <Container>
      <Row md={12} className='d-flex flex-column justify-content-center align-items-center'>
        <Col className='d-flex flex-column justify-content-center align-items-center mt-2'>
          <div>Войти</div>
        </Col>
      </Row>

      <Row md={12} className='d-flex flex-column justify-content-center align-items-center'>
        
        <Col md={8} className="mt-3">
          <MyInput
            title=''
            name='email'
            type="email"
            placeholder="Email"
            value={user?.email || ''}
            onChange={
              (e: any) => setUser({...user, email: e.target.value})
            }
            onFocus={() => {
              setErrorAuth(null)
            }}
          />
        </Col>

        <Col md={8} className="mt-2">
          <MyInput
            name='password'
            title=''
            type="password"
            placeholder="Password"
            value={user?.password || ''}
            onChange={
              (e: any) => setUser({...user, password: e.target.value})
            }
            onFocus={() => {
              setErrorAuth(null)
            }}
            />
        </Col>
      </Row>
      
      <Row md={8} className='d-flex justify-content-center align-items-center mb-2'>

        <Col md={4} className='d-flex justify-content-center justify-content-md-start  mt-2'>
            <MyCheckBox
              title={'Согласие на обработку персональных данных'}
              fio={''}
              placeholder={''}
              onChange={(e) => {
                console.log('click')
                setUser({...user, policy: e.target.checked})
              }}
              value={user.policy}
              name={''} />
        </Col>


        <Col md={4} className='d-flex justify-content-md-end justify-content-center align-items-end mt-2'>
            <motion.div
              whileHover={{color: '#fc9b32'}}
              whileTap={{scale: 1.1}}
              className={styles.forgot_password}
              onClick={() => {
                resetPasswordHandler()
              }}
              >
                  Забыли пароль?
            </motion.div>
        </Col>
      </Row>



      {/*  */}

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
            text="Войти"
            onClick={() => {
              handleLogin(user)
            }}
          />
        </Col>

        <Col md={4} className="mt-2">
          <MyButton
            type='button'
            text="Регистрация"
            onClick={() => {
              router.push('/auth/registration')
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default page