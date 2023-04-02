import { io, Socket } from "socket.io-client";

import {
  getPreviousUrl,
  removePreviousUrl,
  setPreviousUrl,
} from "./localStorage";

export type listenerType = (args: any) => any;

class SocketAgent {
  private static instance: SocketAgent;
  private static socket: Socket | null = null;

  private constructor() {
    const previousUrl = getPreviousUrl();
    if (previousUrl) {
      SocketAgent.socket = io(previousUrl);

      this.subscribe("connect", () => {
        console.log("SocketAgent connected");
      });

      this.subscribe("disconnect", () => {
        console.log("SocketAgent disconnected");
      });
    }
  }

  public static getInstance(): SocketAgent {
    if (!SocketAgent.instance) {
      SocketAgent.instance = new SocketAgent();
    }

    return SocketAgent.instance;
  }

  public getSocket() {
    return SocketAgent.socket;
  }

  public connect(url: string) {
    if (SocketAgent.socket) {
      this.disconnect();
    }
    setPreviousUrl(url);
    SocketAgent.socket = io(url);
  }

  public send(event: string, data?: any) {
    SocketAgent.socket?.emit(event, data);
  }

  public onAny(listener: listenerType) {
    if (SocketAgent.socket) {
      SocketAgent.socket.onAny((...args) => listener(args));
    }
  }

  public offAny() {
    SocketAgent.socket?.offAny();
  }

  public subscribe(event: string, listener: listenerType) {
    SocketAgent.socket?.on(event, listener);
  }

  public unsubscribe(event: string) {
    SocketAgent.socket?.off(event);
  }

  public subscribeOnce(event: string, listener: listenerType) {
    SocketAgent.socket?.once(event, listener);
  }

  public getEventListeners(event: string) {
    return SocketAgent.socket?.listeners(event);
  }

  public disconnect() {
    SocketAgent.socket?.disconnect();
    SocketAgent.socket = null;
    removePreviousUrl();
  }
}

export default SocketAgent;
