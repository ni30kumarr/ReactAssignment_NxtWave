import React, { useEffect, useState } from "react";

function GenerateListsByListNum(props) {

    const [lists, setLists] = useState([]);

    const createLists = () => {
        var tempLists = [];
        props.apiData.lists && props.apiData.lists.forEach(item => {
            var listNum = item.list_number;
            if (listNum <= tempLists.length) {
                tempLists[listNum - 1].push(item);
            } else {
                var list = [];
                list.push(item);
                tempLists.push(list);
            }
        });
        setLists(tempLists);
    }

    useEffect(() => {
        createLists();
    }, [props.apiData])

    useEffect(() => {
        console.log("list length " + lists.length);

    }, [lists]);

    return (
        <>

            {
                <div className="container ">
                    <div className="row">
                        {
                            lists.length > 0 && lists.map((list,index) => (
                                <div className="col-sm-4" style={{height:"97vh",backgroundColor:"#e6f5ff",marginTop:"1rem",marginRight:"1rem"}}>
                                    <div className="row m-3">
                                        <input className="col-sm-2 " type="checkbox" style={{width:"auto"}}></input>
                                        <div className="col">List {index+1}</div>
                                    </div>
                                    <div className="col" style={{height:"90vh",overflowY:"auto",marginTop:"1rem"}}>
                                        
                                        <div className="col m-1" style={{overflow:"none"}}>
                                            {list.map((item) => (
                                                <div className="card m-1">
                                                    <div className="p-2"><h6>{item.name}</h6>
                                                    <div>{item.description}</div></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    
                </div>
                
            }
        </>
    )
}
export default GenerateListsByListNum