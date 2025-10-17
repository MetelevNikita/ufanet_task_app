import { FC } from 'react'
import Image, { StaticImageData } from 'next/image'

// styles

import styles from './Logo.module.css'

// 

interface LogoProps {
  image: string | StaticImageData
  title: string
  subtitle: string
}

const Logo: FC<LogoProps> = ({ image, title, subtitle }) => {
  return (
    <div className={styles.logo_container}>

      <div className={styles.logo_wrapper}>
          <Image src={image} alt={'logo'} />
      </div>

      <div className={styles.logo_text_wrapper}>
        <div className={styles.logo_text}>{title}</div>
        <div className={styles.logo_subtitle}>{subtitle}</div>
      </div>

      
    </div>
  )
}

export default Logo
