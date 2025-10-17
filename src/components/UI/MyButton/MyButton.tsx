'use client'

import { FC } from 'react'
import { motion } from "motion/react"
import Link from 'next/link'

// styles

import styles from './MyButton.module.css'

interface MyButtonProps {
  text: string,
  onClick: () => void,
  type: "submit" | "button" | "reset",
  link?: string
}

const MyButton: FC<MyButtonProps> = ({ text, onClick, type, link }) => {



  if (!link) {
    return (
      <motion.button
      className={styles.btn}
      type={type}
      onClick={onClick}
      whileHover={{background: '#4f01ae', border: '1px solid #4f01ae00', color: 'white'}}
      whileTap={{scale: 1.1}}>

            {text}

    </motion.button>
    )
  }


  return (

    <Link href={link} style={{width: '100%',   height: '56px'}}><motion.button
      className={styles.btn}
      type={type}
      onClick={onClick}
      whileHover={{background: '#4f01ae', border: '1px solid #4f01ae00', color: 'white'}}
      whileTap={{scale: 1.1}}>

            {text}

    </motion.button></Link>
 
  )
}

export default MyButton
