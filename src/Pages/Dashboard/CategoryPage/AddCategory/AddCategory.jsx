
import { useEffect, useState } from "react";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [editId, setEditId] = useState(null);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Add or Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = { categoryName, status };

    if (editId) {
      // 🔄 Update API
      const res = await fetch(
        `http://localhost:5000/api/categories/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        }
      );
      const data = await res.json();
      setCategories(
        categories.map((cat) => (cat._id === data._id ? data : cat))
      );
      setEditId(null);
    } else {
      // ➕ Add API
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      const data = await res.json();
      setCategories([...categories, data]);
    }

    setCategoryName("");
    setStatus("Inactive");
  };

  // Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "DELETE",
    });
    setCategories(categories.filter((cat) => cat._id !== id));
  };

  // Edit Category (prefill form)
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setCategoryName(cat.categoryName);
    setStatus(cat.status);
    document.getElementById("addForm").classList.remove("hidden");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage category information</h2>
        {/* Add Button */}
        <button
          onClick={() =>
            document.getElementById("addForm").classList.toggle("hidden")
          }
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          + Add
        </button>
      </div>

      {/* Add/Edit Form */}
      <form
        id="addForm"
        onSubmit={handleSubmit}
        className="hidden mb-6 p-4 border rounded bg-gray-50"
      >
        <div className="mb-2">
          <label className="block mb-1">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Save"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Sl</th>
            <th className="p-2 border">Category Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-black">
          {categories.map((cat, i) => (
            <tr key={cat._id} className="border">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border ">{cat.categoryName}</td>
              <td className="p-2 border">{cat.status}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
