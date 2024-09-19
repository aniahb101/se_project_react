import { processServerResponse } from "./utils";

const baseUrl = "http://localhost:3001";

export const fetchItems = async () => {
  const response = await fetch(`${baseUrl}/items`);
  return processServerResponse(response);
};

export const addItem = async (name, imageUrl, weather, token) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
  return processServerResponse(response);
};

export const deleteItem = async (id, token) => {
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return processServerResponse(response);
};

export const fetchUserData = async (token) => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return processServerResponse(response);
};

export const updateUserData = async (name, avatar, token) => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
  return processServerResponse(response);
};

export const addCardLike = async (id, token) => {
  const response = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return processServerResponse(response);
};

export const removeCardLike = async (id, token) => {
  const response = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return processServerResponse(response);
};
