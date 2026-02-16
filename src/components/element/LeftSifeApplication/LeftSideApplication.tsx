'use client'

import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';


// icon

import { BiChevronDown } from "react-icons/bi";




// styles

import styles from './LeftSideApplication.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// icon

import { GrAnnounce } from "react-icons/gr";
import { GrBarChart } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { GrGift } from "react-icons/gr";

// components

import MenuButton from '@/components/UI/MenuButton/MenuButton';

// types




interface LeftSideApplicationProps {
  departmentData: {
    department: string,
    setDepartment: (department: string) => void
  }
}

const LeftSideApplication: FC<LeftSideApplicationProps> = ({ departmentData }) => {


  const router = useRouter()


  const {department, setDepartment} = departmentData

  const departmentArray = [
  {
      id: '1',
      label: "Отдел рекламы",
      value: "advertising",
      icon: <GrGift className={styles.menu_item_icon}/>,
      iconActive: <GrGift className={styles.menu_item_icon_active}/>,
      link: '/app/advertising',

    },
    {
      id: '2',
      label: "PR",
      value: "pr",
      icon: <GrAnnounce className={styles.menu_item_icon}/>,
      iconActive: <GrAnnounce className={styles.menu_item_icon_active}/>,
      link: '/app/pr',

    },
    {
      id: '3',
      label: "Отдел интернет-маркетинга",
      value: "marketing",
      icon: <GrBarChart className={styles.menu_item_icon}/>,
      iconActive: <GrBarChart className={styles.menu_item_icon_active}/>,
      link: '/app/marketing',

    },
    {
      id: '4',
      label: "Отдел дизайна",
      value: "design",
      icon: <GrGallery className={styles.menu_item_icon}/>,
      iconActive: <GrGallery className={styles.menu_item_icon_active}/>,
      link: '/app/design',

    }
  ]


  return (
    <Container>
      <Row>
        <Col>
        
          <div className={styles.left_menu_application_container}>
            <div className={styles.left_menu_application_wrapper}>

              <Col className={[styles.left_menu_title, 'd-none d-md-block d-lg-block'].join(' ')}>
                
                <BiChevronDown className={styles.left_menu_icon_department}/>
                Выберите отдел
                
              </Col>

              <Col className='mt-3'>
                {
                  (departmentArray.length >= 1) && departmentArray.map((item: any, index: number): React.ReactNode => {

                    return (

                      <Col key={index + 1} className='mb-2 mt-2'>
                        <MenuButton
                          title={item.label}
                          image={(department === item.label) ? item.icon : item.iconActive}
                          onClick={() => {
                              router.push(`/app?department=${item.label}`)
                            }}
                          menuActive={{department, setDepartment}}/>
                      </Col>
                    )
                  })
                }

              </Col>

            </div>
          </div>
        
        
        </Col>
      </Row>
    </Container>
  )
}

export default LeftSideApplication
