import { Message } from "@/model/User";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean; // here the ? means they are optional
  messages?: Array<Message>
  error?: string; 
};