import axios from "axios";

export const login = async (email: string, pass: string) => {
  try{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tienda/auth/login`, {
    email,
    pass,
  });
  return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error:any){
    if(error.response){
      throw new Error(error.response.data.message)
    }
    throw new Error("Error de red o servidor");
  }
};
