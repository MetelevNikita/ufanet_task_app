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
  onChange: (e: any) => any,
  name: string
  data: File | any


}

const MyFile: FC<MyFileProps> = ({ title, placeholder, onChange, name, data }) => {



  const files = (!data) ? [] : Array.from(data).map((item: any) => {
    return {img: URL.createObjectURL(item), name: item.name}
  })
  console.log(files)


  return (

    <div >
        <span className={styles.file_title}>{title}</span>
        <motion.div className={styles.file_input} whileHover={{background: '#4f01ae', border: '1px solid #4f01ae00', color: 'white'}} whileTap={{scale: 1.01}}>
          
          <label htmlFor={name} className={styles.file_input_wrapper}>
          {placeholder}
          <Image className={styles.input_file_icon} src={icon} alt={'icon'} />
        </label></motion.div>
        <input
          className={styles.file}
          type="file" id={name}
          onChange={onChange}
          name={name}
          multiple
        />

        <div className={styles.file_container}>

          {

            (data) && files.map((item: any, index: number) => {

              console.log(item)

              return (
                <div className={styles.file_wrapper} key={index+1}>
                  <span className={styles.file_insert}>Выбран Файл - {item.name}</span>
                  <div className={styles.result_image_wrapper}><Image src={item.img} alt='image' width={100} height={100}/></div>
                </div>
              )
            })

          }

        </div>

       

    </div>

  )
}

export default MyFile
