import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import './Users.css';

const Users = () => {

    const [input,setInput]=useState("");
    const [data,setData]=useState([]);
    const [originalData,setOriginalData] = useState([]);

    useEffect(() => {

        fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
        .then(res=>res.json())
        .then(res=>{
            setData(res);
            setOriginalData(res);
        })
        .catch(error=>console.log(error))
    },[])

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e) =>{
        if(e.key === 'Enter'){
            handleSearch(input);
        }
    }

    const handleSearch = (item) => {
        if(item.length < 2){
            alert("Please enter at least 2 characters");
        }else{
            let filterData=data.filter(user => {
                return user.fullName.toLowerCase().includes(item.toLowerCase());
            });
            setData(filterData);
        }
    }

    const resetSearch = () => {
        setInput("");
        setData(originalData);
        const searchValue=document.getElementById("searchField");
        searchValue.value="";
    }

    return (
        <>
            <Header/>
            <div className='user-page'>
                <h1 className='heading'>Users</h1>
                <div className='user-container'>
                    <div className='search-container'>
                        <div>
                            <input 
                                id='searchField'
                                onChange={handleChange}
                                type='text'
                                value={input}
                                onKeyDown={handleKeyDown}
                                name='search'
                                placeholder='Search by Name'
                            />
                            <button className='reset-button' onClick={resetSearch}>Reset</button>
                        </div>
                    </div>
                    <div style={{width:'100%'}}>
                        <table className='user-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Avatar</th>
                                    <th>Full Name</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Current Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item =>{
                                    return(
                                        <tr className='userList' key={item.id}>
                                            <td className='light-font'>{item.id}</td>
                                            <td><img src={item.profilePic} alt="avatar"/></td>
                                            <td className='light-font'>{item.fullName}</td>
                                            <td className='dark-font'>{item.dob}</td>
                                            <td className='light-font'>{item.gender}</td>
                                            <td className='light-font'>{item.currentCity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users
