import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NewQuestion from "./pages/NewQuestion";
import PrivateRoute from "./components/PrivateRoute";
import Questions from "./pages/Questions";
import Question from "./pages/Question";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-question" element={<PrivateRoute />}>
              <Route path="/new-question" element={<NewQuestion />} />
            </Route>
            <Route path="/questions" element={<PrivateRoute />}>
              <Route path="/questions" element={<Questions />} />
            </Route>
            <Route path="/question/:questionId" element={<PrivateRoute />}>
              <Route path="/question/:questionId" element={<Question />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
