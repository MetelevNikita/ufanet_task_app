import { Container, Row, Col  } from 'react-bootstrap'
import Image from 'next/image'

// components

import Qrcode from '@/components/element/Qrcode/Qrcode'

// 

import logoUfanet from '@/../public/logo_ufanet/logo_full.svg'


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className='vw-100 vh-100 d-flex flex-column justify-content-center align-items-center'>
      <Image src={logoUfanet} width={200} height={200} alt='logo'/>

      <Row className='d-flex justify-content-center mt-4'>
        <Col md={8} className='d-flex justify-content-center mb-1' style={{padding: '0'}}>
          <Qrcode
              title={`Подпишитесь на бота в Telegram, только после этого регестрируйся на сайте. Это важно для подтверждения регистрации`}
              subtitle='Примечание: В боте Telegram вы сможете отслеживать, что происходит с вашим ТЗ, на каждом этапе обработки.'
              link="https://t.me/PR_main_bot"
              titleLink='@PR_main_bot'
            />
        </Col>
      </Row>



      {children}
    </Container>
  )
}