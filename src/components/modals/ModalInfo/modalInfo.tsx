import { FC } from 'react'

// styles

import styles from './modalInfo.module.css'

// components

import MyButton from '@/components/UI/MyButton/MyButton'


// 

interface ModalInfoProps {
  title: string
  btnTitleOne: string
  btnTitleTwo: string
  image: React.ReactNode
  onClickOne?: () => any
  onClickTwo?: () => any

}


const modalInfo: FC<ModalInfoProps> = ({ title, image, btnTitleOne, btnTitleTwo, onClickOne, onClickTwo }) => {
  return (

    <div className={styles.modal_info_bg}>

        <div className={styles.modal_info_container}>
          <div className={styles.modal_info_wrapper}>

              <div className={styles.modal_info_image_wrapper}>
                {image}
              </div>

              <div className={styles.modal_info_title_wrapper}>
                {title}
              </div>

              <div className={styles.modal_info_btn_wrapper}>

                  <MyButton style={{marginLeft: '5px', marginRight: '5px'}} text={btnTitleOne} onClick={onClickOne || (() => {})} type={'button'} />
                  <MyButton text={btnTitleTwo} onClick={onClickTwo || (() => {})} type={'button'} />

              </div>



          </div>
        </div>

    </div>

  )
}

export default modalInfo
