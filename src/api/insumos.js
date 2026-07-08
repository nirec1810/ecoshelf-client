const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

async function handleResponse(response) {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `Error ${response.status}`);
  }
  return response.json();
}

export async function getInsumos() {
  const response = await fetch(`${BASE_URL}/api/insumos`, { headers });
  return handleResponse(response);
}

export async function getInsumoById(id) {
  const response = await fetch(`${BASE_URL}/api/insumos/${id}`, { headers });
  return handleResponse(response);
}

export async function createInsumo(data) {
  const response = await fetch(`${BASE_URL}/api/insumos`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateInsumo(id, data) {
  const response = await fetch(`${BASE_URL}/api/insumos/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteInsumo(id) {
  const response = await fetch(`${BASE_URL}/api/insumos/${id}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(response);
}