import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PollView from "./pages/PollView";
import Nav from "../components/Nav";
import CreatePoll from "./pages/CreatePoll";

function App() {
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<PollView/>} />
          <Route path="/create" element={<CreatePoll/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
