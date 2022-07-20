import {createSlice} from "@reduxjs/toolkit"

const initialState ={
  itemsOnPage:4,
  categoryId:0,
  currentPage:1,
  sort:{
    name:"популярности",
    sortProperty: "rating",
    sortBehave: true,
  }
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortData(state, action) {
      state.sort = action.payload;
    },
    setSortBehave(state) {
      state.sort.sortBehave = !state.sort.sortBehave;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort.sortProperty = action.payload.sortProperty;
      state.sort.sortBehave = action.payload.sortBehave === "true";
      state.sort.name = action.payload.name;
    },
    clearFilters(state) {
      const filters = {
        itemsOnPage: 4,
        categoryId: 0,
        currentPage: 1,
        sort: {
          name: "популярности",
          sortProperty: "rating",
          sortBehave: true,
        },
      };
      state.categoryId = filters.categoryId;
      state.currentPage = filters.currentPage;
      state.sort = JSON.parse(JSON.stringify(filters.sort));
    },
  },
});

export const { setCategoryId,setSortData, setSortBehave , setCurrentPage, setFilters, clearFilters} = filterSlice.actions

export const getCategoryId = (state)=> state.filter.categoryId
export const getSortData = (state) =>state.filter.sort
export const getSortBehave = (state) =>state.filter.sort.sortBehave
export const getItemsOnPage = (state) =>state.filter.itemsOnPage
export const getCurrentPage = (state) =>state.filter.currentPage
export const getSortProperty = (state) => state.filter.sort.Property


export default filterSlice.reducer