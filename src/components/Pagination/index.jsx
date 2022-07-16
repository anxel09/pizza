import style from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, setCurrentPage } from "../../features/filter/filterSlice";

const Pagination = ({ totalPage }) => {
  const dispatch = useDispatch()
  const currentPage = useSelector(getCurrentPage)
  function handlerSetCurrentPage(page){
    dispatch(setCurrentPage(page))
  }

  let pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
function handleBack(){
    currentPage === 1 ? handlerSetCurrentPage(totalPage) : handlerSetCurrentPage(currentPage - 1)
}

function handleForward(){
    currentPage === totalPage ? handlerSetCurrentPage(1) : handlerSetCurrentPage(currentPage + 1)
}

  return (
    <ul className={style.pageList}>
        {totalPage > 1 && <li onClick={handleBack}>Назад</li>}
        {pages.map((page) => (
          <li onClick={()=> handlerSetCurrentPage(page)} className={`${style.pagination} ${page === currentPage ? `${style.active}` : '' }`} key={page}>{page}</li>
          ))}
        {totalPage > 1 && <li onClick={handleForward}>Вперед</li>}
    </ul>
  );
};

export default Pagination
