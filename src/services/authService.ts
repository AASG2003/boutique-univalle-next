import axios from "axios";

export const login = async (email: string, pass: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tienda/auth/login`, {
    email,
    pass,
  });
  return response.data;
};
