import { useState, useEffect } from "react";
import { getInsumoById } from "../api/insumos";

export default function InsumoDetail({ id, onClose }) {
  const [insumo, setInsumo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;

    async function fetchDetalle() {
      try {
        setLoading(true);
        const data = await getInsumoById(id);
        if (activo) {
          setInsumo(data);
          setError(null);
        }
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setLoading(false);
      }
    }

    if (id) fetchDetalle();

    return () => {
      activo = false;
    };
  }, [id]);

  if (!id) return null;

  return (
    <div className="detail-panel">
      <button onClick={onClose}>Cerrar</button>

      {loading && <p>Cargando detalle...</p>}
      {error && <div className="error">{error}</div>}

      {insumo && (
        <div className="detail-card">
          <h3>{insumo.nombre}</h3>
          <p><strong>ID:</strong> {insumo.id}</p>
          <p><strong>Unidad:</strong> {insumo.unidad}</p>
          <p><strong>Costo:</strong> {parseFloat(insumo.costo).toFixed(2)}</p>
          <p><strong>Stock actual:</strong> {parseFloat(insumo.stock).toFixed(2)}</p>
          <p><strong>Stock semanal:</strong> {parseFloat(insumo.stock_semana).toFixed(2)}</p>
          <p><strong>Creado en:</strong> {new Date(insumo.creado_en).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}