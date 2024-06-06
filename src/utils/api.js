import { processServerResponse } from "./utils";

const baseUrl = "http://localhost:3001";

export const fetchItems = async () => {
  const response = await fetch(`${baseUrl}/items`);
  return processServerResponse(response);
};

export const addItem = async (name, imageUrl, weather) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
  return processServerResponse(response);
};

export const deleteItem = async (id) => {
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
  return processServerResponse(response);
};
