import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Quiz } from "./pages";

const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/quiz" element={<Quiz />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
