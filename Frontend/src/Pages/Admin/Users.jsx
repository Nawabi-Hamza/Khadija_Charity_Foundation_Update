
import { AuthContext, preApi } from "../context/AuthContext"
import LoginPage from "../Home/Login"
import { UserNotAdmin } from "./HomeAdmin"
import NavbarDashboard from "./Navbar"
import { useState,useContext, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
// import { apiDomain } from "../../App"


export default function UsersDashboard(){
    const { currentUser } = useContext(AuthContext)
    return(<>
        {currentUser?
        currentUser.user_type==="Admin"||currentUser.user_type==="Super Admin" ?
            <>
            <NavbarDashboard/>
            {CreateNewUser()}
            {/* {ShowAllUser()} */}
            </>
        :<>{UserNotAdmin()} <LoginPage/></>
        :
        <LoginPage/>
        }
    </>)
}



function CreateNewUser(){
    // console.log(preApi)
    const { currentUser } = useContext(AuthContext)
    const config = {
        headers: { Authorization: `Bearer ${currentUser.token}`}
    }
    const [ count,setCount ] = useState(0)
    // =============Show Users==============
    const [ user,setUser ] = useState([])
    const fetchData = async()=>{
        try{
            const res = await axios.get(`${preApi}/auth/users`,config)
            setUser(res.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[count])
    // ============Make Admin User==========
    const handleAdmin = async(admin)=>{
            try{
                if(admin.user_type==="User"){
                    await axios.post(`${preApi}/auth/users/edite/admin/${admin.user_id}`,{
                    user_type:"Admin"
                    },config)
                    setCount(count + 1)
                    document.getElementById("showDelete").innerHTML= "User Become Admin...";
                    document.getElementById("showDelete").style= "display:block";
                    setTimeout(()=>{
                    document.getElementById("showDelete").innerHTML= "";
                    document.getElementById("showDelete").style= "display:none";
                    },3000)
                    // alert("User Become Admin...")
                }else if(admin.user_type==="Admin"){
                    await axios.post(`${preApi}/auth/users/edite/admin/${admin.user_id}`,{
                    user_type:"User"
                    },config)
                    setCount(count + 1)
                    document.getElementById("showDelete").innerHTML= "User Become Standard...";
                    document.getElementById("showDelete").style= "display:block";
                    setTimeout(()=>{
                    document.getElementById("showDelete").innerHTML= "";
                    document.getElementById("showDelete").style= "display:none";
                    },3000)
                    // alert("User Become Simple...")
                }else{
                    alert("You Con Not Change This User...")
                }
            }catch(error){
                console.log(error)
            }
    }
    // =============Delete User=============
    const handleDelete = async(userId)=>{ 
        // alert("Delete User "+userId)
        try{
            await axios.post(`${preApi}/auth/users/delete/${userId}`,{headers: { Authorization: `Bearer ${currentUser.token}`}})
            // alert("User Deleted Successfuly...")
            setCount(count + 1)
            document.getElementById("showDelete").innerHTML= "User Deleted Successfuly...";
            document.getElementById("showDelete").style= "display:block";
            setTimeout(()=>{
            document.getElementById("showDelete").innerHTML= "";
            document.getElementById("showDelete").style= "display:none";
            },4000)


        }catch(error){
            console.log(error)
        }

    }
    return(<>
    <div className="container-fluid showAllUserFade">
    <div className="container-md">
        <div className="row mt-5 table-responsive">
            <span className="alert alert-success" style={{display:"none"}} id="showDelete"></span>
        <table className="table table-danger table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {user.map((items)=>(
                <tr key={items.user_id}>
                    <td className="p-3">{items.user_id}</td>
                    <td  style={{width:"100px",height:"40px"}}>{items.user_image==="" ? 
                        <div className="btn d-flex justify-content-center align-items-center" style={{fontSize:"20px"}}><i className="fa-solid fa-user"></i></div>
                        :<img src={items.user_image} style={{width:"100%",height:"40px",objectFit:"cover"}} alt="NotImage" />
                        }</td>
                    <td>{items.user_name}</td>
                    <td>{items.user_email}</td>
                    <td>{items.user_type}</td>
                    <td >
                        {items.user_type=== "User" || items.user_type === "Admin" ?<>
                        <Link to={`/dashboard/users/${items.user_id}`} state={items}>
                            <button className=" btn btn-primary" style={{width:"55px"}}><i className="fa-solid fa-pen-to-square"></i></button>
                        </Link>
                        <button className=" btn btn-danger" style={{width:"55px"}} onClick={()=>handleDelete(items.user_id)}><i className="fa fa-solid fa-trash-can"></i></button>
                        {items.user_type === "User" ?
                        <button className=" btn btn-dark" style={{width:"110px"}} onClick={(e)=>
                            handleAdmin(items)}>Set Admin</button>
                            :
                            <button className=" btn btn-dark" style={{width:"110px"}} onClick={(e)=>
                                handleAdmin(items)}>Set User</button>
                        }
                     
                        </>
                        :null}
                      
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
    </div>
    </>)
}

// function ShowAllUser(){
//     return(<>
    
    
//     </>)
// }