import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const get_books =  () => {
    return async (dispatch) => {

        const {data} = await axios.get('http://localhost:8000/api/books')

        dispatch(booksData(data.data))
    }
}

export const add_book = (data) => {
    return (dispatch) => {
        axios
            .post('http://localhost:8000/api/books', data)
            .then((res) => {
                let result = res.data
                dispatch(addbookData(result))
            })
            .catch((err) => err.message)
    }
}

export const delete_book = (id) => {
    return (dispatch) => {
        axios
            .delete('http://localhost:8000/api/books/' + id)
            .then((res)=>{
                let result = res.data
                dispatch(deletebookData(result))
            })
            .catch((err) => console.log(err))
    }
}

export const detail_book = (data)=>{
    return (dispatch)=>{
        dispatch(detailbookData(data))
    }
}

export const update_book = (data)=>{
    return (dispatch) =>{
        axios
        .put(`http://localhost:8000/api/books/${data.id}`,data)
        .then((res)=>{
            let result = res.data
            dispatch(updatebookData(result))
        })
        .catch((err)=> console.log(err))
    }
}

const initialState = {
    books: [],
    loadingbook: true,
    addbook: [],
    loadingAddbook: true,
    deletebook:[],
    detailbook:[],
    updatebook:[]
}

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        booksData(state, action) {
            state.books = action.payload
            state.loadingbook = false
        },
        addbookData(state, action) {
            state.addbook = action.payload
            state.loadingAddbook = false
        },
        deletebookData(state, action) {
            state.deletebook = action.payload
        },
        detailbookData(state, action) {
            state.detailbook = action.payload
        },
        updatebookData(state, action) {
            state.updatebook = action.payload
        }
    },
});

export const { booksData, addbookData ,deletebookData,detailbookData,updatebookData} = booksSlice.actions;
export default booksSlice.reducer;
