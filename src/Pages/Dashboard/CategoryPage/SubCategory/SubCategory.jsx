import { useEffect, useState } from "react";

const SubCategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", categoryName: "", status: "Active" });
  const [editId, setEditId] = useState(null);

  // Fetch all subcategories
  const fetchSubcategories = () => {
    fetch("http://localhost:5000/api/subcategories")
      .then((res) => res.json())
      .then((data) => setSubcategories(data));
  };

  // Fetch categories for dropdown
  const fetchCategories = () => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  // Handle Add/Update
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/subcategories/${editId}`
      : "http://localhost:5000/api/subcategories";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      fetchSubcategories();
      setForm({ name: "", categoryName: "", status: "Active" });
      setEditId(null);
    });
  };

  // Handle Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/subcategories/${id}`, { method: "DELETE" }).then(() =>
      fetchSubcategories()
    );
  };

  // Handle Edit
  const handleEdit = (sub) => {
    setForm({
      name: sub.name,
      categoryName: sub.categoryName,
      status: sub.status,
    });
    setEditId(sub._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Subcategory Information</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Subcategory Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <select
          value={form.categoryName}
          onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
          className="border p-2 rounded bg-gray-800 text-white"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Subcategory Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Sl</th>
            <th className="p-2 border">Category Name</th>
            <th className="p-2 border">Subcategory Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((sub, index) => (
            <tr key={sub._id} className="border-b">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{sub.categoryName}</td>
              <td className="p-2 border">{sub.name}</td>
              <td className="p-2 border">{sub.status}</td>
              <td className="p-2 border flex gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(sub)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(sub._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {subcategories.length === 0 && (
            <tr>
              <td className="p-2 text-center" colSpan={5}>
                No subcategories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategory;
