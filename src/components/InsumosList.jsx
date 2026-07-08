export default function InsumosList({ insumos, onSelect, onDelete, onViewDetail }) {
  if (insumos.length === 0) {
    return <p>No hay insumos registrados.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Unidad</th>
          <th>Costo</th>
          <th>Stock</th>
          <th>Stock/semana</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {insumos.map((insumo) => (
          <tr key={insumo.id}>
            <td>{insumo.nombre}</td>
            <td>{insumo.unidad}</td>
            <td>{parseFloat(insumo.costo).toFixed(2)}</td>
            <td>{parseFloat(insumo.stock).toFixed(2)}</td>
            <td>{parseFloat(insumo.stock_semana).toFixed(2)}</td>
            <td>
              <button onClick={() => onViewDetail(insumo.id)}>Ver detalle</button>
              <button onClick={() => onSelect(insumo)}>Editar</button>
              <button onClick={() => onDelete(insumo.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}