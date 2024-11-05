import axios from "axios";
import { getSession } from "next-auth/react";

export const fetchProtectedData = async () => {
  const session = await getSession();

  if (!session?.access_token) {
    throw new Error("No access token available");
  }

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected-endpoint`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });
  return response.data;
};
