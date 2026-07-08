import { useState } from "react";
import { calcularCosto } from "../api/costos";

const ingredienteVacio = { nombre: "", cantidad: "", costoUnitario: "" };

export default function CalculadoraCostos() {
  const [ingredientes, setIngredientes] = useState([{ ...ingredienteVacio }]);
  const [porciones, setPorciones] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function actualizarIngrediente(index, campo, valor) {
    const copia = [...ingredientes];
    copia[index] = { ...copia[index], [campo]: valor };
    setIngredientes(copia);
  }

  function agregarIngrediente() {
    setIngredientes([...ingredientes, { ...ingredienteVacio }]);
  }

  function quitarIngrediente(index) {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResultado(null);
    setLoading(true);

    try {
      const payload = {
        ingredientes: ingredientes.map((ing) => ({
          nombre: ing.nombre,
          cantidad: parseFloat(ing.cantidad),
          costoUnitario: parseFloat(ing.costoUnitario),
        })),
        porciones: parseFloat(porciones),
        precioVenta: precioVenta ? parseFloat(precioVenta) : undefined,
      };

      const data = await calcularCosto(payload);
      setResultado(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="calculadora">
      <h2>Calculadora de costos de receta</h2>
      <p className="subtitle">
        Consume ecoshelf-costos-api (sin base de datos)
      </p>

      <form onSubmit={handleSubmit}>
        {ingredientes.map((ing, i) => (
          <div key={i} className="ingrediente-row">
            <input
              placeholder="Nombre"
              value={ing.nombre}
              onChange={(e) => actualizarIngrediente(i, "nombre", e.target.value)}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Cantidad"
              value={ing.cantidad}
              onChange={(e) => actualizarIngrediente(i, "cantidad", e.target.value)}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Costo unitario"
              value={ing.costoUnitario}
              onChange={(e) => actualizarIngrediente(i, "costoUnitario", e.target.value)}
              required
            />
            {ingredientes.length > 1 && (
              <button type="button" onClick={() => quitarIngrediente(i)}>
                Quitar
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={agregarIngrediente}>
          + Agregar ingrediente
        </button>

        <input
          type="number"
          step="1"
          placeholder="Porciones"
          value={porciones}
          onChange={(e) => setPorciones(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          placeholder="Precio de venta (opcional)"
          value={precioVenta}
          onChange={(e) => setPrecioVenta(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Calculando..." : "Calcular"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {resultado && (
        <div className="resultado-card">
          <p><strong>Costo total:</strong> ${resultado.costoTotal}</p>
          <p><strong>Costo por porción:</strong> ${resultado.costoPorPorcion}</p>
          {resultado.precioVenta !== null && (
            <>
              <p><strong>Ganancia por porción:</strong> ${resultado.gananciaPorPorcion}</p>
              <p><strong>Margen:</strong> {resultado.margenPorcentaje}%</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}