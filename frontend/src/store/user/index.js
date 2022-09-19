import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const get_customers =  () => {
    return async (dispatch) => {

        const {data} = await axios.get('http://localhost:8000/api/customers')

        dispatch(customersData(data.data))
    }
}

export const add_customer = (data) => {
    return (dispatch) => {
        axios
            .post('http://localhost:8000/api/customers', data)
            .then((res) => {
                let result = res.data
                dispatch(addcustomerData(result))
            })
            .catch((err) => console.log(err))
    }
}

export const delete_customer = (id) => {
    return (dispatch) => {
        axios
            .delete('http://localhost:8000/api/customers/' + id)
            .then((res)=>{
                let result = res.data
                dispatch(deletecustomerData(result))
            })
            .catch((err) => console.log(err))
    }
}

export const detail_customer = (data)=>{
    return (dispatch)=>{
        dispatch(detailcustomerData(data))
    }
}

export const update_customer = (data)=>{
    return (dispatch) =>{
        axios
        .put(`http://localhost:8000/api/customers/${data.id}`,data)
        .then((res)=>{
            let result = res.data
            dispatch(updatecustomerData(result))
        })
        .catch((err)=> console.log(err))
    }
}

const initialState = {
    customers: [],
    loadingcustomer: true,
    addcustomer: [],
    loadingAddcustomer: true,
    deletecustomer:[],
    detailcustomer:[],
    updatecustomer:[]
}

export const customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        customersData(state, action) {
            state.customers = action.payload
            state.loadingcustomer = false
        },
        addcustomerData(state, action) {
            state.addcustomer = action.payload
            state.loadingAddcustomer = false
        },
        deletecustomerData(state, action) {
            state.deletecustomer = action.payload
        },
        detailcustomerData(state, action) {
            state.detailcustomer = action.payload
        },
        updatecustomerData(state, action) {
            state.updatecustomer = action.payload
        }
    },
});

export const { customersData, addcustomerData ,deletecustomerData,detailcustomerData,updatecustomerData} = customersSlice.actions;
export default customersSlice.reducer;
