import style from './NotFoundBlock.module.scss'

export default function NotFoundBlock(){
    return(
        <div className={style.container}>
            <h1>Не существующая страница 😕</h1>
        </div>
    )
}