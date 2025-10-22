import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// 

import { Container, Row, Col } from 'react-bootstrap'

// img

import tg from '@/../public/social_icon/tg.svg'
import wa from '@/../public/social_icon/wa.svg'

// 


const socialLogoArr = [
  {
    id: 1,
    logo: tg,
    link: ''
  },

  {
    id: 2,
    logo: wa,
    link: ''
  }
]






const Footer: FC = () => {
  return (



    <Container style={{width: '100%', height: 100, backgroundColor: 'white'}}>
      <Row>

      </Row>



      <Row>
        <Col>
        <hr />
        </Col>
      </Row>




      <Row className='d-flex flex-row align-items-center justify-content-center mb-3'>

        <Col md={5} className='d-flex flex-row align-items-center justify-content-between'>

          <div>Есть вопросы по приложению ?</div>

        </Col>


        <Col md={5} className='d-flex flex-row align-items-center justify-content-end'>

            {
              (socialLogoArr.length < 1) ? <></> : socialLogoArr.map((item, index: number) => {
                return (
                  <Link key={index+1} style={{marginLeft: 5, marginRight: 5}} href={item.link}><Image src={item.logo} width={35} alt={'logo'} /></Link>
                )
              })
            }

        </Col>

      </Row>
    </Container>


  )
}

export default Footer
