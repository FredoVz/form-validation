import { useState, type SubmitEvent } from "react";

const Login = () => {
  //   const [username, setUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleLogin = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    if (password.length < 8) {
      setErrorPassword("Password must be at least 8 characters");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen min-h-screen gap-4">
      <div className="p-8 border border-gray-200 rounded-xl">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-bold text-center text-teal-600">Sign In To Your Account</h2>
        </div>
        <div className="max-w-sm w-sm">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Insert Your Username"
                autoComplete="off"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-teal-600"
                // value={username}
                // onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input type="password" name="password" id="password" placeholder="Insert Your Password" autoComplete="off" className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-teal-600" />
              {errorPassword && <small className="text-red-600">{errorPassword}</small>}
            </div>
            <button type="submit" className="w-full px-4 py-2 mt-4 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500">
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
