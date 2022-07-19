import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as yup from "yup";
import { Vector } from "../../assets";
import { Dropdown } from "../../components";
import { BASE_URL, CATEGORY, DIFFICULTY } from "../../helpers";
import { HashLoader } from "react-spinners";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const loginValidation = yup.object().shape({
        name: yup.string().required("Name is Required!"),
        category: yup.string().required("Category is Required!"),
        difficulty: yup.string().required("Difficulty is Required!"),
    });

    const handleLogin = ({ category, difficulty }) => {
        setLoading(true);
        axios
            .get(BASE_URL(category, difficulty))
            .then((response) => {
                let data = response.data.results.map((item) => ({
                    ...item,
                    allAnswers: [
                        item.correct_answer,
                        ...item.incorrect_answers,
                    ].sort(() => Math.random() - 0.5),
                }));
                localStorage.setItem("questions", JSON.stringify(data));
                navigate("/quiz", { replace: true });
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-50">
            <div className="w-2/5 h-3/4 hidden md:flex bg-gradient-to-b from-c1 to-c2 rounded-l-xl drop-shadow-lg">
                <img src={Vector} alt="Vector" />
            </div>
            <div className="md:w-2/5 w-5/6 h-3/4 bg-white rounded-xl md:rounded-none md:rounded-r-xl drop-shadow-lg flex flex-col justify-center items-center">
                {loading ? (
                    <HashLoader
                        color="#3691F3"
                        cssOverride={null}
                        loading
                        size={60}
                        speedMultiplier={1}
                    />
                ) : (
                    <>
                        <h1 className="mb-4 text-3xl md:text-4xl font-semibold text-black">
                            Quizzizz
                        </h1>
                        <Formik
                            initialValues={{
                                name: "",
                                category: "",
                                difficulty: "",
                            }}
                            validationSchema={loginValidation}
                            onSubmit={(values) => handleLogin(values)}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col w-3/4 text-xs md:text-base font-medium">
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        className="px-5 py-3 mt-4 rounded-lg bg-slate-100"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="ml-2 text-xs text-red-600"
                                    />
                                    <Dropdown
                                        name={"category"}
                                        placeholder={"Select Category"}
                                        data={CATEGORY}
                                    />
                                    <ErrorMessage
                                        name="category"
                                        component="div"
                                        className="ml-2 text-xs text-red-600"
                                    />
                                    <Dropdown
                                        name={"difficulty"}
                                        placeholder={"Select Difficulty"}
                                        data={DIFFICULTY}
                                    />
                                    <ErrorMessage
                                        name="difficulty"
                                        component="div"
                                        className="ml-2 text-xs text-red-600"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="p-3 mt-6 rounded-lg bg-c1 hover:bg-c2 text-white focus:ring focus:ring-violet-300"
                                    >
                                        Submit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
