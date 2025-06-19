export interface BaseResponse<T = unknown> {
  code: number;
  result: T;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  account: Account;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RolePermission {
  name: string;
  description: string;
  createdBy: string;
  createdDate: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
}

export interface Role {
  name: string;
  description: string;
  permissions: RolePermission[];
  createdBy: string;
  createdDate: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
}

export interface Account {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dob?: string;
  address?: string;
  inactive: boolean;
  roles: Role[];
  profilePictureUrl: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  deleted: boolean;
}

export interface RegisterResponse {
  code: number;
  result: Account;
}

export interface AuthContextType {
  token: string | null;
  account: Account | null;
  login: (token: string, account: Account) => void;
  logout: () => void;
}

export interface Introspect {
  valid: boolean;
  account?: Account;
}
