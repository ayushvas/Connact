import { Link, useNavigate } from "react-router-dom"
import "./login.scss"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { useState } from "react";

const Login = () => {
    const {login} = useContext(AuthContext);

    const[inputs, setInputs] = useState({
        email:"",
        password:"",
      })


      const handleChange = (e) =>{
        setInputs((prev)=>({...prev, [e.target.name]: e.target.value}))
      };

      const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            await login(inputs);
            navigate("/");
        }catch(err){
            console.log(err);
        }
        
    }

  return (
    <div className="login">
        <div className="card">
            <div className="left">
                <h1>Welcome</h1>
                <p>the shit u doin here</p>

                <span>nani?</span>
                <Link to="/register">
                    <button>Shoot</button>
                </Link>
            </div>
            <div className="right">
                <h1>get in</h1>
                <form>
                    <input type="text" placeholder="Email" name="email" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    <button onClick={handleLogin}>p</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login