import { useContext,useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useLocation } from "react-router-dom"
import axios from "axios"


export default function CommentComponent(){
    const { currentUser } = useContext(AuthContext)
    const [ acomment,setComment ] = useState("")
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const id = parseInt(postId)
    const setdata = {
        comment:acomment,
        user_comment:currentUser?.user_id,
        post_comment:id
    }
    const addComment = async(e)=>{
        e.preventDefault()
        try{
            // alert("welcome to comment")
            // await axios.post(`https://af-api.khadijacharityfoundation.com//posts/comment`,setdata) 
            await axios.post("https://af-api.khadijacharityfoundation.com//posts/comment",setdata)
            // console.log(res.data)
            document.getElementById("show").style="display:block;";
            setTimeout(()=>{
                document.getElementById("show").style="display:none;";     
            },3000)
            // alert("your comment successfuly added")
        }catch(error){
            console.log(error)
        }
    }
    return(
        <form action="" className="footer">
            <div className="alert alert-success mb-2" style={{display:"none"}} id="show">Your Comment Successuly Sended thanks for your comment</div>
            <h3 className="text-secondary">You Can Comment In This Post</h3>
            <textarea className="form-control my-3" placeholder="Your Comment About This Family..." onChange={(e)=>setComment(e.target.value)} rows={10}></textarea>
            <button className="form-control btn btn-outline-secondary" onClick={addComment}>Give Comment</button>
        </form>
    )
}