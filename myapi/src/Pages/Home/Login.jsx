
import { Link, useNavigate } from "react-router-dom"
import { useState,useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

export default function LoginPage(){
    return(<>
    <div className="login">
        <Link to="/" >
            <button className="btn custom"><i style={{fontSize:"20px"}} className="fa fa-sharp fa-solid fa-house my-text"></i> Home</button>
        </Link>
    </div>
    {Login()}
    </>)
}

function Login(){
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const [ inputs,setInputs ] = useState({
        user_name:"",
        user_password:""
    })
    // console.log(inputs)
        const handleSet = (e)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
        }
    
    const handleLogin = async(e)=>{
        e.preventDefault()
            try{
                // alert("welcome")
                await axios.post("https://af-api.khadijacharityfoundation.com//auth/login",inputs)
                await login(inputs)
                alert(`Welcome ${inputs.user_name}`)
                navigate('/')

            }catch(error){
                // console.log(error) 
                // alert("Please Check Your Username Or Password")
                document.getElementById("show").innerHTML=error.response.data.error;
                document.getElementById("show").style="display:block;font-size:15px;";
                setTimeout(()=>{
                document.getElementById("show").style="display:none;";
                },4000)

            }
    }
    return(<>
    <div className="container-md my-5 login">
        <center>

                    <div className="alert alert-danger" id="show" style={{display:"none"}}></div>
        </center>
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <center>
                    <h1 className="my-5 my-text fw-bold display-2">Login</h1>
                    <form action="">
                        <input type="text" className="form-control" name="user_name" placeholder="User Name" onChange={handleSet} />
                        <input type="password" className="form-control my-3" name="user_password" placeholder="Password" onChange={handleSet} />
                        <button className="btn custom form-control mb-3" onClick={handleLogin}>Login</button>
                        <span>
                            <Link to="/register" className="userLink">I don't have account ? Register</Link>
                        </span>
                    </form>
                </center>
            </div>
            <div className="col-md-4"></div>
        </div>
    </div>
    </>)
}