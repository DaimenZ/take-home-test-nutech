export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  password: string;
  balance: number;
  created_on: string;
  updated_on: string;
}

export interface RegisterDTO {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
}
