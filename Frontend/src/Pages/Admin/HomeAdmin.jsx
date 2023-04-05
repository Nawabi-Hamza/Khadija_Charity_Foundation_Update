
import axios from "axios"
import { useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import LoginPage from "../Home/Login"
import NavbarDashboard from "./Navbar"


export default function HomeDashboard(){
    const { currentUser } = useContext(AuthContext)
    return(<>
    {currentUser? 
        currentUser.user_type==="Admin" || currentUser.user_type==="Super Admin"?
        <>
        <NavbarDashboard/>
        {FirstSection()}
        </>:<>{UserNotAdmin()}<LoginPage/></>
    :
    <LoginPage/>
    }
            
        
        </>)
}

export function UserNotAdmin(){
    return(
        <center><h1 className="fw-bold my-text">Admin Page</h1><p className="w-75">You Must Be Admin To Have Access This Page For Have Access This Page Please Contact Us In This Email <br/><a href="mailto:h.nawabi119@gmail.com">h.nawabi119@gmail.com</a></p></center>
    )
}
function FirstSection(){
    const [ file,setFile ] = useState(null)
    const [ title,setTitle ] = useState("")
    const [ description,setDescription ] = useState("")
    const upload = async(e)=>{
        try{
        const formData = new FormData();
        formData.append("image",file)
        const res = await axios.post("http://localhost:5000/image/upload",formData)
        return res.data.secure_url;
        }catch(error){
        console.log(error)
        }
    }
    // console.log(title+description+file)
    const createSlideShow = async(e)=>{
        e.preventDefault()
        document.getElementById("alertShow").innerHTML = "Please Wait....";
        document.getElementById("alertShow").style = "display:block;";

       const imgUrl = await upload()
       console.log(imgUrl)
        try{
            // alert("Welcome to slide show1")
            
            await axios.post("http://localhost:5000/slideshow",{
                slide_title:title,
                slide_descrption:description,
                slide_image:file? imgUrl:"",
            })
            // alert("Welcome to slide show")
        document.getElementById("alertShow").innerHTML = "Slide Show Added Successfully ...";
        setTimeout(()=>{
            document.getElementById("alertShow").innerHTML = "";
            document.getElementById("alertShow").style = "display:none";
        },4000)

        }catch(error){
            console.log(error)
        }
    }

    const [ show,setShow ] = useState([])
    const fetchSlideShow = async()=>{
        try{
          const res =  await axios.get("http://localhost:5000/slideshow")
          setShow(res.data)

        }catch(error){
            console.log(error)
        }

    }
    fetchSlideShow()

    const deleteSlideshow = async(show)=>{
        // alert(show)
        try{
            await axios.delete(`http://localhost:5000/slideshow/${show}`)
            alert("Slide Show Deleted")
        }catch(error){
            console.log(error)
        }
    }
    return(<>
     <div className="slideshowmake">
        <div className="container-md">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="display-5 my-5">Create New Slide Show</h1>
                    <div id="alertShow" className="alert alert-success" style={{display:"none"}}></div>
                    <form action="">
                        <input type="file" className="form-control my-3" placeholder="Image" onChange={(e)=>setFile(e.target.files[0])}/>
                        <input type="text" className="form-control my-3" placeholder="Slide Show Title" onChange={(e)=>setTitle(e.target.value)} />
                        <textarea type="text" className="form-control my-3" rows={8} placeholder="Slide Show Description" onChange={(e)=>setDescription(e.target.value)}></textarea>
                        <button className="btn btn-warning form-control my-3" onClick={createSlideShow}>Add SlideShow</button>
                    </form>
                </div>
                <div className="col-md-6  mt-md-5 p-3" style={{height:"500px",overflow:"auto"}}>
                    {show.map((items)=>(
                    <div className="row mt-5">
                        <div className="col-4">
                            <img src={`${items.slide_image}`} style={{width:"100%",height:"150px",objectFit:"cover"}} alt="" />
                        </div>
                        <div className="col-7"> 
                            <button className="btn btn-danger form-control" onClick={()=>deleteSlideshow(items.slide_id)}>Delete This SlideShow</button>
                            <h2>{items.slide_title}</h2>
                            <p style={{height:"60px",overflow:'auto'}}>{items.slide_descrption}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div> 
        </div>
     </div>
    </>)
}