

import axios from "axios"
import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../context/AuthContext"
import LoginPage from "../Home/Login"
import { UserNotAdmin } from "./HomeAdmin"
import NavbarDashboard from "./Navbar"



export default function PostsDashboard(){
    const { currentUser } = useContext(AuthContext)
    return(<>
        {currentUser?
        currentUser.user_type==="Admin" || currentUser.user_type==="Super Admin" ?
            <>
            <NavbarDashboard />
            {Show()}
            </>
        :<>{UserNotAdmin()} <LoginPage/></>
        :
        <LoginPage/>
        }
    </>)
}
function Show(){
    const [ count,setCount ] = useState(0)
    const { currentUser } = useContext(AuthContext)
    const [ file,setFile ] = useState("")
    const [ title,setTitle ] = useState("")
    const [ phone,setPhone ] = useState("")
    const [ address,setAddress ] = useState("")
    const [ description,setDescription ] = useState("")
    const upload = async()=>{
        try{
        const formData = new FormData();
        formData.append("image",file)
        const res = await axios.post("http://localhost:5000/image/upload",formData)
        return res.data.secure_url;
        // const res = await axios.post("http://localhost:5000/image/upload")
        // return res.url;
        }catch(error){
        // console.log(error)
        }
    }
    // console.log(file)
    const hanldInsert = async(e)=>{
        e.preventDefault()
        // setInterval(async() => {
            if(title===""||phone===""||address===""||description===""){
                alert("Please Fill All Inputs....")
            }else{
                document.getElementById("show1").innerHTML="Please Wait ..."
                    document.getElementById("show1").style="display:block;"
                const imgUrl = await upload()
                console.log(imgUrl)
                try{
                    await axios.post("http://localhost:5000/posts",{
                        post_title:title,
                        post_description:description,
                        post_phone:phone,
                        post_Image:file? imgUrl:"",
                        post_address:address,
                        post_user:currentUser.user_id
                    })
                    setCount(count + 1)
                    document.getElementById("show1").innerHTML="Your Post Added Successfuly...";
                    // document.getElementById("show1").style="display:block;"
                    setTimeout(()=>{
                        setFile(null)
                        setTitle("")
                        setPhone("")
                        setAddress("")
                        setDescription("")
                    document.getElementById("show").innerHTML=""
                    document.getElementById("show").style="display:none;"
                    },3000)
                    
                }catch(error){
                    console.log(error)
                }
            }
        // }, 5000);
    }
    // =============Show Posts=================
    const [ show,setShow ] = useState([])
    const fetchData = async()=>{
        try{
            const res = await axios.get("http://localhost:5000/posts")
            setShow(res.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()          
    },[count])
    return(<>
    <div className="contianer-fluid">
        <div className="container-md">
            <div className="row my-md-5 py-3">
                <div className="col-md-6 my-3">
                    <h2 className="my-text">Create New Post</h2>
                    <div className="alert alert-success" style={{display:"none"}} id="show1"></div>
                    <form action="">
                        <input type="file" className="form-control my-3" placeholder="Image"  onChange={(e)=>setFile(e.target.files[0])} />
                        <input type="text" className="form-control my-3" placeholder="Title"  onChange={(e)=>setTitle(e.target.value)}/>
                        <input type="text" className="form-control my-3" placeholder="Phone"  onChange={(e)=>setPhone(e.target.value)} />
                        <input type="text" className="form-control my-3" placeholder="Address"   onChange={(e)=>setAddress(e.target.value)}/>
                        <textarea type="text" rows={5} className="form-control my-3" placeholder="Write More About This Post ...." onChange={(e)=>setDescription(e.target.value)} ></textarea>
                        <button className="btn form-control btn-outline-dark" onClick={hanldInsert}>Create</button>
                    </form>
                </div>
                <div className="col-md-1"> </div>
                <div className="col-md-5 my-3" style={{height:"450px",overflow:"auto"}}>
                    <div className="alert alert-success" style={{display:"none"}} id="show"></div>
                    {show.map((items)=>(
                    <div className="row my-2">
                        <div className="col-4">
                            <img src={`${items.post_Image}`} style={{width:"100%",height:"100px",objectFit:"cover"}} alt="imagepost" />
                        </div>
                        <div className="col-8">
                            <h4 className="d-flex justify-content-between">{items.post_title} <button className="btn btn-sm btn-danger" onClick={async(e)=>{
                                e.preventDefault()
                                const url = `${items.post_Image}`;
                                // console.log(url)
                                const parts = url.split('/');
                                const lastPart = parts[parts.length - 1].replace('.jpg'||'.png'||".jpeg", '');
                                console.log(lastPart)
                                try{
                                    document.getElementById("show").innerHTML="Please Wait..."
                                    document.getElementById("show").style="display:block;"
                                    const res = await axios.delete(`http://localhost:5000/image/delimage/${lastPart}`)

                                    // console.log(res.status)
                                    if(res.status===200){
                                        try{
                                            await axios.delete(`http://localhost:5000/posts/${items.post_id}`)
                                            // alert("Your Post Deleted Successfuly...")
                                            setCount(count + 1)
                                            document.getElementById("show").innerHTML="Your Post Deleted Successfuly..."
                                            // document.getElementById("show").style="display:block;"
                                            setTimeout(()=>{
                                            document.getElementById("show").innerHTML=""
                                            document.getElementById("show").style="display:none;"
                                            },3000)

                                        }catch(error){
                                            console.log(error)
                                        }
                                    }
                                }catch(error){
                                    console.log(error)
                                }
                            }}>Delete</button></h4>
                            <p  style={{height:"50px",overflow:"auto"}}>{items.post_description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </>)
}