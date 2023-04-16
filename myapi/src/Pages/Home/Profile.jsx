import axios from "axios"
import { useContext,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
// import NavFooter from "../NavFoot/Navbar_Footer"
import LoginPage from "./Login"

export default function UserProfile(){
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const [ show,setShow ] = useState([])
    const FetchData = async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/auth/users/single/${currentUser.user_id}`)
            setShow(res.data)
        }catch(error){
            console.log(error)
        }
    }
    FetchData()
    // alert(show.user_name)
    const [ changeImage,setChangeImage ] = useState(false)
    const handleEditeImage = (e)=>{
        e.preventDefault()
        setChangeImage(!changeImage)
    }
        const [ file ,setFile ] = useState(null)

        const upload = async()=>{
            try{
            const formData = new FormData();
            formData.append("image",file)
            const res = await axios.post("http://localhost:5000/image/upload",formData)
            return res.data.secure_url;
            }catch(error){
            console.log(error)
            }
        }
        const handleUpdateImage = async(e)=>{
            e.preventDefault()
            try{
                document.getElementById("alertUpdate").innerHTML= "Please Wait...";
                document.getElementById("alertUpdate").style= "display:block;";

                const imgUrl = await upload()
                await axios.patch(`http://localhost:5000/auth/users/picture/${currentUser.user_id}`,{
                    user_image:file? imgUrl:""
                })
                // alert("Image Updated...")
                document.getElementById("alertUpdate").innerHTML= "Your Image Updated Successfuly...";
                setTimeout(()=>{
                    document.getElementById("alertUpdate").innerHTML= "";
                    document.getElementById("alertUpdate").style= "display:block;";
                },3000)
                setChangeImage(!changeImage)
                navigate("/profile")
            }catch(error){
                console.log(error)
            }
        }
    return(<>
    {currentUser?
    <>
    <div className="container-md">
            {show.map((items)=>( 
        <div className="row py-4 my-md-5 " key={items.user_id}>
            <div  id="alertUpdate" className="alert alert-success" style={{display:'none'}}></div>
            <div className="col-md-6 my-2 d-flex justify-content-center align-items-center">
                {items.user_image===""?
                <div style={{fontSize:"160px"}} alt="profile" ><i class="fa-solid fa-user"></i></div>
                :
                <img src={`${items.user_image}`} style={{width:"90%",height:"350px",objectFit:"cover"}} alt="profile" />
                }
               <button className="btn">
                <i class="fa-solid fa-pen-to-square ms-3" onClick={handleEditeImage}></i>
                </button> 
                
            </div>
            <div className="col-md-6 my-2">
                {changeImage?
                <>
                <input type="file" className="form-control" onChange={(e)=>setFile(e.target.files[0])} /><button className="btn btn-warning my-3 form-control" onClick={handleUpdateImage}>Update Image</button>
                </>
                :
                null
                }<br/>
                <label htmlFor="">Username:</label>
                <h1>{items.user_name}</h1>
                <label htmlFor="">Email:</label>
                <p className="h3">{items.user_email}</p>
                <label htmlFor="">User Type:</label>
                <h1>{items.user_type}</h1>
                <Link to={`/profileupdate/${items.user_id}`} state={items}>
                <button className="btn btn-danger mt-3">Update User</button>
                </Link>
            </div>
        </div>
            ))}
    </div>
    </>
    :<LoginPage/>}
    </>)
}
