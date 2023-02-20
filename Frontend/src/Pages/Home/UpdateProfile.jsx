import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import LoginPage from "./Login"





export default function UpdateUserProfile(){
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const state = useLocation().state
    const [ file,setFile ] = useState()
    const [ name,setName ] = useState(state?.user_name || "")
    const [ email,setEmail ] = useState(state?.user_email || "")
    const [ password,setPassword ] = useState("")
    const [ password2,setPassword2 ] = useState("")

    const upload = async()=>{
        try{
        const formData = new FormData();
        formData.append("file",file)
        const res = await axios.post("http://localhost:5000/upload",formData)
        return res.data;
        }catch(error){
        console.log(error)
        }
    }
    const updateUser = async(e)=>{
        e.preventDefault()
        if(name===""||email===""||password===""||password2===""){
            alert("Plase Fill All Field...")
        }else{
            if(password===password2){
                const imgUrl = await upload()
                try{
                    await axios.patch(`http://localhost:5000/auth/users/${state.user_id}`,{
                        user_name:name,
                        user_email:email,
                        user_password:password,
                        user_type:state.user_type,
                        user_image:file? imgUrl:""
                    })
                    // alert("you can update single user")
                    navigate("/profile")
                }catch(error){
                    console.log(error)
                }
            }else{
                alert("Please Type Same Password...")
            }

        }
    }
    return(<>
    {currentUser?
    <div className="container-md">
        <div className="row py-4 my-md-5">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <form action="">
                    <input type="file" className="form-control my-3" onChange={(e)=>setFile(e.target.files[0])} placeholder="Image" name="" id=""  />
                    <input type="text" value={name} className="form-control my-3" placeholder="Username" onChange={((e)=>setName(e.target.value))} />
                    <input type="text" value={email} className="form-control my-3" placeholder="Email" onChange={((e)=>setEmail(e.target.value))}/>
                    <input type="text" className="form-control my-3" placeholder="New Password" onChange={((e)=>setPassword(e.target.value))}/>
                    <input type="text" className="form-control my-3" placeholder="Try Password" onChange={((e)=>setPassword2(e.target.value))}/>
                    <Link to="/profile">
                    <button className="btn btn-warning form-control my-3" onClick={updateUser}>Update Profile</button>
                    </Link>
                </form>
            </div>
            <div className="col-md-4"></div>
        </div>
    </div>
    :<LoginPage/>
    }
    </>)
}