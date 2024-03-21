import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedKey: '1',
    dateRangeByMonth: '',
    dateRangeByRange: ['', '']
}

export const dateRangePickerSlice = createSlice({
    name: 'dateRangePicker',
    initialState,
    reducers: {
        setDateRangeByMonth: (state, action) => {
            state.dateRangeByMonth = action.payload
        },
        setDateRangeByRange: (state, action) => {
            state.dateRangeByRange = action.payload
        },
        setSelectedKey: (state, action) => {
            state.selectedKey = action.payload
        }
    }
})

export const {
    setSelectedKey,
    setDateRangeByMonth,
    setDateRangeByRange,
} = dateRangePickerSlice.actions;

export const selectSelectedKey = (state) => state.dateRangePicker.selectedKey;

export const selectDateRangeByMonth = (state) => state.dateRangePicker.dateRangeByMonth;

export const selectDateRangeByRange = (state) => state.dateRangePicker.dateRangeByRange;

export const selectConvertedDateRange = (state) => {
    const dateRangeByMonth = selectDateRangeByMonth(state)
    const dateRangeByRange = selectDateRangeByRange(state)
    const selectedKey = selectSelectedKey(state)

    if (selectedKey === '1') {
        if (dateRangeByMonth === '')
            return []

        const dateString = dateRangeByMonth
        const year = dateString.split('/')[1]
        const month = dateString.split('/')[0]
        const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()

        return [`${month}/01/${year} 00:00:00`, `${month}/${getDaysInMonth(year, month)}/${year} 23:59:59`]
    }
    if (selectedKey === '2') {
        if (dateRangeByRange[0] === '' && dateRangeByRange[1] === '')
            return []

        const dateString = dateRangeByRange
        const start_year = dateString[0].split('/')[2]
        const start_month = dateString[0].split('/')[1]
        const start_day = dateString[0].split('/')[0]

        const end_year = dateString[1].split('/')[2]
        const end_month = dateString[1].split('/')[1]
        const end_day = dateString[1].split('/')[0]

        return [`${start_month}/${start_day}/${start_year} 00:00:00`, `${end_month}/${end_day}/${end_year} 23:59:59`]
    }
};

export default dateRangePickerSlice.reducer;