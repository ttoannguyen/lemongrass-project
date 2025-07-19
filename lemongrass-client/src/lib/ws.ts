/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/ws.ts
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;

const connect = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (stompClient?.connected) {
      resolve();
      return;
    }

    const socket = new SockJS("http://localhost:8080/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        resolve();
      },
      onStompError: (frame) => {
        console.error("WebSocket error:", frame);
        reject(frame.body);
      },
    });

    stompClient.activate();
  });
};

const disconnect = () => {
  stompClient?.deactivate();
};

const subscribe = (
  userId: string,
  onMessage: (message: any) => void
): { unsubscribe: () => void } => {
  if (!stompClient?.connected) return { unsubscribe: () => {} };

  const subscription = stompClient.subscribe(
    `/user/${userId}/queue/notifications`,
    (msg: IMessage) => {
      const payload = JSON.parse(msg.body);
      onMessage(payload);
    }
  );

  return {
    unsubscribe: () => subscription.unsubscribe(),
  };
};

const sendLike = (
  postId: string,
  receiverId: string,
  senderUsername: string
) => {
  if (!stompClient?.connected) {
    console.error("WebSocket is not connected");
    return;
  }

  const payload = {
    receiverId,
    senderUsername,
    content: "đã thả tim bài viết của bạn",
    targetType: "POST",
    targetId: postId,
  };

  stompClient.publish({
    destination: "/app/notifications",
    body: JSON.stringify(payload),
  });
};

export default {
  connect,
  disconnect,
  subscribe,
  sendLike,
};
