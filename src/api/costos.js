const COSTOS_URL = import.meta.env.VITE_COSTOS_API_URL;

export async function calcularCosto(payload) {
  const response = await fetch(`${COSTOS_URL}/api/costos/calcular`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.errores?.join(", ") || `Error ${response.status}`);
  }

  return response.json();
}