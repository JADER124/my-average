import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../imgs/calcular.png";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(10, "El nombre es muy corto")
        .required("El nombre del usuario es obligatorio"),
      email: Yup.string()
        .email("Valida que el correo esta bien :)")
        .required("Debes ingresar un correo"),
      password: Yup.string()
        .required("Campo obligatorio")
        .min(
          8,
          "la contraseña debe contener como minimo 8 caracteres y un numero"
        ),
      password2: Yup.string()
        .required("Campo Obligatorio")
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
    <div className="absolute border-2 border-gray-400/50 rounded-xl mt-5 ml-20 hover:bg-cyan-600/30">
      <a href="/">
      <FaArrowLeft className="text-3xl text-gray-400"/>
      </a>
    </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-20 " src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to MyAverage
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  required
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 my-1"
                  role="alert"
                >
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="Name"
                className="block text-left text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  required
                  className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 my-1"
                  role="alert"
                >
                  <p>{formik.errors.name}</p>
                </div>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  required
                  className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 my-1"
                  role="alert"
                >
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password2}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.password2 && formik.errors.password2 ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 my-1"
                  role="alert"
                >
                  <p>{formik.errors.password2}</p>
                </div>
              ) : null}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Ya tienes una cuenta?
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Inicia sesion
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
