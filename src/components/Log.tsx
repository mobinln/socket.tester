import { useEffect, useState } from "react";
import { useSocket } from "../logic/SocketProvider";

export default function Log() {
  const { socket } = useSocket();
  const [log, setLog] = useState<string[][]>([]);

  useEffect(() => {
    socket.getInstance().onAny((...args) => {
      setLog((p) => [...p, args]);
    });

    return () => socket.getInstance().offAny();
  }, []);
  console.log(log[0]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ marginBottom: 0 }}>Log</h4>
        <a href="#" onClick={() => setLog([])}>
          clear
        </a>
      </div>
      <div
        style={{
          maxHeight: 500,
          overflowY: "auto",
          marginTop: 10,
          border: log.length > 0 ? "1px solid" : "none",
          borderRadius: 8,
        }}
      >
        {log.map((l, i) => (
          <pre key={i} style={{ paddingLeft: 8 }}>
            <p>Event:{l[0][0]}</p>
            <p>{JSON.stringify(l[0][1])}</p>
          </pre>
        ))}
      </div>
    </>
  );
}
