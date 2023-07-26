import { useState } from "react"
import "./register.scss"
import { Link } from "react-router-dom"
import axios from "axios"

const Register = () => {

  const[inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:""
  })

  const [err, setErr] = useState(null);

  const handleChange = (e) =>{
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}))
  };

  const handleClick = async (e) =>{
    e.preventDefault();

    try{
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    }catch(e){
      setErr(e);
    }
  }

  console.log(err);


  return (
    <div className="register">
        <div className="card">
            <div className="right">
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <input type="text" placeholder="Email" name="email" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                    <button onClick={handleClick}>Register</button>
                </form>
            </div>
            <div className="left">
                <h1>Welcome</h1>
                <p>the shit u doin here</p>

                <span>nani?</span>
                <Link to="/login">
                  <button>Shoot</button>
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default Register