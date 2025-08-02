import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function WatchTogether() {
  const { roomId } = useParams();
  const socket = useRef(null);
  const videoRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("joinRoom", roomId);

    socket.current.on("play", () => videoRef.current.play());
    socket.current.on("pause", () => videoRef.current.pause());
    socket.current.on("seek", time => videoRef.current.currentTime = time);
    socket.current.on("chatMessage", msg => setMessages(prev => [...prev, msg]));

    return () => socket.current.disconnect();
  }, [roomId]);

  const sendMessage = () => {
    socket.current.emit("chatMessage", roomId, chat);
    setChat("");
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <video
          ref={videoRef}
          controls
          className="w-full"
          src={`http://localhost:5000/uploads/videos/sample.mp4`}
          onPlay={() => socket.current.emit("play", roomId)}
          onPause={() => socket.current.emit("pause", roomId)}
          onSeeked={() => socket.current.emit("seek", roomId, videoRef.current.currentTime)}
        />
      </div>
      <div className="w-80 bg-gray-900 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((m, i) => <p key={i}>{m}</p>)}
        </div>
        <div className="flex">
          <input value={chat} onChange={e => setChat(e.target.value)} className="flex-1 p-2" />
          <button onClick={sendMessage} className="bg-red-600 px-4">Send</button>
        </div>
      </div>
    </div>
  );
}
