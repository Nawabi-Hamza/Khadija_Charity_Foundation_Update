
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { preApi } from "../context/AuthContext"
// import { apiDomain } from "../../App"
import ReCAPTCHA from "react-google-recaptcha";



export default function RegisterPage(){
    return(<>
    <div className="register">
        <Link to="/">
            <button className="custom btn"><i style={{fontSize:"20px"}} className="fa fa-sharp fa-solid fa-house my-text"></i> Home</button>
        </Link>
    </div>
    {Register()}
    </>)
}

function Register(){
    const navigate = useNavigate()
    // console.log(preApi)
    const [ name,setName ] = useState("")
    const [ email,setEmail ] = useState("")
    const [ password1,setPassword1 ] = useState("")
    const [ password2,setPassword2 ] = useState("")
    const [ valid,setValid ] = useState(false)

    const show = document.getElementById("show")
    const handleRegisterUser = async(e)=>{
        e.preventDefault()
        // if one of input be empty the user take an alert from browser
        if(name ==="" || email ==="" || password1 ==="" || password2 ==="" || !valid){
            // alert("")
            show.innerHTML="Please Fill All Field .";
            show.style="display:block;";
        }
        // if all input fill and the password be same in inputs then user can register
        else if(password1===password2){
            try{
                await axios.post(`${preApi}/auth/register`,{
                    user_name:name,
                    user_email:email,
                    user_type:"User",
                    user_password:password1
                })
                navigate('/login')

            }catch(error){
                console.log(error.response.data) 
                show.innerHTML=error.response.data.error;
                show.style="display:block;font-size:15px;max-width:500px;position:fixed;left:0;top:60;";
            }
        }
        // if the user password not be same the user take an alert from browser
        else{
            // alert("Please Check Your Password Your Password Must Be Same...!")
            show.innerHTML="Please Check Your Password Your Password Must Be Same...!";
            show.style="display:block;font-size:12px;";
        }
        
    }

    function onChange(value) {
        console.log("Captcha value:", value);
        setValid(!valid)
    }
    return(<>
    <div className="container-md my-5 register">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <center>
                    <h1 className="my-5 my-text fw-bold display-2">Register</h1>
                    <div className="alert alert-danger mb-2" style={{display:"none"}} id="show"></div>

                    <form action="">
                        <input type="text" className="form-control"  placeholder="User Name" onChange={(e)=>setName(e.target.value)} />
                        <input type="email" className="form-control my-3"   placeholder="Email"onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" className="form-control"  placeholder="Password"onChange={(e)=>setPassword1(e.target.value)}  />
                        <input type="password" className="form-control my-3"  placeholder="Confirm Password" onChange={(e)=>setPassword2(e.target.value)} />
                        <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={onChange}
                        />
                        <button className="btn custom form-control my-3" onClick={handleRegisterUser} disabled={!valid}>Register</button>
                        <span>
                            <Link to="/login" className="userLink">I have account ? Login</Link>    
                        </span>
                    </form>
                </center>
            </div>
            <div className="col-md-4"></div>
        </div>
    </div>
    </>)
}