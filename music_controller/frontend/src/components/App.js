import React from "react";
import { useGlobalContext } from "../context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

function App() {
  const { roomCode } = useGlobalContext();
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
