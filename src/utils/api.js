const baseUrl = "http://localhost:3001";

export const fetchItems = async () => {
  const response = await fetch(`${baseUrl}/items`);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
};

export const addItem = async (name, imageUrl, weather) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
  if (!response.ok) {
    throw new Error("Failed to add item");
  }
  return response.json();
};

export const deleteItem = async (id) => {
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete item");
  }
  return response.json();
};
