'use client'

import { FC, useState } from 'react'
import { BiListCheck } from "react-icons/bi";

// style

import styles from './MySelect.module.css'

// type

import { SelectType } from '@/types/types'
import { div } from 'motion/react-client';

// 


interface MySelectProps {
  title: string
  name: string,
  options: SelectType[] | any
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
