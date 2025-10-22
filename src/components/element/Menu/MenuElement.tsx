import { FC, useState } from 'react'
import {motion} from 'motion/react'
import Link from 'next/link'

// styles

import styles from './MenuElement.module.css'

// component

import IconCommersial from './MenuIcon/IconCommersial'
import IconPR from './MenuIcon/IconPR'
import IconDesign from './MenuIcon/IconDesign'
import IconMarketing from './MenuIcon/IconMarketing'



// 

interface MenuElementProps {
  text: string
  onClick: (e: any) => void
  link?: string
}

const MenuElement: FC<MenuElementProps> = ({ text, onClick, link }) => {

  const [active, setActive] = useState(false)

  return (
    <motion.button className={styles.menu_element_container} whileHover={{color: 'white', backgroundColor: '#80298D'}} whileTap={{scale: '1.10'}} onClick={onClick}>
      <div className={styles.menu_element_wrapper} onMouseMove={() => {
        setActive(true)
      }} onMouseOut={() => {setActive(false)}}>

        {
            (text === 'Интернет маркетинг') && (<IconMarketing width={32} height={32} color={(active) ? 'white' : '#80298D'}/>) 
          
          || (text === 'PR отдел') && (<IconPR width={32} height={32} color={(active) ? 'white' : '#80298D'}/>)
          
          || (text === 'Отдел дизайна') && (<IconDesign width={32} height={50} color={(active) ? 'white' : '#80298D'}/>)

          || (text === 'Отдел рекламы') && (<IconCommersial width={32} height={50} color={(active) ? 'white' : '#80298D'}/>)
        }


        <div className={styles.menu_element_text}>{text}</div>

      </div>
    </motion.button>
  )
}

export default MenuElement
