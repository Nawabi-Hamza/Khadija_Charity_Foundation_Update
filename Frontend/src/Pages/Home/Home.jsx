// import bootstrap from "bootstrap"
import axios from "axios"
// import { Link } from  "react-router-dom"
import { useState } from "react"
import ShowPosts from "./ShowPost"


export default function HomePage(){
    return(<>
            {SlideShow()}
            {ServiceWhatWeDo()}
            <ShowPosts />
            {OurTeam()}
            {ContactSection()}
        </>)
}

export function SlideShow(){
    const [ show,setShow ] = useState([])
    const fetchData = async()=>{
        try{
            const res = await axios.get("https://myapi.khadijacharityfoundation.com/slideshow")
            setShow(res.data)
        }catch(error){
            console.log(error)
        }
    }
    fetchData()
    // console.log(show.length)
    // var numberArray = 0
    // var numberArrayOne = 1
    return(<>
     {/* <!-- Carousel Start --> */}
     <div id="carouselExampleDark" className="carousel carousel-dark slide">              
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            {show.length>=1 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>:null }
            {show.length>=2 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>:null }
            {show.length>=3 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>:null }
            {show.length>=4 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>:null }
            {show.length>=5 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="5" aria-label="Slide 6"></button>:null }
            {show.length>=6 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="6" aria-label="Slide 7"></button>:null }
            {show.length>=7 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="7" aria-label="Slide 8"></button>:null }
            {show.length>=8 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="8" aria-label="Slide 9"></button>:null }
            {show.length>=9 ? <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="9" aria-label="Slide 10"></button>:null }
            {/* <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button> */}
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
            <img src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=auto" style={{maxHeight:"80vh",minHeight:"60vh",objectFit:'cover'}} className="d-block w-100" alt="..."/>
            <div className="carousel-caption my-primary mb-3" style={{opacity:"0.7"}}>
                <h1 className="fw-bold text-white">
                    <a href="https://www.paypal.com/donate/?hosted_button_id=AAVQAD3B6QZS6">
                    <button className="btn btn-warning">Donate Now For Poor People</button>
                    </a>
                    </h1>
                <p className="h1 fw-bold text-white">Welcome To Khadija Charity Foundation.</p>
            </div> 
            </div>
            {show.map((items)=>(
            <div className="carousel-item" key={items.slide_id} data-bs-interval="2000">
            <img src={items.slide_image} style={{maxHeight:"80vh",minHeight:"60vh",objectFit:'cover'}} className="d-block w-100" alt="..."/>
            <div className="carousel-caption my-primary mb-3" style={{opacity:"0.7"}}>
                <h1 className="display-2 fw-bold text-white">{items.slide_title}</h1>
                <p className="h4 text-white">{items.slide_descrption}</p>
            </div>
            </div>
            ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span id='corserButton' className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span  className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span id='corserButton' className="carousel-control-next-icon" aria-hidden="true"></span>
            <span  className="visually-hidden">Next</span>
        </button>
    </div>
        {/* <!-- Carousel End --> */}
    </>)
}

export function  ServiceWhatWeDo(){
   
    return(<>
    {/* <!-- Service Start --> */}
        <div id="service" className="container-md service py-md-5">
            <div className="container-fluid">
                <div className="section-header text-center">
                    <p className="display-2 mt-4 my-text">What We Do?</p>
                    <h2>We believe that we can  save more lifes with you</h2>
                </div>
                <div className="row">
                    <div className="col-lg-4 my-3 my-2 col-md-6">
                        <div className="service-item bg-light d-flex">
                            <div className="service-icon p-2" >
                            <i style={{fontSize:"100px"}} className="fa fa-light fa-seedling my-text"></i>
                            </div>
                            <div className="service-text">
                                <h3>Healthy Food</h3>
                                <p>Lorem ipsum dolor git amet elit. Phase nec preti facils .</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 my-3 my-2 col-md-6">
                        <div className="service-item bg-light d-flex">
                        <div className="service-icon p-2" > 
                            <i style={{fontSize:"100px"}} className="fa fa-sharp fa-solid fa-droplet my-text"></i>
                            </div>
                            <div className="service-text">
                                <h3>Pure Water</h3>
                                <p>Lorem ipsum dolor sit amet elit. Phase nec preti facils ornare .</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 my-3 my-2 col-md-6">
                        <div className="service-item bg-light d-flex">
                        <div className="service-icon p-2" >
                            <i style={{fontSize:"100px"}} className="fa fa-regular fa-user-nurse my-text"></i>
                            </div>
                            <div className="service-text">
                                <h3>Health Care</h3>
                                <p>Lorem ipsum dolor sit amet elit. Phase nec preti facils ornare .</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 my-3 my-2 col-md-6">
                        <div className="service-item bg-light d-flex">
                        <div className="service-icon p-2" >
                            <i style={{fontSize:"100px"}} className="fa fa-light fa-user-graduate my-text"></i>
                            </div>
                            <div className="service-text">
                                <h4>Primary Education</h4>
                                <p>Lorem ipsum dolor sit amet elit. Phase nec preti .</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 my-3 my-2 col-md-6">
                        <div className="service-item bg-light d-flex">
                        <div className="service-icon p-2" >
                            <i style={{fontSize:"100px"}} className="fa fa-sharp fa-solid fa-house my-text"></i>
                            <i className=""></i>
                            </div>
                            <div className="service-text">
                                <h3>Facilities</h3>
                                <p>Lorem ipsum dolor sit amet elit. Phase nec preti .</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 my-3 my-2 col-md-6">
                        <div className="service-item bg-light d-flex">
                        <div className="service-icon p-2" >
                            <i style={{fontSize:"100px"}} className="fa fa-sharp fa-solid fa-people-carry-box my-text"></i>
                            </div>
                            <div className="service-text">
                                <h3>Social Care</h3>
                                <p>Lorem ipsum dolor sit amet elit. Phase nec preti .</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Service End --> */}
    </>)
}

export function OurTeam(){
    return(<>
    <div className="team py-md-5">
            <div className="container-md">
                <div className="section-header text-center">
                    <h2 className="my-text my-4 fw-bold display-2">Meet Our Team</h2>
                    <h2 className="my-4">Awesome Guys Behind Our Charity Foundation Activities</h2>
                </div>
                <div className="row">
                <div className="col-lg-3 col-md-6 mb-3">
                        <div className="team-item">
                            <div className="team-img">
                                <img src="https://images.pexels.com/photos/415263/pexels-photo-415263.jpeg?auto=compress&cs=tinysrgb&w=1600" style={{width:"100%",height:"300px",objectFit:"cover"}}  alt="TeamImage"/>
                            </div>
                            <div className="team-text">
                                <h3>Khadija Heiderzada</h3>
                                <p>CEO & Founder</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="team-item" >
                            <div className="team-img" >
                                <img src="https://hamza-nawabi.netlify.app/img/profile.jpg" style={{width:"100%",height:"300px",objectFit:"cover"}}  alt="TeamImage"/>
                            </div>
                            <div className="team-text">
                                <h2 className="">Hamza Nawabi</h2>
                                <p>Web Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="team-item">
                            <div className="team-img">
                                <img src="https://media.istockphoto.com/id/1270030214/photo/portrait-of-a-cheerful-man-using-smart-phone-at-home-office.jpg?b=1&s=612x612&w=0&k=20&c=Je85EilTmYrkVLAuJv8kou-FyZW0qPaY-js6ODNiCS8=" style={{width:"100%",height:"300px",objectFit:"cover"}}  alt="TeamImage"/>
                            </div>
                            <div className="team-text">
                                <h2>Naimat Nawabi</h2>
                                <p>Manager</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="team-item">
                            <div className="team-img">
                                <img src="https://media.istockphoto.com/id/1319763895/photo/smiling-mixed-race-mature-man-on-grey-background.jpg?b=1&s=612x612&w=0&k=20&c=jIlBJzxPiqpROW_F-CsYMHscAcwBqUsrv72uFKwqvlc=" style={{width:"100%",height:"300px",objectFit:"cover"}}  alt="TeamImage"/>
                            </div>
                            <div className="team-text">
                                <h2>Anwar JabarKhil</h2>
                                <p>Volunteer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export function ContactSection(){
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
                await axios.post("https://myapi.khadijacharityfoundation.com/contactMail",{
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
        <div className="contact bg-light py-5">
            <div className="container pb-5">
                <div className="section-header text-center">
                    <p className="display-2 my-text fw-bold">Contact</p>
                    <h2 className="mb-5">Contact for any query</h2>
                </div>
                <div className="contact-img d-flex justify-content-center">
                    <img src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=auto" alt="ImageBackgroundForm"/>
                <div className="contact-form bg-light ">
                        <div id="success"></div>
                        <form name="sentMessage" id="contactForm" novalidate="novalidate">
                            <div className="alert alert-success" id="successShow" style={{display:"none"}}></div>
                            <div className="alert alert-danger" id="dangerShow" style={{display:"none"}}></div>
                            <div className="control-group">
                                <input type="text" className="form-control" id="name" placeholder="Your Name" onChange={(e)=>setName(e.target.value)} required="required" data-validation-required-message="Please enter your name" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <input type="email" className="form-control" id="email" placeholder="Your Email" onChange={(e)=>setEmail(e.target.value)} required="required" data-validation-required-message="Please enter your email" />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="control-group">
                                <textarea className="form-control" id="message" rows={7}  placeholder="Message" onChange={(e)=>setMessage(e.target.value)} required="required" data-validation-required-message="Please enter your message"></textarea>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div>
                                <button className="btn btn-custom" type="submit" id="sendMessageButton" onClick={sendEmail}>Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Contact End --> */}

    </>)
}