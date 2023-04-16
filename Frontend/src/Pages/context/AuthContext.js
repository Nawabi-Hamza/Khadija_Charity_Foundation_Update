import { createContext,useState,useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{                            
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem("user")) || null)
    // =======login function=======
    const login = async (inputs)=>{
        // console.log(inputs)
       const res =  await axios.post("http://localhost:5000/auth/login",inputs)
       setCurrentUser(res.data)
    }
    // ======logout function=======
     const logout = async(inputs)=>{
        // alert("")
        await axios.post("http://localhost:5000/auth/logout")
        setCurrentUser(null)
        alert("You Logout Successfuly")
     }

     useEffect(() => {
       localStorage.setItem("user",JSON.stringify(currentUser))
     }, [currentUser])
     
     return(
     <AuthContext.Provider value={{currentUser, login , logout}}>
        {children}
     </AuthContext.Provider>
        )
}
