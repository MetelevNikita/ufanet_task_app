'use client'

import React, { useEffect } from "react";
import { Suspense } from "react";
import { PrismaClient } from "@/../generated/prisma/client";
import { useRouter } from "next/navigation";


// 

import { Container, Row, Col } from "react-bootstrap";

// 

import RootContext from "@/utils/RootContext";

// 

import Header from "@/components/element/Header/Header";

// lib

import { logoutUser } from "@/lib/logoutUser";
import { getUsers } from "@/lib/getUsers";





export default function MainLayout ({children}: {children: React.ReactNode}) {

  const prisma = new PrismaClient()
  const router = useRouter()

  // checkUserDatabase


  useEffect(() => {

    const checkUserDatabase = async () => {
      const storage = localStorage.getItem('data')

      if (!storage) {
        alert('Не обнаружены данные сессии пользователя, необходима повторная авторизация на сайте')
        await logoutUser()
        router.push('/auth')
        return
      }

      const id = storage?.split('|')[1] as string

      const users = await getUsers()
      const checkUser = users.data.find((item: {id: string}) => item.id == id)

      if (!checkUser) {
        alert('Пользователь удален или не зарегестрирован в системе, попробуйте снова')
        await logoutUser()
        router.push('/auth')
        return
      }



    }

    checkUserDatabase()

  }, [])





// 


  // 

  return (
    <Suspense fallback={
    <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-4'>
        <Col md={12}>
          <div className='d-flex flex-row justify-content-center align-items-center'>Загрузка...</div>
        </Col>
      </Row>
    }>
    <Container>
      <RootContext>
          <Header />
              {children}
      </RootContext>
    </Container>
    </Suspense>

  )
}