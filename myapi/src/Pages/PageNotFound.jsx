
import { Link } from "react-router-dom"

export default function NotPage(){
    return(<>
    <center>
        <h1 className="fw-bold my-text mt-5">
        Page Not Found 
        </h1>
        <Link to="/">
        <button className="btn btn-outline-dark">Go Home Page</button>
        </Link>
    </center>
    </>)
}