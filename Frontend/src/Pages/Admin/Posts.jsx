

import axios from "axios"
import { useContext,useEffect,useState } from "react"
import { AuthContext, preApi  } from "../context/AuthContext"
import LoginPage from "../Home/Login"
import { UserNotAdmin } from "./HomeAdmin"
import NavbarDashboard from "./Navbar"



export default function PostsDashboard(){
    const { currentUser } = useContext(AuthContext)
    // const config  = useContext(AuthContext)
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
    // console.log(preApi)
    // const { config } = useContext(AuthContext)
    const [ count,setCount ] = useState(0)
    const { currentUser } = useContext(AuthContext)
    // console.log(config)
    const [ file,setFile ] = useState("")
    const [ title,setTitle ] = useState("")
    const [ phone,setPhone ] = useState("")
    const [ address,setAddress ] = useState("")
    const [ description,setDescription ] = useState("")

    const config = {
        headers:{ Authorization:`Bearer ${currentUser.token}`}
     
     }
    // autorization
    // const config = {
    //     headers:{ Authorization:`Bearer ${currentUser.token}`}
    // }
    const upload = async()=>{
        try{
        const formData = new FormData();
        formData.append("image",file)
        const res = await axios.post(`${preApi}/image/upload`,formData)
        return res.data.secure_url;
        // const res = await axios.post("https://myapi.khadijacharityfoundation.com/image/upload")
        // return res.url;
        }catch(error){
        // console.log(error)
        }
    }
    // console.log(file)
    const show1 = document.getElementById("show1")
    const show2 = document.getElementById("show")
    const hanldInsert = async(e)=>{
            e.preventDefault();
        // setInterval(async() => {
            if(title===""||phone===""||address===""||description===""){
                alert("Please Fill All Inputs....")
            }else{
                show1.innerHTML=`<div className="spinner-border spinner-border-sm ms-2" role="status">
                Please Wait <span className="sr-only">Loading...</span>
              </div>`
                    show1.style="display:block;"
                const imgUrl = await upload()
                // console.log(imgUrl)
                try{
                    await axios.post(`${preApi}/posts`,{
                        post_title:title,
                        post_description:description,
                        post_phone:phone,
                        post_Image:file? imgUrl:"",
                        post_address:address,
                        post_user:currentUser.user_id
                    }, config)
                    setCount(count + 1)
                    show1.innerHTML="Your Post Added Successfuly...";
                    // show1.style="display:block;"
                    setTimeout(()=>{
                        setFile(null)
                        setTitle("")
                        setPhone("")
                        setAddress("")
                        setDescription("")
                    show2.innerHTML=""
                    show2.style="display:none;"
                    },3000)

                    window.location.reload();
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
            const res = await axios.get(`${preApi}/posts`)
            setShow(res.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()          
    },[count])
    // =======================Delete Image=====================
    const deletePosts = async(items)=>{
        // e.preventDefault()
        const url = `${items.post_Image}`;
        // console.log(items.post_id)
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1].replace('.jpg'||'.png'||".jpeg", '');
        // console.log(lastPart)
        const showAlert = document.getElementById("show")
        try{
            showAlert.innerHTML=`<div className="spinner-border spinner-border-sm ms-2" role="status">
                Please Wait <span className="sr-only">Loading...</span>
                                </div>`
            showAlert.style="display:block;"
            const res = await axios.post(`${preApi}/image/delimage/${lastPart}`)
            // const res = {
            //     status:200
            // }
            // console.log(items.post_id)
            // console.log(lastPart)
            if(res.status===200){
                try{
                    await axios.post(`${preApi}/posts/delete/${items.post_id}` ,{
                        id:items.post_id
                    }, config)
                    // alert("Your Post Deleted Successfuly...")
                    showAlert.innerHTML="Your Post Deleted Successfuly..."
                    setCount(count + 1)
                    // showAlert.style="display:block;"
                    window.location.reload()
                    setTimeout(()=>{
                        showAlert.innerHTML=""
                        showAlert.style="display:none;"
                    },3000)
                }catch(error){
                    console.log(error)
                }
            }
        }catch(error){
            console.log(error)
        }
    }
    return(<>
    <div className="contianer-fluid postAdminFade">
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
                    <div className="row my-2" key={items.post_id}>
                        <div className="col-4">
                            <img src={`${items.post_Image}`} style={{width:"100%",height:"100px",objectFit:"cover"}} alt="imagepost" loading="lazy" />
                        </div>
                        <div className="col-8">
                            <h4 className="d-flex justify-content-between">{items.post_title} <button className="btn btn-sm btn-danger" onClick={()=>deletePosts(items)}>Delete</button></h4>
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