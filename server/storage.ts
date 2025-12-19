import { 
  type User, 
  type InsertUser,
  type BookingRequest,
  type InsertBookingRequest,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createBookingRequest(request: InsertBookingRequest): Promise<BookingRequest>;
  getBookingRequest(id: string): Promise<BookingRequest | undefined>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookingRequests: Map<string, BookingRequest>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.bookingRequests = new Map();
    this.contactMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createBookingRequest(request: InsertBookingRequest): Promise<BookingRequest> {
    const id = randomUUID();
    const bookingRequest: BookingRequest = { 
      ...request, 
      id,
      createdAt: new Date()
    };
    this.bookingRequests.set(id, bookingRequest);
    return bookingRequest;
  }
  
  async getBookingRequest(id: string): Promise<BookingRequest | undefined> {
    return this.bookingRequests.get(id);
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
}

export const storage = new MemStorage();
