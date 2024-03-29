import { useContext,useState } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext, preApi } from "../context/AuthContext"
import axios from "axios"
import { useEffect } from "react"
// import { apiDomain } from "../../App"
// import CommentComponent from "./Comment"




export default function ShowSinglePost(){
    return(<>
    <div className="bg-light">
    {SinglePost()}
    </div>
    </>)
}


function SinglePost(){
    // console.log(preApi)
    const [ count,setCount ] = useState(0)
    const handleDeleteComment = async(idcomment)=>{
        // e.preventDefault()
        try{
            await axios.post(`${preApi}/posts/comment/delete/`+idcomment)
            setCount(count + 1)
        }catch(error){
            console.log(error)
        }
        // alert("welcome to this page " + idcomment)

    }
    const { currentUser } = useContext(AuthContext)
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const [ show,setShow ] = useState([])
    useEffect(()=>{
        const takedata =  async()=>{
             try{
                  const res = await axios.get(`${preApi}/posts/`+postId)
                  setShow(res.data)
              }catch(error){
                  console.log(error)   
              }
            }

            takedata()
    },[])
        // useEffect(()=>{
        //     takedata()
        //     },[])
       
    // const id_post = parseInt(postId)
    
    // console.log(setdata)
    const [ commentTotal,setCommentTotal ] = useState([])
    // console.log(setdata)
    
   
    const [ showComment,setShowComment ] = useState([])
    // alert(commentTotal)
    const showCommentPost = async()=>{
        try{
          const res = await axios.get(`${preApi}/posts/comment/${postId}`)
            setShowComment(res.data)
          try{
              const res2 = await axios.get( `${preApi}/posts/comment/total/${postId}`)
              setCommentTotal(res2.data)
            //   setCount(count + 1)
            }catch(error){
                console.log(error)
            }
            // console.log(res2)
        }catch(error){
            console.log(error)
        }
    }


    const [ acomment,setComment ] = useState("")
    // const location = useLocation()
    // const postId = location.pathname.split('/')[2]
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
            // await axios.post(`https://myapi.khadijacharityfoundation.com/posts/comment`,setdata) 
            await axios.post(`${preApi}/posts/comment`,setdata)
            setCount(count + 1)
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
    useEffect(()=>{
        showCommentPost()
    },[count])
    
    let number = 0

    return(<>
    <div className="container-md py-5">
        {/* Family Information */}
        <h1 className="my-text my-3 mb-md-5 fw-bold d-flex justify-content-center">This Post Information</h1>
            {show.map((item)=>(
            <div className="row" key={item.post_id}>
                <div className="col-md-6">
                        <img src={item.post_Image} style={{width:"100%",height:"300px",borderRadius:"9px",objectFit:'cover'}}  alt="ImageNew" />
                    </div>
                <div className="col-md-6 p-4">
                        <h2>{item.post_title}</h2>
                        <p>
                            {item.post_description}
                        </p>
                        <h5><strong>Address: </strong>{item.post_address}</h5>
                        <h5><strong>Phone: </strong>{item.post_phone}</h5>
                </div>
            </div>
                ))}

        {/* comment Section */}
        <h1 className="my-text my-3 my-md-5 fw-bold d-flex justify-content-center">Comment Section</h1>
        <div className="row">
            {currentUser?
            <div className="col-md-6">
                {/* <CommentComponent /> */}
                <form action="" className="footer">
                    <div className="alert alert-success mb-2" style={{display:"none"}} id="show">Your Comment Successuly Sended thanks for your comment</div>
                    <h3 className="text-secondary">You Can Comment In This Post</h3>
                    <textarea className="form-control my-3" placeholder="Your Comment About This Family..." onChange={(e)=>setComment(e.target.value)} rows={6}></textarea>
                    <button className="form-control btn btn-outline-secondary" onClick={addComment}>Give Comment</button>
                </form>
            </div>
            :null
            }
            <div className="col-md-6">
            <div className="p-3"><i className="fa fa-comments"></i> {commentTotal.map((item)=>(<span key={number = number + 1}>{item.total}</span>))} Comments</div>
                {/* {editeComment? 
                <>
                <input  type="text" className="form-control " placeholder="Your Update Comment..."/>
                <button className="btn btn-warning my-2">Update</button>
                </>
                :null} */}
            <div style={{maxHeight:"360px",overflow:"auto"}}>
                {showComment.map((items)=>(
                <div className="my-2 bg-white p-3" key={items.comment_id} style={{borderRadius:"12px"}}>
                    <div className="d-flex justify-content-between">
                    <h5>
                    {items.user_image?
                    <img src={items.user_image} style={{height:"55px",width:"55px",objectFit:"cover",borderRadius:"50%"}} alt="" loading="lazy" />
                    :
                    <i className="fa fa-user" ></i> 
                    }
                       &nbsp; {items.user_name}</h5>
                       {currentUser?
                       currentUser.user_type==="Super Admin"?
                       <>
                      <button className="btn btn-sm btn-danger" style={{height:"30px"}} onClick={()=>handleDeleteComment(items.comment_id)}>Delete</button>
                       </>
                       :null
                       :null}
                    </div>
                   
                    <p style={{fontSize:"13px"}} >{items.comment}</p>

                </div>
                ))}
            
                </div>
            </div>
        </div>
    </div>
    </>)
}