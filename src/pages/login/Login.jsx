import "./Login.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      console.log(username, password);
      const response = await axios.post('https://zaya.pythonanywhere.com/api/v1/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        } 
      });

      if (response.data.result !== "login unsuccessful") {

        // Extract session cookie from response headers
        const sessionCookie = response.headers['Set-Cookie'];

        history('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (e) {
      // console.error('Error logging in:', error);
      setError('An error occurred while logging in. Verify Login Credentials');
    }
  };

  return ( 
    <div className="login">
      <div className="top-section">
        <h2>Group 1 Logo</h2>
      </div>
      <div className="login-form">
        <form action="" onSubmit={handleSubmit}>
          <h2>Login Account</h2>
          <label className="label" for="username">Username</label> 
          <div className="mail-input">
            <MdOutlineMailOutline className="email-icon" />
            <input type="text" id="email" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>

          <label className="label" for="email">Password</label> 
          <div className="password-input">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} /> 
            <span onClick={handleTogglePassword}>
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div> 
          <span>Forgot Password</span>
          <button type="submit" >Continue</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
   );
}
 
export default Login;