import axios from "axios"
import { useState } from "react"
import { apiDomain } from "../../App"


export default function ContactPage(){
    return(<>
    {Contact()}
    </>)
}

function Contact(){
    const [ name,setName ] = useState("")
    const [ email,setEmail ] = useState("")
    const [ message,setMessage ] = useState("")
    const sendEmail = async(e)=>{
        e.preventDefault()
        if(name===""||email===""||message===""){
            document.getElementById("dangerShow").innerHTML="Please Fill All Fields ...!";
            document.getElementById("dangerShow").style="display:block;";
        }else{
            document.getElementById("dangerShow").style="display:none;";
            document.getElementById("successShow").innerHTML="Please Wait ...";
            document.getElementById("successShow").style="display:block;";
            try{
                await axios.post(apiDomain+"/contactMail",{
                    name:name,
                    email:email,
                    message:message
                })
                document.getElementById("successShow").innerHTML="Your Message Successfuly Send It ..."
                setTimeout(()=>{
                    document.getElementById("successShow").innerHTML="";
                    document.getElementById("successShow").style="display:none;";
                },4000)
            }catch(error){
                // console.log(error)
                document.getElementById("successShow").style="display:none;";
                document.getElementById("dangerShow").innerHTML=error.response.data.error;
                document.getElementById("dangerShow").style="display:block;";
                setTimeout(()=>{
                document.getElementById("dangerShow").style="display:none;";
                },5000)
            }
        }
    }
    return(<>
    {/* <!-- Contact Start --> */}
    <div className="container-fluid contactSingle bg-light py-5">
        <div className="container">
            <div>
                <center>
                    <h1 className="my-text text-uppercase my-4 fw-bold display-2">Contact US</h1>
                    <h1 className="mb-4">Contact For Any Queries</h1>
                </center>
            </div>
            <div className="row">
            <div className="col-lg-7">
                    <div className="contact-form bg-white" style={{padding:"30px"}}>
                    <div className="alert alert-success" id="successShow" style={{display:"none"}}></div>
                            <div className="alert alert-danger" id="dangerShow" style={{display:"none"}}></div>
                        <h3 className="my-3">You Can Contact Us</h3>
                        <form name="sentMessage" id="contactForm" novalidate="novalidate">
                            <div className="control-group">
                                <input type="text" className="form-control border-1 p-4" id="name" placeholder="Your Name"
                                onChange={(e)=>setName(e.target.value)}
                                    required="required" data-validation-required-message="Please enter your name" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <input type="email" className="form-control border-1 p-4" id="email" placeholder="Your Email"
                                onChange={(e)=>setEmail(e.target.value)}
                                    required="required" data-validation-required-message="Please enter your email" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <textarea className="form-control border-1 py-3 px-4" rows="6" id="message" placeholder="Message"
                                onChange={(e)=>setMessage(e.target.value)}
                                    required="required"
                                    data-validation-required-message="Please enter your message"></textarea>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div>
                                <button className="btn custom py-3 px-4" type="submit" id="sendMessageButton" onClick={sendEmail}>Send
                                    Message</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-5 pb-4 pb-lg-0">
                    <div className="my-primary text-dark text-center p-4">
                        <h4 className="m-0 text-light"><i className="fa fa-map-marker-alt text-white mr-2"></i> Our Location</h4>
                    </div>
                    <iframe style={{width: "100%", height: "500px",border:"0"}} title="location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.837149313288!2d69.14297491474561!3d34.537946534732214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16f20052b8a43%3A0xee06962841e234b6!2sRana%20University!5e0!3m2!1sen!2s!4v1678894107215!5m2!1sen!2s"
                        frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"> </iframe>
                </div>
               
            </div>
        </div>
    </div>
    {/* <!-- Contact End --> */}
    </>)
}