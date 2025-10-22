'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

// styles

import styles from './MyFile.module.css'

// img

import icon from '@/../public/inputs_icon/cross.svg'
import { div } from 'motion/react-client'

interface MyFileProps {

  title: string,
  placeholder: string,
  value: File | any,
  onChange: (e: any) => void,
  name: string
  data: File | null


}

const MyFile: FC<MyFileProps> = ({ title, placeholder, onChange, name, data }) => {


  

  const file = (data === null) ?  [] : data
  console.log(file)

  const image = (file) ? URL.createObjectURL(file as any) : ''

  console.log(image)
  

  return (

    <div >
        <span className={styles.file_title}>{title}</span>
        <motion.div className={styles.file_input} whileHover={{background: '#4f01ae', border: '1px solid #4f01ae00', color: 'white'}} whileTap={{scale: 1.05}}>
          
          <label htmlFor={'file'} className={styles.file_input_wrapper}>
          <div>{placeholder}</div>
          <Image src={icon} alt={'icon'} />
        </label></motion.div>
        <input
          className={styles.file}
          type="file" id={'file'}
          onChange={onChange}
          name={name}
        />

        <div className={styles.result_wrapper}>
            {
              (!data?.name) ? <></> : <span className={styles.file_insert}>Выбран Файл - {data?.name}</span>
            }

            {

              (image) && (
                <div className={styles.result_image_wrapper}><Image src={image} alt='image' width={100} height={100}/></div>
              )

            }
        </div>


    </div>

  )
}

export default MyFile
