"use client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const SignInPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

   function SignIN(email:any,password:any) {
    let BaseUrl = "http://127.0.0.1:5000/admin/signin";
    return new Promise((resolve, reject) => {
    fetch(BaseUrl, {
      method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:""
     
      },
      body: JSON.stringify({email,password}),
    })
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        reject(error);
      });
    });
    }

  const handleSignIn = (e:any) => {
    e.preventDefault();

    SignIN(email,password).then((result : any) => {
      if(result?.message == "Sign-in successful"){
        localStorage.setItem("token", result?.token);
        router.push("/dashboard");
      }
     
    }
  );
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Admin Sign In</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSignIn}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
