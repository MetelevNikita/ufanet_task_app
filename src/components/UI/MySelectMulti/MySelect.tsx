'use client'

import { FC, useState } from 'react'
import Image from 'next/image'

// style

import styles from './MySelect.module.css'

// type

import { SelectType } from '@/types/types'

// 


interface MySelectProps {
  title: string
  name: string,
  options: SelectType[]
  onChange: (e: any) => void
  value: any
}


const MySelect: FC<MySelectProps> = ({title, options, name, value, onChange }) => {


  return (

    <div className={styles.select_container}>
      <span className={styles.select_title}>{title}</span>
      <select name={name} className={styles.select} value={value} onChange={onChange}>

        {
          options.map((item: SelectType, index: number) => {
              return <option key={index} value={item.label}>{item.label}</option>
          })
        }


      </select>
    </div>

  )
}

export default MySelect
