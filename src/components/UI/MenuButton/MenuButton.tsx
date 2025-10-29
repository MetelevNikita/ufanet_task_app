import { FC } from 'react'
import Image, { StaticImageData } from 'next/image'

// style

import styles from './MenuButton.module.css'

// bootstrap

import { Col, Row } from 'react-bootstrap'

interface MenuButtonProps {
  title: string,
  image: React.ReactNode
  onClick?: () => void
  menuActive?: any

}


const MenuButton: FC<MenuButtonProps> = ({ title, image, onClick, menuActive }) => {


  const {department, setDepartment} = menuActive


  return (
    <div className={styles.menu_button_container} onClick={onClick}>
      <div className={styles.menu_button_wrapper}>

      <div className={styles.menu_button_image_container}>
        <div className={(department === title) ? styles.menu_button_image_wrapper_active : styles.menu_button_image_wrapper}>
          {image}
        </div>
      </div>



      <Col className={[(department === title) ? styles.menu_button_title_acitve : styles.menu_button_title, 'd-none d-sm-block'].join(' ')}>{title}</Col>

      </div>
    </div>
  )
}

export default MenuButton
