const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 p-6 sm:p-0">
      <div className="bg-white text-black p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
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
            <label className="block text-sm font-semibold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-456-7890"
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
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 bg-gray-100 text-black rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-400 transition duration-200">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?&nbsp;
          <a href="#login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <p className="mt-4 text-center text-sm">
          <a href="#home" className="text-blue-500 hover:underline">
            Go back to home
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
