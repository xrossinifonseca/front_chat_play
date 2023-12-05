import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const api = axios.create({
  baseURL: url,
});

interface CreateCustomer {
  name: string;
  email: string;
  password: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
}

export const createCustomer = async (body: CreateCustomer) => {
  return await api.post("auth/signup", {
    name: body.name,
    email: body.email,
    password: body.password,
  });
};

export const loginCustomer = async (body: {
  email: string;
  password: string;
}) => {
  return await api.post("auth/login", {
    email: body.email,
    password: body.password,
  });
};

