import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { render } from "react-dom";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/join" element={<RoomJoinPage />}></Route>
        <Route path="/create" element={<CreateRoomPage />}></Route>
        <Route path="/room/:roomCode" element={<Room />}></Route>
      </Routes>
    </Router>
  );
}
export default App;