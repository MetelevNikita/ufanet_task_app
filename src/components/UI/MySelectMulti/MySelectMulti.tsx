import { FC, useEffect, useState } from "react"

// icon

import { BiTrash } from "react-icons/bi";

// styles

import styles from './MySelectMulti.module.css'

// types

import { MySelectType } from "@/types/types"



interface MySelectMultiProps {
  title: string
  name: string
  options: MySelectType[] | any
  onChange: (e: any) => void
  data: string[]
  remove: (e: any) => any
}

const MySelectMulti: FC<MySelectMultiProps> = ({ title, options, onChange, name, data, remove }) => {


  return (
    <div className={styles.select_container}>

      <span className={styles.select_title}>{title}</span>
      <select className={styles.select} name={name} onChange={onChange}>
        <option value='' disabled selected>Выберите значение</option>
        { 
          options.map((item: any, index: number) => {
            return <option key={index+1} value={item.label}>{item.label}</option>
          })
        }
      </select>


      <div className={styles.list_wrapper}>

        {
          (data) && data.map((item: any, index: number) => {
            return  (
            <div className={styles.list_element_wrapper} key={index+1}>
                <div className={styles.list_element_text}>{item}</div>
                <BiTrash className={styles.list_element_icon} onClick={() => {remove(item)}}/>
            </div>
            )
          })
        }

      </div>
      
    </div>
  )
}

export default MySelectMulti
