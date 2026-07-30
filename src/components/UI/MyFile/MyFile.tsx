'use client'

import { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

// styles

import styles from './MyFile.module.css'

// img

import icon from '@/../public/inputs_icon/cross.svg'
import path from 'path'

interface MyFileProps {

  title: string,
  placeholder: string,
  value: File | any,
  onChange: (e: any) => any,
  name: string
  data: File | any


}

const MyFile: FC<MyFileProps> = ({ title, placeholder, onChange, name, data }) => {



  const [fileSizes, setFileSizes]  = useState<boolean>(false)
  const [files, setFiles] = useState<any>([])


  useEffect(() => {
      if (data && data instanceof FileList) {
        const listSize = Array.from(data).reduce((total, acc) => {
          return total + acc.size
        }, 0)

        const mb = Number((listSize / (1024 * 1024)).toFixed(2))

        if (mb >= 20) {
          setFileSizes(true)
        } else {
          setFileSizes(false)
        }

      }
  }, [data])



  useEffect(() => {
    setFiles((!data) ? [] : Array.from(data).map((item: any) => {
    return {img: URL.createObjectURL(item), name: item.name}
  }))
  }, [data])










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

              const fileExtension = path.extname(item.name).toLowerCase();
              const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];

              if (!imageExtensions.includes(fileExtension)) {
                return (
                  <div className={styles.file_wrapper} key={index+1}>
                    <span className={styles.file_insert}>Выбран Файл - {item.name}</span>
                    <button
                        className={styles.result_image_btn}
                        onClick={(e) => {

                          // remove from urlObject


                          setFiles(files.filter((file: any) => {
                            return file.name !== item.name
                          }))


                          // remove from array FomrData

                          const transfer = new DataTransfer()

                          data = Array.from(data).filter((file: any) => file.name !== item.name)

                          data.forEach((element: File) => {
                               transfer.items.add(element)
                          });

                          
                          onChange({
                            target: {
                              name,
                              files: transfer.files,
                            },
                          })
                       
                        }}
                      >
                            удалить
                    </button>
                  </div>
                )
              } else {
                return (
                  <div className={styles.file_wrapper} key={index+1}>
                    <div className={styles.result_image_wrapper}>
                      <Image src={item.img} alt='image' width={100} height={100}/>
                      <button
                        className={styles.result_image_btn}
                        onClick={(e) => {

                          // remove from urlObject


                          setFiles(files.filter((file: any) => {
                            return file.name !== item.name
                          }))


                          // remove from array FomrData

                          const transfer = new DataTransfer()

                          data = Array.from(data).filter((file: any) => file.name !== item.name)

                          data.forEach((element: File) => {
                               transfer.items.add(element)
                          });

                          console.log(transfer)
                          
                          onChange({
                            target: {
                              name,
                              files: transfer.files,
                            },
                          })
                       
                        }}
                      >
                            удалить
                      </button>
                    </div>

                  </div>
                )
              }


            })

          }

        </div>


        {
          fileSizes && (
            <div className={styles.file_container}>
              <span className={styles.error_limit}>Общий размер файлов превышает 20мб (В таком случает лучше прикрепить ссылку на файлообменник в одном из полей)</span>
            </div>
          )
        }

       

    </div>

  )
}

export default MyFile
