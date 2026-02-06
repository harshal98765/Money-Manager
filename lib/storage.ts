// Shared in-memory storage for demo/development
// In production, replace with proper database

export interface User {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export interface Transaction {
  _id: string;
  userId: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category: string;
  division: 'Personal' | 'Office';
  description: string;
  date: Date;
  account: string;
  fromAccount?: string;
  toAccount?: string;
  transferId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Global storage objects - using simple objects instead of Maps for better persistence
let users: Record<string, User> = {};
let transactions: Record<string, Transaction[]> = {};

// Initialize with test data for development
const initializeStorage = () => {
  // This ensures data persists across hot reloads in development
  if (typeof global !== 'undefined') {
    // @ts-ignore
    if (!global.__STORAGE_USERS__) {
      // @ts-ignore
      global.__STORAGE_USERS__ = {};
    }
    // @ts-ignore
    if (!global.__STORAGE_TRANSACTIONS__) {
      // @ts-ignore
      global.__STORAGE_TRANSACTIONS__ = {};
    }
    // @ts-ignore
    users = global.__STORAGE_USERS__;
    // @ts-ignore
    transactions = global.__STORAGE_TRANSACTIONS__;
  }
};

initializeStorage();

// Helper functions
export function getUser(email: string): User | undefined {
  initializeStorage();
  console.log('[v0] Storage state - users:', Object.keys(users));
  console.log('[v0] Looking for user:', email);
  return users[email];
}

export function setUser(email: string, user: User): void {
  initializeStorage();
  console.log('[v0] Setting user:', email);
  users[email] = user;
  console.log('[v0] Users in storage after set:', Object.keys(users));
}

export function userExists(email: string): boolean {
  initializeStorage();
  return email in users;
}

export function getUserTransactions(userId: string): Transaction[] {
  initializeStorage();
  return transactions[userId] || [];
}

export function setUserTransactions(userId: string, transactionsList: Transaction[]): void {
  initializeStorage();
  transactions[userId] = transactionsList;
}

export function addTransaction(userId: string, transaction: Transaction): void {
  initializeStorage();
  if (!transactions[userId]) {
    transactions[userId] = [];
  }
  transactions[userId].push(transaction);
}

export function updateTransaction(userId: string, transactionId: string, updates: Partial<Transaction>): boolean {
  initializeStorage();
  if (!transactions[userId]) return false;
  const index = transactions[userId].findIndex((t) => t._id === transactionId);
  if (index === -1) return false;
  
  transactions[userId][index] = { ...transactions[userId][index], ...updates };
  return true;
}

export function deleteTransaction(userId: string, transactionId: string): boolean {
  initializeStorage();
  if (!transactions[userId]) return false;
  const index = transactions[userId].findIndex((t) => t._id === transactionId);
  if (index === -1) return false;
  
  transactions[userId].splice(index, 1);
  return true;
}
