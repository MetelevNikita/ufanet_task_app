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

  const [tgId, setTgID] = useState<any>('')

  const [errorAuth, setErrorAuth] = useState<string | null>(null)
  const [resultHandler, setResultHandler] = useState<any>(null)



  async function resetPasswordHandler(tgId: string) {
    
    try {

      if (tgId.trim().split('').length < 1) {
        setErrorAuth('Поле не должно быть пустым')
        return
      }

      const response = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          telegramId: tgId
        })
      })

      if (!response.ok) {
        throw new Error(`Сетевая ошибка ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()


      if (!data.success) {
        setErrorAuth(data.message)
        return data.message
      }
      setResultHandler(data.message)
      return data

      
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
            name='telegramId'
            type="number"
            placeholder="Укажите ваш телеграм ID (не логин пользователя в TG) пример 0000000"
            value={tgId}
            onChange={
              (e: any) => setTgID(e.target.value)
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
             resetPasswordHandler(tgId)
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