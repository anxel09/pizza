import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getCategoryId, setCategoryId, setCurrentPage } from '../features/filter/filterSlice';

export default function Categories () {
  
  const dispatch = useDispatch()

  const activeIndex = useSelector(getCategoryId)
  
  function onClickCategory(index){
    console.log('clll')
    dispatch(setCategoryId(index))
    dispatch(setCurrentPage(1))
  }

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

    return (
      <div className="categories">
        <ul>
          {
            categories.map((item, index)=>{
              return <li key={item} onClick={()=>onClickCategory(index)} className={activeIndex === index ? 'active' : ''} >{item}</li>
            })
          }
        </ul>
      </div>
    );
  };