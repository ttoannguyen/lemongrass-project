/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import api from "./axios";

interface WebSocketError {
  error: string;
}

interface WebSocketConfig {
  baseURL?: string;
  onConnect?: () => void;
  onError?: (error: WebSocketError) => void;
  onDisconnect?: () => void;
}

interface NotificationMessage {
  senderId: string;
  receiverId: string;
  message: string;
  targetType: string;
  targetId: string;
}

class WebSocketClient {
  private client: Client;
  private connected: boolean = false;
  private subscriptions: {
    [key: string]: { subscription: any; callback: (message: any) => void };
  } = {};

  constructor(config: WebSocketConfig = {}) {
    const {
      baseURL = import.meta.env.VITE_WS_URL || "http://localhost:8080/ws",
      onConnect,
      onError,
      onDisconnect,
    } = config;

    this.client = new Client({
      webSocketFactory: () => new SockJS(baseURL),
      connectHeaders: this.getConnectHeaders(),
      debug: (str) => console.log(`[WebSocket Debug] ${str}`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      this.connected = true;
      console.log(`[WebSocket] Connected: ${frame}`);
      Object.keys(this.subscriptions).forEach((destination) => {
        this.subscribe(destination, this.subscriptions[destination].callback);
      });
      onConnect?.();
    };

    this.client.onStompError = async (frame) => {
      const error: WebSocketError = {
        error: frame.body || "WebSocket error occurred",
      };
      console.error(`[WebSocket] Error: ${error.error}`);
      if (error.error.includes("Invalid JWT")) {
        try {
          await this.refreshToken();
          this.client.deactivate();
          this.client.connectHeaders = this.getConnectHeaders();
          this.client.activate();
        } catch (refreshError) {
          console.error("[WebSocket] Token refresh failed:", refreshError);
          onError?.({ error: "Token refresh failed" });
        }
      } else {
        onError?.(error);
      }
    };

    this.client.onDisconnect = () => {
      this.connected = false;
      console.log("[WebSocket] Disconnected");
      onDisconnect?.();
    };
  }

  private getConnectHeaders(): { [key: string]: string } {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async refreshToken(): Promise<void> {
    try {
      const response = await api.post("/api/_v1/auth/refresh");
      const newToken = response.data.token;
      localStorage.setItem("authToken", newToken);
      console.log("[WebSocket] Refreshed token:", newToken);
    } catch (error) {
      console.error("[WebSocket] Token refresh failed:", error);
      throw error;
    }
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        resolve();
        return;
      }

      this.client.connectHeaders = this.getConnectHeaders();
      this.client.activate();
      this.client.onConnect = (frame) => {
        this.connected = true;
        console.log(`[WebSocket] Connected: ${frame}`);
        resolve();
      };
      this.client.onStompError = (frame) => {
        const error: WebSocketError = {
          error: frame.body || "Failed to connect",
        };
        console.error(`[WebSocket] Connection error: ${error.error}`);
        reject(error);
      };
    });
  }

  public subscribe(
    receiverId: string,
    callback: (message: NotificationMessage) => void
  ) {
    if (!this.connected) {
      console.warn(
        "[WebSocket] Not connected, will subscribe after connection"
      );
      this.subscriptions[
        `/user/c31df119-e61d-4ffc-ab1a-6ed66e34b581/queue/notifications`
      ] = {
        subscription: null,
        callback,
      };
      return {
        unsubscribe: () =>
          this.unsubscribe(
            `/user/c31df119-e61d-4ffc-ab1a-6ed66e34b581/queue/notifications`
          ),
      };
    }
    const subscription = this.client.subscribe(
      `/user/c31df119-e61d-4ffc-ab1a-6ed66e34b581/queue/notifications`,
      (message) => {
        try {
          const parsedMessage = JSON.parse(message.body);
          callback(parsedMessage);
        } catch (error) {
          console.error(`[WebSocket] Failed to parse message: ${error}`);
        }
      }
    );
    this.subscriptions[
      `/user/c31df119-e61d-4ffc-ab1a-6ed66e34b581/queue/notifications`
    ] = {
      subscription,
      callback,
    };
    return subscription;
  }

  private unsubscribe(destination: string) {
    if (this.subscriptions[destination]) {
      this.subscriptions[destination].subscription?.unsubscribe();
      delete this.subscriptions[destination];
    }
  }

  public sendLike(postId: string, receiverId: string, username: string) {
    if (!this.connected) throw new Error("WebSocket not connected");
    // const token = localStorage.getItem("authToken");
    this.client.publish({
      destination: "/app/like",
      // headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ targetId: postId, receiverId, username }),
    });
  }

  public disconnect() {
    this.client.deactivate();
    this.connected = false;
    this.subscriptions = {};
  }

  public isConnected(): boolean {
    return this.connected;
  }
}

const wsClient = new WebSocketClient({
  baseURL: import.meta.env.VITE_WS_URL || "http://localhost:8080/ws",
  onConnect: () => console.log("[WebSocket] Connection established"),
  onError: (error) => console.error("[WebSocket] Error:", error),
  onDisconnect: () => console.log("[WebSocket] Disconnected"),
});

export default wsClient;
