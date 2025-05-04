import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_URL } from '@/env';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleLogin = async(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
   try {
    const response = await axios.post(`${API_URL}/users/signIn`, {email, password});
    if(response.data.success){
      localStorage.setItem("insight-user", JSON.stringify(response.data.data));
      navigate("/dashboard");
    }
    console.log(response);
   } catch (error) {
    console.log(error);
   }
  }
  const handleSignUp = async(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/users/signUp`, {name, email, password});
      if(response.data.success){
        localStorage.setItem("insight-user", JSON.stringify(response.data.data));
        navigate("/dashboard");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-8 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Insight AI</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-gray-500 mb-6">
            {isSignUp ? 'Sign up to get started.' : 'Enter your email and password to access your account.'}
          </p>
          <form className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input type="text" placeholder="Your Name" className="w-full" value={name} onChange={(e) => setName(e.target.value)} />

              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" placeholder="you@example.com" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input type="password" placeholder="Password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)}       />
            </div>
            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                {/* <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Remember Me
                </label>
                <a href="#" className="text-blue-600 hover:underline">Forgot Your Password?</a> */}
              </div>
            )}
            <Button onClick={isSignUp ? handleSignUp : handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </Button>
          </form>
          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-sm">Or Login With</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>
          <div className="text-center text-sm">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button className="text-blue-600 hover:underline" onClick={() => setIsSignUp(false)} type="button">Sign In</button>
              </>
            ) : (
              <>
                Don&apos;t Have An Account?{' '}
                <button className="text-blue-600 hover:underline" onClick={() => setIsSignUp(true)} type="button">Register Now.</button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Right: Illustration/Marketing */}
      <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center relative">
        <div className="text-white max-w-lg p-10">
          <h2 className="text-3xl font-bold mb-4">Effortlessly manage your team and operations.</h2>
          <p className="mb-8 text-lg">Log in to access your CRM dashboard and manage your team.</p>
          <img src="https://assets-global.website-files.com/63e4e7b6e2b2e2e2e2e2e2e2/63e4e7b6e2b2e2e2e2e2e2e2_dashboard-p-800.png" alt="Dashboard Preview" className="rounded-xl shadow-lg w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;