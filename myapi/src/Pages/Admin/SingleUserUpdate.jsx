import axios from "axios"
import { useContext,useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import LoginPage from "../Home/Login"
import NotPage from "../PageNotFound"
import NavbarDashboard from "./Navbar"



export default function UpdateSingleUser(){

 const { currentUser } = useContext(AuthContext)    
 return(<>
 {currentUser?
    <>
    {currentUser.user_type==="Admin" || currentUser.user_type==="Super Admin" ?
    <>
    <NavbarDashboard/>
    {Update()}
    </>: <NotPage/>
    }
    </>
 :<LoginPage/>}
 </>
 )
}

function Update(){
    const navigate = useNavigate()
    var state = useLocation().state
    // =============Edite Users=============
    const [ name,setName ] = useState(state?.user_name || "")
    const [ email,setEmail ] = useState(state?.user_email || "")
    const [ password,setPassword ] = useState("")
    const [ type,setType ] = useState(state?.user_type || "")
        const handleUpdate = async(e)=>{
            e.preventDefault()
            // alert(`Name : ${state.user_id} , email: ${email} , type: ${type} ,password: ${password} ,`)
            if(name===""||email===""||password===""||type===""){
                alert("Please Fill All Field")
            }else{
                try{
                    await axios.patch(`https://af-api.khadijacharityfoundation.com//auth/users/${state.user_id}`,{user_name:name,
                    user_email: email,
                    user_password: password,
                    user_type:type,
                    })
                    navigate("/dashboard/users")
                }catch(error){
                    console.log(error)
                }
            }
        }
    return(<>
    <div className="contianer-fluid">
        <div className="container-md">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <div className="mt-3"><input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Username"/></div>
                <div className="mt-3"><input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email"/></div>
                <div className="mt-3"><input type="text"   onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="New Password"/></div>
                <div className="mt-3"><select onChange={(e)=>setType(e.target.value)} className="form-control" id="">
                    <option value="User">Select User Type&gt;</option>
                    <option value="Admin">&gt;Admin</option>
                    <option value="User">&gt;User</option>
                    </select></div>
                <div className="mt-3"><button className="form-control btn btn-warning" onClick={handleUpdate}>Update User</button></div>
                
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    </div>
    </>)
}