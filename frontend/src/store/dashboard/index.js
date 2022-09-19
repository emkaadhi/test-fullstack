import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const get_oneMonth = () => {
    return async (dispatch) => {
        const  data  = await axios.get('http://localhost:8000/api/onemonth')
        dispatch(oneMonthData(data.data.data.result[0].Jumlah))
    }
}

export const get_sixMonth = () => {
    return async (dispatch) => {
        const  data  = await axios.get('http://localhost:8000/api/sixmonth')
        dispatch(sixMonthData(data.data.data.result[0].Jumlah))
    }
}

export const most_Borrow = () => {
    return async (dispatch) => {
        const  {data}  = await axios.get('http://localhost:8000/api/mostborrow')
        dispatch(mostBorrowData(data.data.results))
    }
}




const initialState = {
    oneMonth: [],
    loadingOneMonth: true,
    sixMonth: [],
    loadingSixMonth: true,
    mostBorrow: [],
    loadingMostBorrow: true,
}

export const dashboardsSlice = createSlice({
    name: "dashboards",
    initialState,
    reducers: {
        oneMonthData(state, action) {
            state.oneMonth = action.payload
            state.loadingOneMonth = false
        },
        sixMonthData(state, action) {
            state.sixMonth = action.payload
            state.loadingSixMonth = false
        },
        mostBorrowData(state, action) {
            state.mostBorrow = action.payload
            state.loadingMostBorrow = false
        },
    },
});

export const { oneMonthData ,sixMonthData,mostBorrowData} = dashboardsSlice.actions;
export default dashboardsSlice.reducer;
