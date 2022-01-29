import React, { Component } from "react";
import { useGlobalContext } from "../context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  useNavigate,
} from "react-router-dom";
import { render } from "react-dom";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
function App() {
  console.log(useGlobalContext);
  // console.log("shubah");
  const { roomCode } = useGlobalContext();
  // const navigate = useNavigate();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
          render={() => {
            return roomCode ? navigate(`/room/${roomCode}`) : navigate("/");
          }}
        ></Route>
        <Route path="/join" element={<RoomJoinPage />}></Route>
        <Route path="/create" element={<CreateRoomPage />}></Route>
        <Route path="/room/:roomCode" element={<Room />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
