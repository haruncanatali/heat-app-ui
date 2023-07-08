import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'

const url = "http://localhost:5194/api/Heat"

function Heat() {

    const[heat,setHeat] = useState({})
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(url);
            console.log(response)
            if(response.status === 200){
                setHeat(response.data);
                setAllData(prevData => [...prevData, response.data]);
            }
            else{
                console.log(allData.length)
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        const interval = setInterval(() => {
          fetchData();
        }, 3000);
    
        return () => {
          clearInterval(interval);
        };
      }, [url]);

  return (
    <div className='row p-5'>
        <h1 className='text-center'>Sıcaklık Değerleri</h1>
    <table className='table table-bordered table-striped'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Tarih</th>
          <th>Sıcaklık (C)</th>
        </tr>
      </thead>
      <tbody>
        {allData.length > 0 ? allData.map((row, index) => (
          <tr key={index}>
            <td style={{backgroundColor:row.color, fontWeight:'bold', color:'white'}}>{row.id}</td>
            <td style={{backgroundColor:row.color, fontWeight:'bold', color:'white'}}>{row.createdAt}</td>
            <td style={{backgroundColor:row.color, fontWeight:'bold', color:'white'}}>{row.heatValue}</td>
          </tr>
        )) : null}
      </tbody>
    </table>
    </div>
  )
}

export default Heat
