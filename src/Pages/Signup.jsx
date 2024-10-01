// import React, { useState, useContext } from 'react';
// import './CSS/Signup.css';
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginSignup = () => {
//     const { signUpUser } = useContext(ShopContext);

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [agreeToTerms, setAgreeToTerms] = useState(false);

//     const handleSignUp = () => {
//         if (name && email && password && agreeToTerms) {
//             const newUser = {
//                 name,
//                 email,
//                 password
//             };
//             signUpUser(newUser);
//         } else {
//             toast.warning('Please fill in all the fields and agree to the terms.!', {
//                 position: "bottom-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         }
//     };

//     return (
//         <div className='signup'>
//             <div className="signup-container">
//                 <h1>Sign Up</h1>
//                 <div className="signup-fields">
//                     <input
//                         type="text"
//                         placeholder="Your Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <input
//                         type="email"
//                         placeholder="Email Address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>

//                 <button onClick={handleSignUp}>Sign Up</button>

//                 <p className="signup-login">Already have an account?<Link to="/login"> Login here</Link></p>

//                 <div className="signup-agree">
//                     <input
//                         type="checkbox"
//                         checked={agreeToTerms}
//                         onChange={() => setAgreeToTerms(!agreeToTerms)}
//                     />
//                     <p>By continuing, I agree to the terms of use & privacy policy</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginSignup;
