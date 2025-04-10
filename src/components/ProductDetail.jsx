import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = ({ products, onDelete, onEdit = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const productFromLocation = location.state?.product;
  const index = products.findIndex((p) => p.id === productFromLocation.id);
  const product = products[index];  
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editCategoryP, setEditCategoryP] = useState("");
  const [editUtility, setEditUtility] = useState(true);
  const [editAmount, setEditAmount] = useState(0);
  const [editEntryDate, setEditEntryDate] = useState("");

  const handleSave = (i) => {
    const today = new Date().toISOString().split("T")[0];
    if (editEntryDate > today) {
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }
    if (editValue.trim() && editCategory.trim() && editCategoryP.trim()) {
      onEdit(i, {
        name: editValue,
        category: editCategory,
        categoryP: editCategoryP,
        status: editStatus ? "Usado" : "Nuevo",
        utility: editUtility ? "Bueno" : "Averiado",
        amount: editAmount,
        entryDate: editEntryDate
      });
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
    setEditCategory("");
    setEditStatus(false);
    setEditCategoryP("");
    setEditUtility(false);
    setEditAmount(0);
    setEditEntryDate("");
  };

  const handleEdit = (i, product) => {
    setEditIndex(i);
    setEditValue(product.name);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado");
    setEditCategoryP(product.categoryP);
    setEditUtility(product.utility === "Bueno");
    setEditAmount(product.amount);
    setEditEntryDate(product.entryDate);
  };

  if (!product) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <div>
      <div className="product-content">
        <h2>Detalles del Producto</h2>
        {editIndex === index ? (
          <>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="">Seleccione la Sala</option>
              <optgroup label="Edificio Giordano">
                <option value="Sala 1E">Sala 1E</option>
                <option value="Lab. Software">Lab. Software</option>
              </optgroup>
              <optgroup label="Edificio Santo Domingo">
                <option value="Sala 1F">Sala 1F</option>
                <option value="Sala 2F">Sala 2F</option>
              </optgroup>
            </select>

            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={editStatus}
                onChange={() => setEditStatus(!editStatus)}
              />
              equipo: {editStatus ? "Usado" : "Nuevo"}
            </label>

            <select
              value={editCategoryP}
              onChange={(e) => setEditCategoryP(e.target.value)}
            >
              <option value="">Seleccione el tipo de equipo</option>
              <option value="Mouse">Mouse</option>
              <option value="Teclado">Teclado</option>
              <option value="Pantalla">Pantalla</option>
              <option value="Audifonos">Audifonos</option>
            </select>

            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={editUtility}
                onChange={() => setEditUtility(!editUtility)}
              />
              Condición: {editUtility ? "Bueno" : "Averiado"}
            </label>

            <div className="amount-container">
              <input
                type="number"
                value={editAmount === 0 ? "" : editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                placeholder="Cantidad de equipos"
              />
            </div>

            <label className="checkbox-container">
              <input
                type="date"
                value={editEntryDate}
                onChange={(e) => setEditEntryDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </label>
          </>
        ) : (
          <table className="detail-table">
            <tbody>
              <tr>
                <th>Marca del Equipo</th>
                <td>{product.name}</td>
              </tr>
              <tr>
                <th>Sala</th>
                <td>{product.category}</td>
              </tr>
              <tr>
                <th>Estado</th>
                <td>{product.status}</td>
              </tr>
              <tr>
                <th>Tipo de equipo</th>
                <td>{product.categoryP}</td>
              </tr>
              <tr>
                <th>Condicion del equipo</th>
                <td>{product.utility}</td>
              </tr>
              <tr>
                <th>Cantidad de equipos</th>
                <td>{product.amount}</td>
              </tr>
              <tr>
                <th>Fecha de Ingreso</th>
                <td>{product.entryDate}</td>
              </tr>
            </tbody>
          </table>
        )}
        <div>
          {editIndex === index ? (
            <>
              <button className="save-btn-detail" onClick={() => handleSave(index)}>Guardar</button>
              <button className="cancel-btn-detail" onClick={handleCancel}>Cancelar</button>
            </>
          ) : (
            <>
              <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
              <button className="back-button" onClick={() => handleEdit(index, product)}>Editar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
