import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import qs from 'qs'
import axios from "axios";
import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { getCurrentPage, getItemsOnPage, getSortBehave, getSortData, getSortProperty, setFilters } from "../features/filter/filterSlice";


const Home = ({firstRender}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSearch,setIsSearch] = useState(true)

  const sortId = useSelector(getSortData)
  const categoryId = useSelector(state => state.filter.categoryId) 
  const sortBehave = useSelector(getSortBehave)
  const itemsOnPage = useSelector(getItemsOnPage)
  const currentPage = useSelector(getCurrentPage)
  const sortName = useSelector(getSortProperty)

  const { searchValue } = useContext(SearchContext)

  const [items, setItems] = useState([]);
  const [pizzaData, setPizzaData] = useState([])
  const [loaded, setLoaded] = useState(true);
  const [totalPage, setTotalPage] = useState(1)



  const getData = useCallback(async ()=>{
    setLoaded(true);
    try {
      const queryCategory = categoryId !== 0 ? `category=${categoryId}` : "";
      const querySort = `&sortBy=${sortId.sortProperty}`;
      const { data } = await axios.get(
        "https://62c867ac8c90491c2cb52f2d.mockapi.io/items?" +
          queryCategory +
          querySort +
          `&order=${sortBehave ? "desc" : "asc"}`
      );
      setItems(data);
      setLoaded(false);
    } catch (err) { 
      console.log("Не смогли загрузить пиццу (");
    }
  },[categoryId, sortId, sortBehave])

  useEffect(()=>{
    if(!firstRender.current){
        const query = (qs.stringify({
          currentPage,
          categoryId,
          sortBehave,
          sortProperty:sortId.sortProperty,
        }))
        navigate(`?${query}`)
    }
    firstRender.current = false

  },[categoryId, sortId, sortBehave, currentPage,navigate,firstRender])




  

  useEffect(() => {
    if (!isSearch){
      console.log(firstRender.current)
      !firstRender.current && getData();
      !firstRender.current && console.log('second')
    } 
    console.log('render chanced on false')
    setIsSearch(false)
    window.scrollTo(0, 0);
  }, [categoryId, sortId, sortBehave, dispatch,getData, isSearch, firstRender ,sortName]);


  const skeletonData = [...Array(8)].map((item, index) => (
    <Skeleton key={index} />
  ));

  const lastIndex = itemsOnPage * currentPage;
  const firstIndex = lastIndex - itemsOnPage;



    useEffect(()=>{
      const temp = items
      .filter((obj) =>obj.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map((item) => (
        <PizzaBlock
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          types={item.types}
          sizes={item.sizes}
          category={item.category}
          rating={item.rating}
        />
      ));
      setTotalPage(Math.ceil(temp.length / itemsOnPage))
      setPizzaData(temp.slice(firstIndex,lastIndex))
    },[searchValue,items, currentPage, firstIndex, lastIndex, itemsOnPage])


    useEffect(()=>{
      if(window.location.search){
        const params = qs.parse(window.location.search.split('?')[1])
        const name = sortList.find(obj => obj.sortProperty === params.sortProperty).name

        dispatch(setFilters({
          ...params,
          name:name,
        }))
        setIsSearch(false)
        console.log('changed')
      }
    },[dispatch])

  return (
    <>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loaded ? skeletonData : pizzaData}</div>
      <Pagination
        totalPage={totalPage}
      />
    </>
  );
};

export default Home;
