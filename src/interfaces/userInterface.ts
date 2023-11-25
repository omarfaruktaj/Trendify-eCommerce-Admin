export interface LoginCredential {
  email: string
  password: string
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface User {
  name: string
  email: string
  role: UserRole
}
