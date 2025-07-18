export interface NotificationMessage {
  senderId: string;
  receiverId: string;
  message: string;
  targetType: string;
  targetId: string;
}
