import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "use-timer";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button } from "../../components";

const Quiz = () => {
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState({
        score: 0,
        correct: 0,
        wrong: 0,
    });

    const { time } = useTimer({
        autostart: true,
        initialTime: JSON.parse(localStorage.getItem("timenow"))
            ? JSON.parse(localStorage.getItem("timenow"))
            : 600,
        timerType: "DECREMENTAL",
        endTime: 0,
        onTimeOver: () => {
            setCurrentQuestion(quiz?.length);
            setResult({
                score: result.score,
                correct: result.correct,
                wrong: result.wrong + quiz.length - currentQuestion,
            });
        },
    });

    useEffect(() => {
        setQuiz(JSON.parse(localStorage.getItem("questions")));
        setCurrentQuestion(
            localStorage.getItem("current")
                ? JSON.parse(localStorage.getItem("current"))
                : 0
        );
        setResult(
            localStorage.getItem("result")
                ? JSON.parse(localStorage.getItem("result"))
                : { score: 0, correct: 0, wrong: 0 }
        );
    }, []);

    const handleLeave = () => {
        localStorage.clear();
        navigate("/", { replace: true });
    };

    const answerChecker = () => {
        if (answer === quiz?.[currentQuestion]?.correct_answer) {
            const data = {
                score: result.score + 10,
                correct: result.correct + 1,
                wrong: result.wrong,
            };

            setResult(data);

            return data;
        } else {
            const data = {
                score: result.score,
                correct: result.correct,
                wrong: result.wrong + 1,
            };

            setResult(data);

            return data;
        }
    };

    const nextQuestion = () => {
        const curr = currentQuestion + 1;

        setCurrentQuestion(curr);

        return curr;
    };

    const handleNext = () => {
        localStorage.setItem("result", JSON.stringify(answerChecker()));
        localStorage.setItem("current", JSON.stringify(nextQuestion()));
        localStorage.setItem("timenow", time);
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-b from-c1 to-c2 flex items-center justify-center">
            <div className="bg-white justify-center w-5/6 md:w-3/5 h-4/5 rounded-lg flex flex-col p-8 md:p-20">
                {currentQuestion < quiz?.length ? (
                    <>
                        <h1 className="self-center text-xl md:text-2xl lg:text-4xl font-bold text-green-500">
                            {time}
                        </h1>
                        <div className="flex justify-between items-center">
                            <div className="leading-10 text-sm">
                                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
                                    Question
                                </h1>
                                <h2 className="my-2 text-sm md:text-lg lg:text-2xl font-medium">
                                    {currentQuestion + 1} / {quiz?.length}
                                </h2>
                            </div>
                            <Button
                                placeholder={"Leave"}
                                onClick={handleLeave}
                                style={["bg-red-500 hover:border-red-500"]}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row text-xs md:text-sm mb-4">
                            <p className="">
                                {quiz?.[currentQuestion]?.category}
                            </p>
                            <p className="hidden md:flex mx-5">|</p>
                            <p className="capitalize">
                                {quiz?.[currentQuestion]?.difficulty}
                            </p>
                        </div>
                        <div className="text-xs md:text-sm lg:text-base leading-5 md:leading-6 lg:leading-7 text-justify">
                            <h3
                                dangerouslySetInnerHTML={{
                                    __html: quiz?.[currentQuestion]?.question,
                                }}
                            />
                            <div className="flex flex-col items-center my-4">
                                {quiz?.[currentQuestion]?.allAnswers.map(
                                    (i) => (
                                        <button
                                            key={i}
                                            onClick={() => setAnswer(i)}
                                            dangerouslySetInnerHTML={{
                                                __html: i,
                                            }}
                                            className="w-full px-4 focus:bg-c1 text-black focus:text-white focus:animate-pulse py-1 rounded-lg"
                                        />
                                        // </label>
                                    )
                                )}
                            </div>
                        </div>
                        <Button
                            placeholder={"Next"}
                            onClick={handleNext}
                            style={["bg-blue-500 hover:border-blue-500"]}
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <h1 className="text-8xl font-bold animate-bounce">
                            {result?.score}
                        </h1>
                        <div className="flex w-3/5 md:w-2/5 justify-between my-10">
                            <p className="flex justify-center items-center text-green-500 text-2xl font-semibold">
                                <FaCheckCircle /> : {result?.correct}
                            </p>
                            <p className="flex justify-center items-center text-red-500 text-2xl font-semibold">
                                <FaTimesCircle /> : {result?.wrong}
                            </p>
                        </div>
                        <Button
                            placeholder={"Play Again"}
                            onClick={handleLeave}
                            style={["bg-blue-500 hover:border-blue-500"]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
