import { Link } from  "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { preApi } from "../context/AuthContext"
// import { apiDomain } from "../../App"

export default function ShowPosts(){
    // console.log(preApi)
    const [show,setShow] = useState([])
    const fetchDataThree = async()=>{
        try{
            const res = await axios.get(`${preApi}/posts/single/three`)
            setShow(res.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchDataThree()            
    },[])
        
    return(<>
         <div className="blog bg-light py-md-5">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="my-text display-2 fw-bold mt-3">Our Blog</h2>
                    <h2 className="mb-5">Latest news & articles directly from our blog</h2>
                </div>
                <div className="row w-100">
                    {show.map((items)=>(
                    <div className="col-lg-4 my-3" key={items.post_id} >
                        <div className="blog-item bg-white">
                            <div className="blog-img">
                                <img src={items.post_Image} style={{width:"100%",height:"300px",borderRadius:"9px 9px 0px 0px",objectFit:"cover"}}  alt="ImageNew" />
                            </div>
                            <div className="blog-text">
                            <h3><Link to={"/people/"+items.post_id}>{items.post_title}</Link></h3>
                                <p style={{height:"80px",overflow:'auto'}}>
                                   {items.post_description}
                                </p>
                            </div>
                                {/* <Link to={"/people/"+items.post_id}>
                            <div className="btn-group p-0 form-control">
                                <button className="btn btn-secondary"><i className="fa fa-user"></i> More...</button>
                            </div>
                                </Link> */}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
     
    </>)
}