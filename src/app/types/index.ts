import { User as FirebaseUser } from 'firebase/auth';

export interface User extends FirebaseUser {
  email: string | null;
}

export interface Error {
  message: string;
} 