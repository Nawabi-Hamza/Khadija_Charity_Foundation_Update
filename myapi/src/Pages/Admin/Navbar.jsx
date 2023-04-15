
import { useContext } from "react"
import { Link,useLocation } from "react-router-dom" 
import { AuthContext } from "../context/AuthContext"


export default function NavbarDashboard(){
  const {currentUser} = useContext(AuthContext)
    var location = useLocation()
  var url = location.pathname.split("/")[2]
    return(<>
      <div className="my-primary" style={{position:"sticky",top:"0px",zIndex:"999"}}>
     <div className="container-lg">
          <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container-fluid">
            <center> 
            <div className="navbar-brand">
                <h2 className="fw-bold">
                 Dashboard
                </h2>
            </div>
            </center>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdownDemo02" aria-controls="navbarNavDropdownDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdownDemo02" >
              <ul className="navbar-nav w-100" >
                <li className="nav-item">
                  <Link className={url===""? "nav-link a1":"nav-link"} aria-current="page" to="/">&lt;| Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={url==="home"? "nav-link a1":"nav-link"} aria-current="page" to="/dashboard/home">SlideShow</Link>
                </li>
                <li className="nav-item">
                  <Link className={url==="posts"? "nav-link a1":"nav-link"} aria-current="page" to="/dashboard/posts">Posts</Link>
                </li>
                {currentUser?
                currentUser.user_type==="Super Admin"?
                <li className="nav-item">
                  <Link className={url==="users"? "nav-link a1":"nav-link"} aria-current="page" to="/dashboard/users">Users</Link>
                </li>:null

              :  
              null}
                <li className="nav-item">
                  {/* <Link className={url==="about"? "nav-link a1":"nav-link"} aria-current="page" to="/about">More..</Link> */}
                </li>
              </ul>
            </div>
          </div>
        </nav>
     </div>
     </div>
    </>)
}