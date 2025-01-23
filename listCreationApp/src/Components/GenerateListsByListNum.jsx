import React, { useEffect, useRef, useState } from "react";

function GenerateListsByListNum(props) {

    const [lists, setLists] = useState([]);
    const list1Ref=useRef();
    const list2Ref=useRef();
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
    const insertNewList=()=>{
        if(list1Ref.current.checked==true && list2Ref.current.checked==true){
            var ele=document.getElementById("list3");
            var btn1=document.getElementById("updatebtn");
            var btn2=document.getElementById("cancelbtn")
            ele.classList.remove("d-none");
            btn1.classList.remove("disabled");
            btn2.classList.remove("disabled");
        }else{
            alert("You should select exactly 2 lists to create a new list");
        }
    }
    const moveListItem=(event)=>{
        
        if(document.getElementById("list3").classList.contains("d-none")==false){
            //var id=event.target.closest().id;
            //find element of above id
    
            var eleToCopy=event.currentTarget || event.target.closest(".card");
            if(!eleToCopy){
                alert("Element to move not found");
                return;
            }
            var cloneEle=eleToCopy.cloneNode(true);

            cloneEle.addEventListener("click", moveBackListItem);
            //get the target
            var targetEle=document.getElementById("list3div");

            //append to target element
            targetEle.append(cloneEle);

            //remove the element left or right list
            eleToCopy.remove();
        }
    }
    const moveBackListItem=(event)=>{
        var eleToCopy=event.currentTarget || event.target.closest(".card");
        if(!eleToCopy){
            alert("Element to move not found");
            return;
        }
        var cloneEle=eleToCopy.cloneNode(true);
        cloneEle.addEventListener("click",moveListItem);
        var targetEle;
        var name=cloneEle.getAttribute("name");
        if(name==="l1"){
            targetEle=document.getElementById("list1div");
        }else{
            targetEle=document.getElementById("list2div");
        }
        targetEle.append(cloneEle);
        eleToCopy.remove();
    }

    const handleCancel=()=>{
        window.location.reload();
    }

    const handleUpdate=()=>{
        alert("Lists updated");
    }

    useEffect(() => {
        createLists();
    }, [props.apiData])

    return (
        <>
            <div className="container">
                <div className="col d-flex flex-column align-items-center mt-2">
                    <div className="row">
                        <h3>List Creation</h3>
                    </div>
                    <div>
                        <button onClick={insertNewList} className="btn btn-primary">Create a new List</button>
                    </div>
                </div>

            </div>

            <div className="container ">
                <div className="row">

                    <div className="col-sm-3" style={{ height: "72vh", backgroundColor: "#e6f5ff", marginTop: "1rem", marginRight: "1rem" }}>
                        <div className="row m-3">
                            <input ref={list1Ref} className="col-sm-2 " type="checkbox" style={{ width: "auto" }}></input>
                            <div className="col">List 1</div>
                        </div>
                        <div className="col" style={{ height: "57vh", overflowY: "auto", marginTop: "1rem" }}>

                            <div className="col m-1" id="list1div" style={{ overflow: "none" }} >
                                {lists.length > 0 && lists[0].map((item,index) => (
                                    <div className="card m-1" id={`list3-${index}`} name="l1" role="button" onClick={moveListItem}>
                                        <div className="p-2"><h6>{item.name}</h6>
                                            <div>{item.description}</div></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 d-none" id="list3" style={{ height: "72vh", backgroundColor: "#e6f5ff", marginTop: "1rem", marginRight: "1rem" }}>
                        <div className="row m-3">
                            <input className="col-sm-2 " type="checkbox" style={{ width: "auto" }}></input>
                            <div className="col">List 3</div>
                        </div>
                        <div className="col" style={{ height: "57vh", overflowY: "auto", marginTop: "1rem" }}>

                            <div className="col m-1" id="list3div" style={{ overflow: "none" }}>

                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3" style={{ height: "72vh", backgroundColor: "#e6f5ff", marginTop: "1rem", marginRight: "1rem" }}>
                        <div className="row m-3">
                            <input className="col-sm-2 " ref={list2Ref} type="checkbox" style={{ width: "auto" }}></input>
                            <div className="col">List 2</div>
                        </div>
                        <div className="col" style={{ height: "57vh", overflowY: "auto", marginTop: "1rem" }}>

                            <div className="col m-1" id="list2div" style={{ overflow: "none" }}>
                                {lists.length > 1 && lists[1].map((item,index) => (
                                    <div className="card m-1 " id={`list2-${index}`} role="button" name="l2" onClick={moveListItem}>
                                        <div className="p-2"><h6>{item.name}</h6>
                                            <div>{item.description}</div></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>



                </div>

            </div>

            <div class="container">
                <div class="row mt-4 align-items-center justify-content-center">
                    <button id="updatebtn" onClick={handleUpdate} class="btn btn-primary col-sm-1 m-1 disabled">Update</button>
                    <button id="cancelbtn" onClick={handleCancel} class="btn btn-primary col-sm-1 disabled">Cancel</button>
                </div>
            </div>


        </>
    )
}
export default GenerateListsByListNum