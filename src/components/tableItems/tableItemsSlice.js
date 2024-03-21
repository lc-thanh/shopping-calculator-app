import {createSelector, createSlice} from "@reduxjs/toolkit";
import {
    selectConvertedDateRange,
} from "../../features/ReceiptsTable/DateRangePicker/dateRangePickerSlice";
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
        updateItemSaga: (state, action) => {
            state.status = 'loading-update'
        },
        updateItemSagaSuccess: (state) => {
            state.status = 'update-success'
        },
        updateItemSagaFail: (state) => {
            state.status = 'update-fail'
        },
        // setDateRange: (state, action) => {
        //     state.dateRange = action.payload
        //     console.log(state.dateRange)
        // },
    }
})

export const {
    fetchItems,
    fetchItemsSuccess,
    fetchItemsError,
    addItemSaga,
    addItemSagaSuccess,
    addItemSagaFail,
    deleteItemsSaga,
    deleteItemsSagaSuccess,
    deleteItemsSagaFail,
    updateItemSaga,
    updateItemSagaSuccess,
    updateItemSagaFail,
    // setDateRange,
} = tableItemsSlice.actions;

const selectItemsData = (state) => state.tableItems.itemData;

export const selectFilteredItemsData=
    createSelector(
        [selectItemsData, selectConvertedDateRange],
        (itemsData, dateRange) => {

        // const itemsData = selectItemsData(state)
        // const dateRange = selectConvertedDateRange(state)

        if (dateRange.length === 0) {
            return itemsData
        }

        return itemsData.filter((item) => {
            const add_date = new Date(Number(item.add_date))
            const start_date = new Date(dateRange[0])
            const end_date = new Date(dateRange[1])

            return (start_date <= add_date) && (add_date <= end_date)
        })
    }
)

// ===== THIS FUNCTION ISN'T MEMOIZED SELECTOR =====
// export const selectFilteredItemsData = (state) => {
//     const itemsData = selectItemsData(state)
//     const dateRange = selectConvertedDateRange(state)
//
//     if (dateRange.length === 0) {
//         return itemsData
//     }
//
//     return itemsData.filter((item) => {
//         const add_date = new Date(Number(item.add_date))
//         const start_date = new Date(dateRange[0])
//         const end_date = new Date(dateRange[1])
//
//         return (start_date <= add_date) && (add_date <= end_date)
//     })
// }

export const selectStatus = (state) => state.tableItems.status;

export const selectSumBill = (state) => {
    const data = selectFilteredItemsData(state)
    return data.reduce((accumulator, object) => accumulator + object.cost, 0)
}

export const selectOnePersonBill = (state) => (person) => {
    const data = selectFilteredItemsData(state)
    return data.reduce((accumulator, object) => accumulator + (object.name === person ? object.cost : 0), 0)
};

// ===== THIS FUNCTION IS MEMOIZED SELECTOR =====
export const onePersonSumBillSelector=
    createSelector([selectOnePersonBill], (onePersonBill) => {
        return onePersonBill
    })

export default tableItemsSlice.reducer;