const SignIn = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-6 sm:p-0">
      <div className="bg-white text-black p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="username@gmail.com"
              className="w-full px-3 py-2 bg-gray-100 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 bg-gray-100 text-black rounded"
            />
          </div>
          <div className="mb-4 text-left">
            <a
              href="#forgot-password"
              className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-400 transition duration-200">
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account yet?&nbsp;
          <a href="#register" className="text-blue-500 hover:underline">
            Register for free
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
