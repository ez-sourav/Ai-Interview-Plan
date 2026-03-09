import  { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';

export const Register = () => {
  const {loading,handleRegister} = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
   await handleRegister({username,email,password})
    navigate('/')
  }

  if(loading){
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} name="username" id="username" placeholder='Enter username' />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email" id="email" placeholder='Enter email address' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" id="password" placeholder='Enter password' />
          </div>
          <button className='button primary-button'>Register</button>
        </form>

        <p>Already have an account? <Link to='/login'>Login</Link> </p>
      </div>
    </main>
  )
}
