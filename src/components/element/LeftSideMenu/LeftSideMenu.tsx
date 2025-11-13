'use client'

import { FC, useState } from 'react'
import { motion } from 'motion/react'

// icon

import { BiChevronDown } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

// 

import { BiListUl } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BiInfoCircle } from "react-icons/bi";
import { BiGroup } from "react-icons/bi";
import { BiBlock } from "react-icons/bi";


// styles

import styles from './LeftSideMenu.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// types

import { SelectType } from '@/types/types'

// components

import MyInput from '@/components/UI/MyInput/MyInput';
import MyButton from '@/components/UI/MyButton/MyButton';
import MenuButton from '@/components/UI/MenuButton/MenuButton';

// icon

import { GrAnnounce } from "react-icons/gr";
import { GrBarChart } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { GrGift } from "react-icons/gr";

// 

  const departmentArray = [
  {
      id: '1',
      label: "Отдел рекламы",
      value: "advertising",
      icon: <GrGift className={styles.menu_item_icon}/>,
      iconActive: <GrGift className={styles.menu_item_icon_active}/>

    },
    {
      id: '2',
      label: "PR",
      value: "pr",
      icon: <GrAnnounce className={styles.menu_item_icon}/>,
      iconActive: <GrAnnounce className={styles.menu_item_icon_active}/>

    },
    {
      id: '3',
      label: "Отдел интернет-маркетинга",
      value: "marketing",
      icon: <GrBarChart className={styles.menu_item_icon}/>,
      iconActive: <GrBarChart className={styles.menu_item_icon_active}/>

    },
    {
      id: '4',
      label: "Отдел дизайна",
      value: "design",
      icon: <GrGallery className={styles.menu_item_icon}/>,
      iconActive: <GrGallery className={styles.menu_item_icon_active}/>

    }
  ]


  const menuArr = [
    {
      id: 1,
      title: 'Входящие',
      icon: <BiListUl className={styles.menu_filter_icon}/>,
    },

    {
      id: 1,
      title: 'Согласовано',
      icon: <BiLike className={styles.menu_filter_icon}/>,
    },

    {
      id: 1,
      title: 'Отклонено',
      icon: <BiBlock className={styles.menu_filter_icon}/>,
    },

    {
      id: 1,
      title: 'Замечания',
      icon: <BiInfoCircle className={styles.menu_filter_icon}/>,
    },

    {
      id: 1,
      title: 'У исполнителя',
      icon: <BiGroup className={styles.menu_filter_icon}/>,
    },

    {
      id: 1,
      title: 'Готово',
      icon: <BiHeart className={styles.menu_filter_icon}/>,
    }
  ]




// 


interface LeftSideMenuProps {

  statusData: any
  departmentData: any
  nameData: any

}

const LeftSideMenu: FC<LeftSideMenuProps> = ({ statusData, departmentData, nameData }) => {

  const [activeMenuDepartment, setActiveMenuDepartment] = useState<string>('')
  const [activeMenuStatus, setActiveMenuStatus] = useState<string>('')


  // filter state
  
  const { status, setStatus } = statusData
  const { department, setDepartment } = departmentData
  const { name, setName } = nameData

  // 


  return (
    <Container>
      <Row>
        <Col>
        
          <div className={styles.left_menu_container}>
            <div className={styles.left_menu_wrapper}>

              <Col className={styles.left_menu_title}>
                
                <BiChevronDown className={styles.left_menu_icon_department}/>
                Выберите отдел
                
              </Col>

              <Col className='d-flex flex-md-column flex-row mt-2'>


                {
                  (departmentArray.length < 1) ? <></> : departmentArray.map((item: SelectType, index: number): React.ReactNode => {

                    return (

                      <Col key={index + 1} className='mb-1 mt-1'>
                        <MenuButton
                          title={item.label}
                          image={(activeMenuDepartment === item.label) ? item.icon : item.iconActive}
                          onClick={() => {
                            setDepartment(item.label)
                            setActiveMenuDepartment(item.label)
                            }}
                          menuActive={{department, setDepartment}}/>
                      </Col>
                    )
                  })
                }

              
              </Col>

              <Col className={styles.left_menu_title}>
                
                <BiChevronDown className={styles.left_menu_icon_department}/>
                Фильтр
                
              </Col>

              {
                menuArr.map((item: any, index: number): React.ReactNode => {
                  return (
                  <Col className='mb-1' key={index+1}>
                    <motion.div className={(activeMenuStatus === item.title) ? styles.menu_filter_title_acitve : styles.menu_filter_title} onClick={
                      () => {
                        setActiveMenuStatus(item.title)
                        setStatus(item.title)
                      }
                    }>
                      
                      {item.icon}
                      {item.title}

                    </motion.div>
                  </Col>)
                })
              }





              <Col className='mt-3'>

              <div className={styles.left_menu_title} onClick={(() => {console.log(name)})}>
                
                <BiChevronRight className={styles.left_menu_icon_department}/>
                Найти
                
              </div>

              <MyInput type={'text'} title={''} placeholder={'Имя для поиска'} onChange={(e: any) => {setName(e.target.value)}} value={name} name={''} />

              </Col>


            </div>
          </div>
        
        
        </Col>
      </Row>
    </Container>
  )
}

export default LeftSideMenu
