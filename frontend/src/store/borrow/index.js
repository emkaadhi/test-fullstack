import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const get_borrows =  () => {
    return async (dispatch) => {

        const data = await axios.get('http://localhost:8000/api/borrow')
        dispatch(borrowsData(data.data.data.borrows))
    }
}

export const add_borrow = (data) => {
    return (dispatch) => {
        axios
            .post('http://localhost:8000/api/borrow', data)
            .then((res) => {
                let result = res.data
                dispatch(addborrowData(result))
            })
            .catch((err) => err.message)
    }
}

export const delete_borrow = (id) => {
    return (dispatch) => {
        axios
            .delete('http://localhost:8000/api/borrow/' + id)
            .then((res)=>{
                let result = res.data
                dispatch(deleteborrowData(result))
            })
            .catch((err) => console.log(err))
    }
}

export const detail_borrow = (data)=>{
    return (dispatch)=>{
        dispatch(detailborrowData(data))
    }
}

export const update_borrow = (data)=>{
    return (dispatch) =>{
        axios
        .put(`http://localhost:8000/api/borrow/${data.id}`,data)
        .then((res)=>{
            let result = res.data
            dispatch(updateborrowData(result))
        })
        .catch((err)=> console.log(err))
    }
}

const initialState = {
    borrows: [],
    loadingborrow: true,
    addborrow: [],
    loadingAddborrow: true,
    deleteborrow:[],
    detailborrow:[],
    updateborrow:[]
}

export const borrowsSlice = createSlice({
    name: "borrows",
    initialState,
    reducers: {
        borrowsData(state, action) {
            state.borrows = action.payload
            state.loadingborrow = false
        },
        addborrowData(state, action) {
            state.addborrow = action.payload
            state.loadingAddborrow = false
        },
        deleteborrowData(state, action) {
            state.deleteborrow = action.payload
        },
        detailborrowData(state, action) {
            state.detailborrow = action.payload
        },
        updateborrowData(state, action) {
            state.updateborrow = action.payload
        }
    },
});

export const { borrowsData, addborrowData ,deleteborrowData,detailborrowData,updateborrowData} = borrowsSlice.actions;
export default borrowsSlice.reducer;
