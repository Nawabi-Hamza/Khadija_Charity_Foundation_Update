import NavFooter from "./NavFoot/Navbar_Footer";
import { BrowserRouter,Routes,Route } from "react-router-dom"
import HomePage from "./Home/Home";
import "../App.css"
import FeaturePage from "./Home/Features";
import AboutPage from "./Home/About";
import ContactPage from "./Home/Contact";
import LoginPage from "./Home/Login";
import RegisterPage from "./Home/Register";
import ShowSinglePost from "./Home/Single";
import HomeDashboard from "./Admin/HomeAdmin";
import UsersDashboard from "./Admin/Users";
import PostsDashboard from "./Admin/Posts";
import NotPage from "./PageNotFound";
import UpdateSingleUser from "./Admin/SingleUserUpdate";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import UserProfile from "./Home/Profile";
import UpdateUserProfile from "./Home/UpdateProfile";

export default function RouterPage(){
    const { currentUser } = useContext(AuthContext)
    return(<>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<NavFooter/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/people" element={<FeaturePage/>}/>
        <Route path="/people/:id" element={<ShowSinglePost/>} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/profileupdate/:id" element={<UpdateUserProfile/>} />
        </Route>
        
        <Route path="/login" element={<LoginPage />}/>    
        <Route path="/register" element={<RegisterPage />}/>

        <Route path="/dashboard/home" element={<HomeDashboard />} />
        <Route path="/dashboard/posts" element={<PostsDashboard/>} />
        {currentUser?
        currentUser.user_type==="Super Admin"?
        <>
        <Route path="/dashboard/users" element={<UsersDashboard/>} />
        <Route path="/dashboard/users/:id" element={<UpdateSingleUser/>} />
        </>
        :null
        : null}
        
        <Route path="*" element={<NotPage/>}/>
    </Routes>
    </BrowserRouter>
    </>)
}