import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import LoginPage from "./Login"
// import { apiDomain } from "../../App"





export default function UpdateUserProfile(){
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const state = useLocation().state
    // console.log(state)
    // const [ file,setFile ] = useState()
    const [ name,setName ] = useState(state?.user_name || "")
    const [ email,setEmail ] = useState(state?.user_email || "")
    const [ password,setPassword ] = useState("")
    const [ password2,setPassword2 ] = useState("")

    // const upload = async()=>{
    //     try{
    //     const formData = new FormData();
    //     formData.append("file",file)
    //     const res = await axios.post("https://myapi.khadijacharityfoundation.com/upload",formData)
    //     return res.data;
    //     }catch(error){
    //     console.log(error)
    //     }
    // }
    const updateUser = async(e)=>{
        e.preventDefault()
        if(name===""||email===""||password===""||password2===""){
            document.querySelector(".alert-danger").style="display:block;"
                document.querySelector(".alert-danger").innerHTML="Plase Fill All Field..."
            // alert("Plase Fill All Field...")
            setTimeout(()=>{
                document.querySelector(".alert-danger").style="display:none;"
                document.querySelector(".alert-danger").innerHTML=""
            },4000)
        }else{
            if(password===password2){
                // const imgUrl = await upload()
                try{
                    await axios.post(`https://myapi.khadijacharityfoundation.com/auth/users/edite/${state.user_id}`,{
                        user_name:name,
                        user_email:email,
                        user_password:password,
                        user_type:state.user_type,
                        // user_image:file? imgUrl:""
                    })
                    // alert("you can update single user")
                    navigate("/profile")
                }catch(error){
                    console.log(error)
                }
            }else{
                document.querySelector(".alert-danger").style="display:block;"
                document.querySelector(".alert-danger").innerHTML="Please Type Same Password..."
                setTimeout(()=>{
                    document.querySelector(".alert-danger").style="display:none;"
                    document.querySelector(".alert-danger").innerHTML=""
                },4000)
                // alert("Please Type Same Password...")
            }

        }
    }
    return(<>
    {currentUser?
    <div className="container-md">
        <div className="row py-4 my-md-5">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <form>
                    <div className="alert alert-danger" style={{display:"none"}}></div>
                    {/* <input type="file" className="form-control my-3" onChange={(e)=>setFile(e.target.files[0])} placeholder="Image" name="" id=""  /> */}
                    <input type="text" value={name} className="form-control my-3" placeholder="Username" onChange={((e)=>setName(e.target.value))} />
                    <input type="text" value={email} className="form-control my-3" placeholder="Email" onChange={((e)=>setEmail(e.target.value))}/>
                    <input type="text" value={password} className="form-control my-3" placeholder="New Password" onChange={((e)=>setPassword(e.target.value))}/>
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