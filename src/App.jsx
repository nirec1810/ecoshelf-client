import { useState, useEffect } from "react";
import {
  getInsumos,
  createInsumo,
  updateInsumo,
  deleteInsumo,
} from "./api/insumos";
import InsumosList from "./components/InsumosList";
import InsumoForm from "./components/InsumoForm";
import InsumoDetail from "./components/InsumoDetail";
import "./App.css";
import CalculadoraCostos from "./components/CalculadoraCostos";

export default function App() {
  const [insumos, setInsumos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState("insumos"); 

  async function loadInsumos() {
    try {
      setLoading(true);
      const data = await getInsumos();
      setInsumos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInsumos();
  }, []);

  async function handleSubmit(data) {
    try {
      if (selected) {
        await updateInsumo(selected.id, data);
      } else {
        await createInsumo(data);
      }
      setSelected(null);
      await loadInsumos();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este insumo?")) return;
    try {
      await deleteInsumo(id);
      if (detailId === id) setDetailId(null);
      await loadInsumos();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1>EcoShelf — Cliente</h1>
      <p className="subtitle">
        Cliente React + Vite consumiendo los APIs de EcoShelf Analytics
      </p>

      <nav className="tabs">
        <button onClick={() => setVista("insumos")} disabled={vista === "insumos"}>
          Insumos
        </button>
        <button onClick={() => setVista("costos")} disabled={vista === "costos"}>
          Calculadora de costos
        </button>
      </nav>

      <hr />

      {vista === "insumos" ? (
        <>
          {error && <div className="error">{error}</div>}

          <InsumoForm
            selected={selected}
            onSubmit={handleSubmit}
            onCancel={() => setSelected(null)}
          />

          <hr />

          {loading ? (
            <p>Cargando...</p>
          ) : (
            <InsumosList
              insumos={insumos}
              onSelect={setSelected}
              onDelete={handleDelete}
              onViewDetail={setDetailId}
            />
          )}

          <InsumoDetail id={detailId} onClose={() => setDetailId(null)} />
        </>
      ) : (
        <CalculadoraCostos />
      )}
    </div>
  );
}