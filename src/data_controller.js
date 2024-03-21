// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32.5,
//         address: 'Sydney No. 1 Lake Park',
//     },
//     {
//         key: '4',
//         name: 'Jim Red',
//         age: 32,
//         address: 'London No. 2 Lake Park',
//     },
//     {
//         key: '5',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: '6',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
//     {
//         key: '7',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//     },
// ];

import data from './data.json'

export const people = {
    "thanh": 'Thành KL',
    "ha": 'Hà',
    "an": 'An',
}

// const data_js = [
//     {
//         key: "1",
//         name: "Thành KL",
//         cost: 14000,
//         item: "hành, sả, tỏi, rau",
//         add_date: "10/09/2023",
//         note: "mua thay"
//     },
//     {
//         key: "2",
//         name: "Hà",
//         cost: 150000,
//         item: "thịt",
//         add_date: "07/08/2023",
//         note: ""
//     }
// ]

// console.log(JSON.stringify(data))

export const identity_data = 100

const date_formatter = (date) => {
    const [day, month, year] = date.split('/')
    return month + '/' + day + '/' + year
}

const now_date = new Date((date_formatter('16/09/2023')))
console.log(now_date)
console.log(now_date.toLocaleDateString('pt-PT'))

export default data