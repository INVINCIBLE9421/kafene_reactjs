import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import './Orders.css';
const Orders = () => {

    const [orderList, setOrderList] = useState([]);
    const [count,setCount]=useState(0);
    const [filters,setFilters]=useState({
        New:true,
        Packed:true,
        InTransit:true,
        Delivered:true
    });

    const getOrders=async () => {
        const response = await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders');
        const json = await response.json();
        setOrderList(json);
        setCount(json.length)
    }

    useEffect(() => {
        getOrders();
        setCount(orderList.length);
    },[orderList.length]);

    const getInput = (e) => {
        const {name,checked} = e.target;
        setFilters(prevFilter => {
            const nextFilter = {...prevFilter,[name]: checked}
            const lengthCount = orderList.filter(order => nextFilter[order.orderStatus] !== false)
            setCount(lengthCount.length);
            return nextFilter;
        });
    }

    return (
        <>
            <Header/>
            <div className='order-page'>
                <h1 className='heading'>Orders</h1>
                <div className='order-container'>
                    <div className='filter-container'>
                        <h3>Filters</h3>
                        <div className='filter-option'>
                            <span id='count'>Count : {count} </span>
                            <label className='check-box'><input type='checkbox' name='New'       onChange={getInput} checked={filters.New}      />New</label>
                            <label className='check-box'><input type='checkbox' name='Packed'    onChange={getInput} checked={filters.Packed}   />Packed</label>
                            <label className='check-box'><input type='checkbox' name='InTransit' onChange={getInput} checked={filters.InTransit}/>InTransit</label>
                            <label className='check-box'><input type='checkbox' name='Delivered' onChange={getInput} checked={filters.Delivered}/>Delivered</label>
                        </div>
                    </div>
                    <div style={{width:'100%'}}>
                        <table className='order-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id='table-body'>
                                {orderList && orderList.filter(order => filters[order.orderStatus] !== false)
                                                    .map((data) => {
                                                        return <tr class='orderList' key={data.id}>
                                                            <td class='light-font'>{data.id}</td>
                                                            <td class='dark-font'>{data.customerName}</td>
                                                            <td class='dark-font'>{data.orderDate}<br/><span class='light-font'>{data.orderTime}</span></td>
                                                            <td class='light-font'>${data.amount}</td>
                                                            <td class='dark-font'>{data.orderStatus}</td>
                                                        </tr>
                                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders
