import { useState, useEffect } from "react";

const emptyForm = { nombre: "", unidad: "", costo: "", stock: "", stock_semana: "" };

export default function InsumoForm({ selected, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selected) {
      setForm({
        nombre: selected.nombre,
        unidad: selected.unidad,
        costo: selected.costo,
        stock: selected.stock,
        stock_semana: selected.stock_semana,
      });
    } else {
      setForm(emptyForm);
    }
  }, [selected]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      costo: parseFloat(form.costo),
      stock: parseFloat(form.stock),
      stock_semana: parseFloat(form.stock_semana || form.stock),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selected ? "Editar insumo" : "Nuevo insumo"}</h3>

      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="unidad"
        placeholder="Unidad (kg, lt, unidad...)"
        value={form.unidad}
        onChange={handleChange}
        required
      />
      <input
        name="costo"
        type="number"
        step="0.01"
        placeholder="Costo"
        value={form.costo}
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        type="number"
        step="0.01"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
      />
      <input
        name="stock_semana"
        type="number"
        step="0.01"
        placeholder="Stock semanal (opcional)"
        value={form.stock_semana}
        onChange={handleChange}
      />

      <button type="submit">{selected ? "Guardar cambios" : "Crear"}</button>
      {selected && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}