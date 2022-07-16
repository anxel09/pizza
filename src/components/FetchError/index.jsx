import style from './FetchError.module.scss'
import React from 'react'


const FetchError = () => {
  return (
    <div className={style.errorWrapper}>
        <h2>
            Ошибка в получении пицц, попробуйте обновить страницу!
        </h2> 
    </div>
  )
}

export default FetchError