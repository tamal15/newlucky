import { useEffect, useState } from "react";

const ChildCategory = () => {
  const [childCategories, setChildCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    categoryName: "",
    subcategoryName: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  // Fetch data
  const fetchChildCategories = () => {
    fetch("http://localhost:5000/api/childcategories")
      .then((res) => res.json())
      .then((data) => setChildCategories(data));
  };

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  const fetchSubcategories = () => {
    fetch("http://localhost:5000/api/subcategories")
      .then((res) => res.json())
      .then((data) => setSubcategories(data));
  };

  useEffect(() => {
    fetchChildCategories();
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Filter subcategories by selected category
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoryName === form.categoryName
  );

  // Handle Add/Edit
  const handleSubmit = (e) => {
  e.preventDefault();
  const method = editId ? "PUT" : "POST";
  const url = editId
    ? `http://localhost:5000/api/childcategories/${editId}`
    : "http://localhost:5000/api/childcategories";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((data) => {
      if (editId) {
        // Update the edited item in the state
        setChildCategories((prev) =>
          prev.map((item) => (item._id === data._id ? data : item))
        );
      } else {
        // Add new item to the state
        setChildCategories((prev) => [...prev, data]);
      }
      // Reset form
      setForm({ name: "", categoryName: "", subcategoryName: "", status: "Active" });
      setEditId(null);
    });
};


  // Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/childcategories/${id}`, { method: "DELETE" }).then(() =>
      fetchChildCategories()
    );
  };

  // Edit
  const handleEdit = (child) => {
    setForm({
      name: child.name,
      categoryName: child.categoryName,
      subcategoryName: child.subcategoryName,
      status: child.status,
    });
    setEditId(child._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Child Categories</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Child Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <select
          value={form.categoryName}
          onChange={(e) => setForm({ ...form, categoryName: e.target.value, subcategoryName: "" })}
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
          value={form.subcategoryName}
          onChange={(e) => setForm({ ...form, subcategoryName: e.target.value })}
          className="border p-2 rounded bg-gray-800 text-white"
          required
        >
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map((sub) => (
            <option key={sub._id} value={sub.name}>
              {sub.name}
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

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Sl</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Subcategory</th>
            <th className="p-2 border">Child Category</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {childCategories.map((child, index) => (
            <tr key={child._id} className="border-b">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{child.categoryName}</td>
              <td className="p-2 border">{child.subcategoryName}</td>
              <td className="p-2 border">{child.name}</td>
              <td className="p-2 border">{child.status}</td>
              <td className="p-2 border flex gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(child)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1  rounded"
                  onClick={() => handleDelete(child._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {childCategories.length === 0 && (
            <tr>
              <td className="p-2 text-center" colSpan={6}>
                No child categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChildCategory;
