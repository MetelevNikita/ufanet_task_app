import { FC } from 'react'


// styles

import styles from './modalSubmit.module.css'

// components

import MyButton from '@/components/UI/MyButton/MyButton'
import { supportGroupUrl } from '@/data/support'


interface ModalSubmitProps {
  image: React.ReactNode
  title: string
  modalSuccess?: {modalSubmitSuccess: boolean, setModalSubmitSuccess: (e: boolean) => void} | any
  modalError?: {modalSubmitError: boolean, setModalSubmitError: (e: boolean) => void} | any
  type: 'success' | 'error' | 'default'
}

const ModalSubmit: FC<ModalSubmitProps> = ({ image, title, modalSuccess, modalError, type }) => {

  const {modalSubmitSuccess, setModalSubmitSuccess} = modalSuccess
  const {modalSubmitError, setModalSubmitError} = modalError


  return (

    <div className={styles.modal_submit_bg}>


      <div className={styles.modal_submit_container}>
        <div className={styles.modal_submit_wrapper}>

          <div className={styles.modal_submit_image_wrapper}>
            {image} 
          </div>

          <div className={styles.modal_submit_title_wrapper}>
              <div className={styles.modal_submit_title}>{title}</div>
          </div>

          {type === 'error' && (
            <p className={styles.modal_submit_support}>
              Если приложение не отвечает и не удаётся отправить заявку, напишите в{' '}
              <a href={supportGroupUrl} target='_blank' rel='noopener noreferrer'>группу технической поддержки</a>.
            </p>
          )}

          <MyButton
            text={'Закрыть'}
            onClick={() => {
              (type === 'success') ? setModalSubmitSuccess(false) : setModalSubmitError(false)
              window.location.reload()
            }}
            type={'button'} />

        </div>
      </div>


    </div>
  )
}

export default ModalSubmit
