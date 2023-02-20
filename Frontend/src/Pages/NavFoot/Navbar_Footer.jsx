import { useContext } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import "../../App.css"
import { AuthContext } from "../context/AuthContext"
export default function NavFooter(){
    return(<>
    {Navbar()}
      <Outlet/>
    {Footer()}

    </>)
}

function Navbar(){
  var location = useLocation()
  var url = location.pathname.split("/")[1]
  const { currentUser,logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = async(e)=>{
    e.preventDefault()
    try{
      await logout()
      navigate("/")
    }catch(error){
      console.log(error)
    }
  }
  return(<>
     {/* <!-- Nav Bar Start --> */}
     <div className="my-primary" style={{position:"sticky",top:"0px",zIndex:"999"}}>
     <div className="container-lg">
          <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container-fluid">
            <center> 
            <div className="navbar-brand">
              <img src="./logo7.png" style={{width:"50px"}} alt="" />
              <h1 style={{fontSize:"10px"}} className="my-text fw-bold  m-0 p-0">Khadija Charity Foundation</h1>
            </div>
            </center>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdownDemo02" aria-controls="navbarNavDropdownDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdownDemo02" >
              <ul className="navbar-nav w-100" >
                {currentUser?
              <li className="nav-item">
                  <Link className={url==="profile"? "nav-link a1":"nav-link"} aria-current="page"  to="/profile">Profile</Link>
                </li>:null
              }
                <li className="nav-item">
                  <Link className={url===""? "nav-link a1":"nav-link"} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={url==="people"? "nav-link a1":"nav-link"} aria-current="page" to="/people">Features</Link>
                </li>
                <li className="nav-item">
                  <Link className={url==="about"? "nav-link a1":"nav-link"} aria-current="page" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className={url==="contact"? "nav-link a1":"nav-link"} aria-current="page" to="/contact">Contact</Link>
                </li>
                {currentUser? 
                currentUser.user_type==="Admin" || currentUser.user_type==="Super Admin"?
                  <li className="nav-item">
                    <Link className={url==="dashboard"? "nav-link a1":"nav-link"} aria-current="page" to="/dashboard/home">Dashboard</Link>
                  </li>:
                  null
                  :null
                
                }
                  {currentUser?
                  <>
                <li className="nav-item" style={{position:"absolute",right:"10px",fontWeight:"700",fontSize:"20px"}}>
                  <Link className={url==="login"? "nav-link a1":"nav-link"} aria-current="page" to="/" onClick={handleLogout}>Logout</Link>
                </li>
                  </>
                  :
                <li className="nav-item" style={{position:"absolute",right:"10px",fontWeight:"700",fontSize:"20px"}}>
                  <Link className={url==="login"? "nav-link a1":"nav-link"} aria-current="page" to="/login">Login</Link>
                </li>
                  }
              
              </ul>
            </div>
          </div>
        </nav>
     </div>
     </div>

        {/* <!-- Nav Bar End --> */}
  </>)
}
function Footer(){
  return(<>
  {/* <!-- Footer Start --> */}
        <div className="footer my-primary pt-md-5">
            <div className="container p-3">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-contact">
                            <h2 className="my-text">Our Office</h2>
                            <p><i className="fa fa-map-marker-alt"></i> 15 District, Kabul , Afghanitan</p>
                            <p><i className="fa fa-phone-alt"></i> 012 345 67890</p>
                            <p><i className="fa fa-envelope"></i> KhadijaCharityFoundation@gamil.com</p>
                            <div className="footer-social">
                                <a className="btn btn-custom" href="/"> <i className="fab fa-twitter"></i></a>
                                <a className="btn btn-custom" href="/"> <i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-custom" href="/"> <i className="fab fa-youtube"></i></a>
                                <a className="btn btn-custom" href="/"> <i className="fab fa-instagram"></i></a>
                                <a className="btn btn-custom" href="/"> <i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-link">
                            <h2 className="my-text">Links</h2>
                            <Link to="/">Home Page</Link>
                            <Link to="/about">About Us</Link>
                            <Link to="/contact">Contact Us</Link>
                            <Link to="/people">Features</Link>
                            <Link to="/register">Login Or Register</Link>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-newsletter">
                            <h2 className="my-text">Newsletter</h2>
                            <form>
                                {/* <input className="form-control" placeholder="Your Email For News"/> */}
                               <a href="https://www.paypal.com/donate/?hosted_button_id=AAVQAD3B6QZS6">
                                <button className="btn form-control my-2 custom-footer">Donate</button>
                                </a>
                                <label className="my-text">Don't worry, wers aren't spam!</label>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                  <hr />
                  <div className="col-md-6">
                        <p>&copy; <b> Khadija Charity Foundation </b>, All Right Reserved.</p>
                    </div>
                    <div className="col-md-6">
                        <p>Designed By: <a href="https://hamza-nawabi.netlify.app" className="my-text-Footer"> Hamza Nawabi</a></p>
                    </div>
                </div>
            </div>
          </div>
        {/* <!-- Footer End --> */}
  </>)
}