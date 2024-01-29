import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import './Products.css'

const Products = () => {

    const [data,setData]=useState([]);
    const [filteredData,setFilteredData]=useState([]);
    const [selectedCheckbox,setSelectedCheckbox]=useState([]);

    useEffect(()=>{

        fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
        .then(res=>res.json())
        .then(res=>setData(res))
        .catch(error=>console.log(error))
    },[])

    const handleChange = (e) => {
        const value = e.target.value;
        if(selectedCheckbox.includes(value)){
            setSelectedCheckbox(selectedCheckbox.filter(item=>item!==value));
        }else{
            setSelectedCheckbox([...selectedCheckbox,value]);
        }
    }

    useEffect(()=>{
        if(selectedCheckbox.includes("Lowstock")&&selectedCheckbox.includes("expiryDate")){
            let filterData=[];
            setFilteredData(filterData);
        }else if(selectedCheckbox.includes("Lowstock")) {
            let filterData = data.filter((item) => {
                return item.stock < 100;
            })
            setFilteredData(filterData)
        } else if (selectedCheckbox.includes("expiryDate")) {
            const currentDate = new Date();
            let filteredData = data.filter((item) => {
                const itemDate = new Date(item.expiryDate.replace(/,/g, ""));
                return itemDate < currentDate
            })
            setFilteredData(filteredData)
        } else {
            setFilteredData(data)
        }
    },[data, selectedCheckbox])

    return (
        <>
            <Header/>
            <div className='product-page'>
                <h1 className='heading'>Products</h1>
                <div className='product-container'>
                    <div className='filter-container'>
                        <h3>Filters</h3>
                        <div className='filter-option'>
                            <span id='count'>Count : {filteredData.length} </span>
                            <label className='check-box'><input type='checkbox' name='expiryDate'  onChange={handleChange} value="expiryDate" />Expired</label>
                            <label className='check-box'><input type='checkbox' name='lowStock'    onChange={handleChange} value="Lowstock"   />LowStock</label>
                        </div>
                    </div>
                    <div style={{width:'100%'}}>
                        <table className='product-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Product Brand</th>
                                    <th>Expiry Date</th>
                                    <th>Unit Price</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody id='table-body'>
                                {filteredData.map((item) => {
                                    return (<tr class='productList' key={item.id}>
                                        <td class='light-font'>{item.id}</td>
                                        <td class='dark-font'>{item.medicineName}</td>
                                        <td class='light-font'>{item.medicineBrand}</td>
                                        <td class='dark-font'>{item.expiryDate}</td>
                                        <td class='light-font'>${item.unitPrice}</td>
                                        <td class='light-font'>{item.stock}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
