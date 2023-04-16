import { useState } from "react"
import { Link } from "react-router-dom"
// import { ContactSection, OurTeam } from "./Home"
import { OurTeam } from "./Home"
import axios from "axios"


export default function FeaturePage(){
    return(<>
        {ShowAllPost()}
        {OurTeam()}
        {/* {ContactSection()} */}
        </>)
}

function ShowAllPost(){
    const [ show,setShow ] = useState([])
    const FetchData = async()=>{
        try{
            const res = await axios.get("http://localhost:5000/posts")
        //   const res2 = await axios.get( `http://localhost:5000/posts/comment/total/${postId}`)
        //     setTotalComment(res2.data)
            setShow(res.data)
        }catch(error){
            console.log(error)
        }
    }
    FetchData()
   
    return(<>
     <div className="blog bg-light py-5">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="my-text display-3 fw-bold my-3">Poor People Which They Need Help?</h2>
                </div>
                <div className="row">
                    {show.map((items)=>(
                    <div key={items.post_id} className="col-lg-4 my-3">
                        <div className="blog-item bg-white">
                            <div className="blog-img">
                                <img src={items.post_Image} style={{width:"100%",height:"250px",borderRadius:"9px 9px 0px 0px",objectFit:'cover'}}  alt="ImageNew" />
                            </div>
                            <div className="blog-text">
                                <h3><Link to={"/people/"+items.post_id} >{items.post_title}</Link></h3>
                                <p style={{height:"80px",overflow:"auto",alignItems:"justify"}}>
                                    {items.post_description}
                                </p>
                            </div>
                            <Link to={"/people/"+items.post_id}> 
                            <div className="btn-group p-0 form-control">
                            <button className="btn btn-secondary w-50"> See More..</button>
                                <button className="btn btn-secondary w-50" ><i className="fa fa-comments"></i> Comments</button>
                            </div>
                                </Link>
                        </div>
                    </div>
                    ))}
                    
                </div>
            </div>
        </div>
    </>)
}