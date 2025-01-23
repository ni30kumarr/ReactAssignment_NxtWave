import React, { useEffect, useState } from 'react'
import GenerateListsByListNum from './generateListsByListNum';

function FetchApiData() {
    const url=`https://apis.ccbp.in/list-creation/lists`;
    const[data,setData]=useState([]);
    const getApiData= async()=>{
        await fetch(url).then(res=>res.json()).then((result)=>{
            //console.log(data);
            setData(result);
            console.log(result);
        })
    }
    useEffect( function(){
        const getApiDataasync=async()=>{
            await getApiData();
        }
        getApiDataasync();
    },[]);
  return (
    <div>
       <GenerateListsByListNum apiData={data}/>
    </div>
  )
}

export default FetchApiData
