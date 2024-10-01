// import React, { useState, useContext } from 'react';
// import './CSS/Login.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = ({ setIsLogined }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();
//   const { setUser} = useContext(ShopContext);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error('Both fields are required!', {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//     });
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const existingUser = users.find(user => user.email === email);
//     console.log(existingUser)

//     if (existingUser) {
//       if (existingUser.password === password) {
//         localStorage.setItem('user', JSON.stringify(existingUser));
//         setUser(existingUser);
//         setIsLogined(true);

//         toast.success('Login Succesful', {
//           position: "bottom-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//       })

//         navigate('/');
//       } 
//       else {
//         toast.error('Incorrect password!', {
//           position: "bottom-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//       });
//       }
//     } else {
//       toast.error('User does not exist!', {
//         position: "bottom-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//     });
//     }
//   };

//   return (
//     <div className='login'>
//       <div className="login-container">
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="login-fields">
//             <input
//               type="email"
//               placeholder='Email Address'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder='Password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         <p className="login-login">Don't have an account? <Link to="/Signup">Sign Up Here</Link></p>
//       </div>
//     </div>
//   );
// };

// export default Login;