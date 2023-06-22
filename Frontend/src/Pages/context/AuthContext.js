import { createContext,useState,useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()
// FOR ALL PAGE TO USE THIS API
// export const preApi = "http://localhost:3002"
export const preApi = "https://myapi.khadijacharityfoundation.com"
// export const config = {
// }

export const AuthContextProvider = ({children})=>{                            
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem("user")) || null)
   //  const [ config,setConfig ] = useState()
    // =======login function=======
    const login = async (inputs)=>{
        // console.log(inputs)
       const res =  await axios.post(`${preApi}/auth/login`,inputs)
       setCurrentUser(res.data)
   
    }
    // ======logout function=======
     const logout = async(inputs)=>{
        // alert("")
        await axios.post(`${preApi}/auth/logout`)
        setCurrentUser(null)
      //   setConfig({})
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
