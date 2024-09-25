import React, { useState, useContext } from "react";
import logo from "../../imgs/calcular.webp";
import { FaArrowLeft } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const recoverPass = async () => {
    setIsSubmitting(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(
          "Revisa tu correo, enviamos un link para recuperar tu contraseña :)"
        );
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("Por favor ingresa un correo valido :)!");
        }
        if (error.code === "auth/user-not-found") {
          alert("El correo ingresado no existe ! :(");
        }
        if (error.code === "auth/missing-email") {
          alert("Debes ingresar un correo en el apartado de Email address");
        }
      });

    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="absolute border-2 border-gray-400/50 rounded-xl mt-5 ml-20 hover:bg-cyan-600/30">
        <a href="/">
          <FaArrowLeft className="text-3xl text-gray-400" />
        </a>
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-20 " src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="block w-full rounded-md pl-2  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => recoverPass()}
                    disabled={isSubmitting}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {isSubmitting ? "Verificando..." : "Forgot password?"}
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={async (e) => {
                  const user = await login(e, email, password);
                  if (user != null) {
                    navigate("/homeuser");
                  }
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No estas registrado?
            <a
              href="/signIn"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              !Registrate!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
