import { useState } from "react";
import { useSocket } from "../logic/SocketProvider";
import Radio from "./Radio";

export default function EmitEvent() {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState("text");
  const { socket } = useSocket();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      if (name && body) {
        let data = body;
        if (type === "json") {
          data = JSON.parse(body);
        }
        socket.getInstance().send(name, data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Emit</h4>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Event Name"
          id="eventName"
          style={{ marginBottom: 0 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" style={{ marginBottom: 0 }}>
          send
        </button>
      </div>
      <fieldset style={{ marginTop: 10 }}>
        <legend>Data type:</legend>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {["text", "json"].map((i) => (
            <Radio
              key={i}
              checked={type === i}
              label={i}
              value={i}
              onChange={(c) => c && setType(i)}
            />
          ))}
        </div>
      </fieldset>
      <textarea
        placeholder="Text, JSON, ..."
        style={{ marginTop: 10, height: 200 }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </form>
  );
}
