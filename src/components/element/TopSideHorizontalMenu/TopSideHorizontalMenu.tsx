'use client'

import { FC, useState } from 'react'

// styles

import styles from './TopSideHorizontalMenu.module.css'

// bootstrap

import { Col } from 'react-bootstrap';

// componets

import MenuButton from '@/components/UI/MenuButton/MenuButton'

// icon

import { GrAnnounce } from "react-icons/gr";
import { GrBarChart } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { GrGift } from "react-icons/gr";

// 




interface TopSideHorizontalMenuProps {
  departmentData: {
    department: string,
    setDepartment: (department: string) => void
  }
}

const TopSideHorizontalMenu: FC<TopSideHorizontalMenuProps> = ({ departmentData }) => {


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
        label: "PR отдел",
        value: "pr",
        icon: <GrAnnounce className={styles.menu_item_icon}/>,
        iconActive: <GrAnnounce className={styles.menu_item_icon_active}/>,
        link: '/app/pr',

      },
      {
        id: '3',
        label: "Интернет маркетинг",
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
    <div className={styles.top_menu_container}>

      <div className={styles.top_menu_wrapper}>

        {
          (departmentArray.length >= 1) && departmentArray.map((item: any, index: number): React.ReactNode => {
            return <Col md={4} key={index + 1}>
                      <MenuButton
                        title={item.label}
                        image={(department === item.label) ? item.icon : item.iconActive}
                        onClick={() => {
                          setDepartment(item.label)
                          sessionStorage.setItem('department', item.value)
                        }}
                        menuActive={{department, setDepartment}}/>
                    </Col>
                })

        }


      </div>
      
    </div>
  )
}

export default TopSideHorizontalMenu
