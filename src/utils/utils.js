export const processServerResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to process server response");
};
