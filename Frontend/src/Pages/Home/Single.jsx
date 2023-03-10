import { useContext,useState } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { useEffect } from "react"
import CommentComponent from "./Comment"




export default function ShowSinglePost(){
    return(<>
    <div className="bg-light">
    {SinglePost()}
    </div>
    </>)
}

function SinglePost(){
    const { currentUser } = useContext(AuthContext)
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const [ show,setShow ] = useState([])

    const takedata =  async()=>{
         try{
              const res = await axios.get("http://localhost:5000/posts/"+postId)
              setShow(res.data)
          }catch(error){
              console.log(error)   
          }
        }
        useEffect(()=>{
            takedata()
            })
       
    // const id_post = parseInt(postId)
    
    // console.log(setdata)
    const [ commentTotal,setCommentTotal ] = useState([])
    // console.log(setdata)
    
   
    const [ showComment,setShowComment ] = useState([])
    // alert(commentTotal)
    const showCommentPost = async()=>{
        try{
          const res = await axios.get(`http://localhost:5000/posts/comment/${postId}`)
            
        const res2 = await axios.get( `http://localhost:5000/posts/comment/total/${postId}`)
        setCommentTotal(res2.data)
              setShowComment(res.data)
            // console.log(res2)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        showCommentPost()
    })

    return(<>
    <div className="container-md py-5">
        {/* Family Information */}
        <h1 className="my-text my-3 mb-md-5 fw-bold d-flex justify-content-center">This Family Information</h1>
            {show.map((item)=>(
            <div className="row">
                <div className="col-md-6">
                        <img src={"../upload/"+item.post_Image} style={{width:"100%",height:"300px",borderRadius:"9px",objectFit:'cover'}}  alt="ImageNew" />
                    </div>
                <div className="col-md-6">
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
                <CommentComponent/>
            </div>
            :null
            }
            <div className="col-md-6">
            <button className="btn btn-outline-secondary mb-3 form-control"><i className="fa fa-comments"></i> {commentTotal.map((item)=>(<>{item.total}</>))} Comments</button>
                {/* {editeComment? 
                <>
                <input  type="text" className="form-control " placeholder="Your Update Comment..."/>
                <button className="btn btn-warning my-2">Update</button>
                </>
                :null} */}
            <div style={{height:"360px",overflow:"auto"}}>
                {showComment.map((items)=>(
                <div className="my-2 bg-white p-3" style={{borderRadius:"12px"}}>
                    <div className="d-flex justify-content-between">
                    <h5>
                    {items.user_image?
                    <img src={"../upload/"+items.user_image} style={{height:"55px",width:"55px",objectFit:"cover",borderRadius:"50%"}} alt="" />
                    :
                    <i className="fa fa-user" ></i> 
                    }
                       &nbsp; {items.user_name}</h5>
                       {currentUser?
                       currentUser.user_type==="Super Admin"?
                       <>
                    {/*   <button className="btn btn-sm btn-danger" style={{height:"30px"}} onClick={handleShowEditeInput}>Edite</button> */}
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