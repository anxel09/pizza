import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearPizzaById, getPizzaById,fetchPizzaById, getStatus } from '../../features/fetchPizzas/fetchSlice'
import PizzaBlock from '../../components/PizzaBlock'
import Skeleton from '../../components/PizzaBlock/Skeleton'
import NotFound from '../NotFound'

export default function FullPizza(){


  const {id} = useParams()
  const dispatch = useDispatch()
  const status = useSelector( getStatus )
  const pizza = useSelector( getPizzaById )[0]

  useEffect(()=>{
      dispatch( fetchPizzaById(id) )
    return ()=>{
      dispatch( clearPizzaById() )
    }
  },[dispatch,id])


  return (
    <>
      {status === "loading" ? (
        <div className="pizza-block-wrapper">
          <div className="pizza-block">
            <Skeleton />
          </div>
        </div>
      ) : status === "error" ? (
        <NotFound />
      ) : pizza &&
        <PizzaBlock {...pizza} />
      }
    </>
  );
}
