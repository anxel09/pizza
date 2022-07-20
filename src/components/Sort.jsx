import React from "react";
import { useState } from "react";
import { getSortData, setSortData, getSortBehave, setSortBehave } from "../features/filter/filterSlice";
import { useDispatch,useSelector } from "react-redux";


export const sortList = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

export default function Sort() {
  const dispatch = useDispatch()
  const sortBehave = useSelector(getSortBehave)

  const [isOpen, setIsOpen] = useState(false);

  const selected = useSelector(getSortData)

  function onClickSort(item){
    dispatch(setSortData(item))
  }

  const sortName = selected.name;

  return (
    <div className="sort">
      <div className="sort__label">      
        <svg
          style={{cursor:"pointer",
            transform:`rotateX(${sortBehave? 180 : 0}deg)`
          }}
          onClick={()=>dispatch(setSortBehave())}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortName}</span>
      </div>
      {isOpen && (
        <div className="sort__popup" onMouseLeave={() => setIsOpen(false)}>
          <ul>
            {sortList.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => onClickSort(item)}
                  className={item.sortProperty === selected.sortProperty ? "active" : ""}
                >
                  
                  {item.name}

                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
