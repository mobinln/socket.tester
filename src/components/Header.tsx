import { useEffect, useState } from "react";
import { useSocket } from "../logic/SocketProvider";

export default function Header() {
  const { socket } = useSocket();
  const [url, setUrl] = useState("");
  const [connected, setConnected] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (connected) {
      socket.getInstance().disconnect();
    } else if (url) {
      socket.getInstance().connect(url);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setConnected(Boolean(socket.getInstance().getSocket()?.connected));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row" style={{ marginTop: 10 }}>
        <div
          className="column column-75"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="URL"
            id="url"
            style={{ marginBottom: 0 }}
            value={
              connected
                ? (socket.getInstance()?.getSocket()?.io as any).uri
                : url
            }
            onChange={(e) => setUrl(e.target.value)}
            disabled={connected}
          />
        </div>
        <div
          className="column"
          style={{ display: "flex", alignItems: "center" }}
        >
          <button type="submit" style={{ width: "100%", marginBottom: 0 }}>
            {connected ? "disconnect" : "connect"}
          </button>
        </div>
      </div>
    </form>
  );
}
