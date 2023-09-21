import {createSlice} from "@reduxjs/toolkit";
// import data from '../../data.json'

const initialState = {
    itemData: [],
    status: "idle",
};

export const tableItemsSlice = createSlice({
    name: 'tableItems',
    initialState,
    reducers: {
        fetchItems: (state) => {
            state.status = "loading-fetch"
        },
        fetchItemsSuccess: (state, action) => {
            state.status = 'fetch-success'
            state.itemData = action.payload
        },
        fetchItemsError: (state, action) => {
            state.status = 'fetch-fail'
            console.log(action.payload)
        },
        addItemSaga: (state, action) => {
            state.status = 'loading-add'
        },
        addItemSagaSuccess: (state) => {
            state.status = 'add-success'
        },
        addItemSagaFail: (state) => {
            state.status = 'add-fail'
        },
        deleteItemsSaga: (state, action) => {
            state.status = 'loading-delete'
        },
        deleteItemsSagaSuccess: (state) => {
            state.status = 'delete-success'
        },
        deleteItemsSagaFail: (state) => {
            state.status = 'delete-fail'
        },
    }
})

export const { fetchItems,
    fetchItemsSuccess,
    fetchItemsError,
    addItemSaga,
    addItemSagaSuccess,
    addItemSagaFail,
    deleteItemsSaga,
    deleteItemsSagaSuccess,
    deleteItemsSagaFail
} = tableItemsSlice.actions;

export const selectItemsData = (state) => state.tableItems.itemData;

export const selectStatus = (state) => state.tableItems.status;

export const selectSumBill = (state) => {
    const data = selectItemsData(state)
    return data.reduce((accumulator, object) => accumulator + object.cost, 0)
}

export const selectOnePersonBill = (state) => (person) => {
    const data = selectItemsData(state)
    return data.reduce((accumulator, object) => accumulator + (object.name === person ? object.cost : 0), 0)
};

export default tableItemsSlice.reducer;