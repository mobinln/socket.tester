import { createContext, ReactNode, useContext } from "react";
import SocketAgent from "./SocketAgent";

const socketContext = createContext({
  socket: SocketAgent,
});

export default function SocketProvider({ children }: { children: ReactNode }) {
  return (
    <socketContext.Provider value={{ socket: SocketAgent }}>
      {children}
    </socketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(socketContext);
};
