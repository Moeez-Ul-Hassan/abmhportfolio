import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";

const tabList = [
  { key: "projects", label: "Projects" },
  { key: "inventory", label: "Inventory" },
  { key: "notifications", label: "Notifications" },
];

function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [newProject, setNewProject] = useState({ title: "", description: "", images: [], workOrder: null });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [workOrderPreview, setWorkOrderPreview] = useState(null);
  const [showExpensesModal, setShowExpensesModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expenseModal, setExpenseModal] = useState({ open: false, id: null, data: { title: "", description: "", amount: "", quantity: 1, bill: null } });
  const [billPreview, setBillPreview] = useState(null);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [expenseError, setExpenseError] = useState("");
  const [expensesUnsub, setExpensesUnsub] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [expenseType, setExpenseType] = useState('item');

  // --- Firestore listeners ---
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, async (snapshot) => {
      const projs = await Promise.all(snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        // Fetch expenses subcollection
        const expensesSnap = await getDocs(collection(db, `projects/${docSnap.id}/expenses`));
        const expensesArr = expensesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        return { id: docSnap.id, ...data, expenses: expensesArr };
      }));
      setProjects(projs);
      setLoading(false);
    }, (e) => {
      setError(e.message);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // --- Project Add/Edit ---
  const openAddModal = () => {
    setEditProjectId(null);
    setNewProject({ title: "", description: "", images: [], workOrder: null });
    setImagePreviews([]);
    setWorkOrderPreview(null);
    setShowModal(true);
  };
  const openEditModal = (id) => {
    setEditProjectId(id);
    const p = projects.find(p => p.id === id);
    setNewProject({
      title: p.title,
      description: p.description || "",
      images: p.images || [],
      workOrder: null,
    });
    setImagePreviews((p.images || []).map(img => typeof img === 'string' ? img : URL.createObjectURL(img)));
    setWorkOrderPreview(p.workOrder || null);
    setShowModal(true);
  };
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    // Append new files to existing ones
    const newFiles = [...(newProject.images || []), ...files];
    setNewProject({ ...newProject, images: newFiles });
    setImagePreviews(newFiles.map(file => typeof file === 'string' ? file : URL.createObjectURL(file)));
  };
  const handleRemoveImage = (idx) => {
    const updatedImages = [...newProject.images];
    updatedImages.splice(idx, 1);
    setNewProject({ ...newProject, images: updatedImages });
    setImagePreviews(updatedImages.map(file => typeof file === 'string' ? file : URL.createObjectURL(file)));
  };
  const handleWorkOrderChange = (e) => {
    const file = e.target.files[0];
    setNewProject({ ...newProject, workOrder: file });
    setWorkOrderPreview(file ? URL.createObjectURL(file) : null);
  };
  async function uploadFiles(files) {
    // POST to backend /upload, return array of URLs
    const form = new FormData();
    for (const file of files) {
      form.append('files', file);
    }
    const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("File upload failed");
    const { urls } = await res.json();
    return urls;
  }
  async function uploadSingleFile(file) {
    if (!file) return null;
    const form = new FormData();
    form.append('files', file);
    const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("File upload failed");
    const { urls } = await res.json();
    return urls[0];
  }
  const handleAddOrEditProject = async () => {
    setLoading(true);
    setError("");
    try {
      // Separate files and URLs
      const filesToUpload = (newProject.images || []).filter(img => img instanceof File);
      const existingUrls = (newProject.images || []).filter(img => typeof img === 'string');
      let images = existingUrls;
      if (filesToUpload.length > 0) {
        const uploadedUrls = await uploadFiles(filesToUpload);
        images = [...existingUrls, ...uploadedUrls];
      }
      let workOrder = workOrderPreview;
      if (newProject.workOrder) {
        workOrder = await uploadSingleFile(newProject.workOrder);
      }
      const data = {
        title: newProject.title,
        description: newProject.description,
        images,
        workOrder,
        createdAt: serverTimestamp(),
      };
      if (editProjectId) {
        await updateDoc(doc(db, "projects", editProjectId), data);
      } else {
        await addDoc(collection(db, "projects"), data);
      }
      setNewProject({ title: "", description: "", images: [], workOrder: null });
      setImagePreviews([]);
      setWorkOrderPreview(null);
      setEditProjectId(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  // --- Expenses ---
  const openExpensesModal = (id) => {
    setSelectedProjectId(id);
    setShowExpensesModal(true);
    // Set up real-time listener for expenses
    const unsub = onSnapshot(
      collection(db, `projects/${id}/expenses`),
      (snapshot) => {
        setExpenses(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    );
    setExpensesUnsub(() => unsub);
  };
  const closeExpensesModal = () => {
    setShowExpensesModal(false);
    setSelectedProjectId(null);
    setExpenses([]);
    if (expensesUnsub) {
      expensesUnsub();
      setExpensesUnsub(null);
    }
  };
  const openExpenseEdit = (id) => {
    const ex = expenses.find(e => e.id === id);
    setExpenseType(ex && ex.currentLocation ? 'item' : 'simple');
    setExpenseModal({ open: true, id, data: ex });
    setBillPreview(ex.bill || null);
  };
  const openExpenseAdd = () => {
    setExpenseType('item');
    setExpenseModal({ open: true, id: null, data: { title: '', description: '', amount: '', quantity: 1, bill: null, currentLocation: '' } });
    setBillPreview(null);
  };
  const handleBillChange = (e) => {
    const file = e.target.files[0];
    setExpenseModal(modal => ({ ...modal, data: { ...modal.data, bill: file } }));
    setBillPreview(file ? URL.createObjectURL(file) : null);
  };
  const handleExpenseSave = async () => {
    setExpenseLoading(true);
    setExpenseError("");
    setExpenseModal({ open: false, id: null, data: { title: '', description: '', amount: '', quantity: 1, bill: null, currentLocation: '' } });
    setBillPreview(null);
    try {
      let bill = billPreview;
      if (expenseModal.data.bill && expenseModal.data.bill instanceof File) {
        bill = await uploadSingleFile(expenseModal.data.bill);
      }
      const data = {
        title: expenseModal.data.title,
        description: expenseModal.data.description,
        amount: expenseModal.data.amount,
        quantity: expenseModal.data.quantity,
        bill,
        createdAt: serverTimestamp(),
      };
      if (expenseType === 'item') {
        data.currentLocation = expenseModal.data.currentLocation;
      }
      const projectId = selectedProjectId;
      if (expenseModal.id) {
        await updateDoc(doc(db, `projects/${projectId}/expenses`, expenseModal.id), data);
      } else {
        await addDoc(collection(db, `projects/${projectId}/expenses`), data);
      }
      if (expenseType === 'item') {
        await addDoc(collection(db, 'inventory'), {
          title: expenseModal.data.title,
          description: expenseModal.data.description,
          amount: expenseModal.data.amount,
          quantity: expenseModal.data.quantity,
          bill,
          currentLocation: expenseModal.data.currentLocation,
          createdAt: serverTimestamp(),
          projectId,
        });
      }
    } catch (e) {
      setExpenseError(e.message);
    } finally {
      setExpenseLoading(false);
    }
  };
  const handleExpenseDelete = async (id) => {
    setExpenseLoading(true);
    setExpenseError("");
    try {
      const projectId = selectedProjectId;
      const expense = expenses.find(e => e.id === id);
      
      // If this expense has a currentLocation, it was added to inventory, so delete it from inventory too
      if (expense && expense.currentLocation) {
        // Find the inventory item with matching details
        const inventoryQuery = query(
          collection(db, "inventory"),
          where("title", "==", expense.title),
          where("projectId", "==", projectId)
        );
        const inventorySnapshot = await getDocs(inventoryQuery);
        inventorySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
      }
      
      await deleteDoc(doc(db, `projects/${projectId}/expenses`, id));
    } catch (e) {
      setExpenseError(e.message);
    } finally {
      setExpenseLoading(false);
    }
  };
  const handleExpensesModalClose = () => {
    closeExpensesModal();
  };
  // ---
  if (loading) return <div>Loading projects...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  return (
    <div>
      <div className="admin-projects-header">
        <h3 className="admin-project-title">Projects</h3>
        <button className="admin-btn" onClick={openAddModal}>
          + Add Project
        </button>
      </div>
      <div className="admin-projects-list">
        {projects.map((project) => {
          const totalExpense = (project.expenses || []).reduce((sum, ex) => sum + (Number(ex.amount) * (Number(ex.quantity) || 1)), 0);
          return (
            <div key={project.id} className="admin-project-card">
              <div className="admin-project-title">{project.title}</div>
              {project.description && (
                <div className="admin-project-desc">
                  {project.description.length > 120 && expandedProjectId !== project.id
                    ? `${project.description.slice(0, 120)}...`
                    : project.description}
                  {project.description.length > 120 && (
                    <span
                      style={{ marginLeft: 8, color: '#2563eb', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.97em', background: 'none', border: 'none', padding: 0 }}
                      onClick={() => setExpandedProjectId(expandedProjectId === project.id ? null : project.id)}
                    >
                      {expandedProjectId === project.id ? 'Show less' : 'Read more'}
                    </span>
                  )}
                </div>
              )}
              {project.images && project.images.length > 0 && (
                <div className="admin-project-images">
                  {project.images.map((img, i) => (
                    <img key={i} src={img} alt="Project" className="admin-project-image" />
                  ))}
                </div>
              )}
              {project.workOrder && (
                <div>
                  <a href={project.workOrder} target="_blank" rel="noopener noreferrer" className="admin-workorder-link">
                    View Work Order
                  </a>
                </div>
              )}
              <div className="admin-project-actions">
                <button className="admin-btn warning" onClick={() => openEditModal(project.id)}>
                  Edit
                </button>
                <button className="admin-btn danger" onClick={() => handleDelete(project.id)}>
                  Delete
                </button>
                <button className="admin-btn info" onClick={() => openExpensesModal(project.id)}>
                  Manage Expenses
                </button>
              </div>
              {project.expenses && project.expenses.length > 0 && (
                <div className="admin-project-expenses">
                  {project.expenses.length} expense(s) | <span className="font-semibold">Total: Rs {totalExpense.toLocaleString()}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Add/Edit Project Modal */}
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <button className="admin-modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h4 className="admin-modal-title">{editProjectId ? "Edit Project" : "Add Project"}</h4>
            <input
              type="text"
              placeholder="Title"
              value={newProject.title}
              onChange={e => setNewProject({ ...newProject, title: e.target.value })}
              className="admin-modal-input"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={newProject.description}
              onChange={e => setNewProject({ ...newProject, description: e.target.value })}
              className="admin-modal-textarea"
              rows={3}
            />
            <label className="admin-modal-label">Project Images (optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="mb-2"
            />
            {imagePreviews.length > 0 && (
              <div className="admin-project-images">
                {imagePreviews.map((img, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'inline-block', marginRight: 8 }}>
                    <img src={img} alt="Preview" className="admin-modal-img-preview" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="admin-modal-label">Work Order (PDF or Image, optional)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleWorkOrderChange}
              className="mb-2"
            />
            {workOrderPreview && (
              <div className="mb-2">
                {newProject.workOrder && newProject.workOrder.type === "application/pdf" ? (
                  <span className="text-xs text-gray-600">PDF selected</span>
                ) : (
                  <img src={workOrderPreview} alt="Work Order Preview" className="admin-modal-img-preview" />
                )}
              </div>
            )}
            <button
              className="admin-btn"
              onClick={handleAddOrEditProject}
              disabled={!newProject.title}
              style={{ width: "100%" }}
            >
              {editProjectId ? "Save Changes" : "Add"}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </div>
        </div>
      )}
      {/* Expenses Modal */}
      {showExpensesModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal" style={{ maxWidth: 500 }}>
            <button className="admin-modal-close" onClick={handleExpensesModalClose}>
              ×
            </button>
            <h4 className="admin-modal-title">Manage Expenses</h4>
            <div className="mb-2">
              <button className="admin-btn" onClick={openExpenseAdd}>
                + Add Expense
              </button>
            </div>
            <div className="admin-expenses-list">
              {expenseLoading && <div>Loading...</div>}
              {expenseError && <div style={{ color: 'red' }}>{expenseError}</div>}
              {expenses.length === 0 && !expenseLoading && <div className="text-gray-500 text-sm">No expenses yet.</div>}
              {expenses.map((ex) => (
                <div key={ex.id} className="admin-expense-card">
                  <div className="admin-expense-title">{ex.title} <span className="text-xs text-gray-500">Rs {ex.amount} x {ex.quantity || 1} = Rs {(Number(ex.amount) * (Number(ex.quantity) || 1)).toLocaleString()}</span></div>
                  {ex.description && <div className="text-xs text-gray-600">{ex.description}</div>}
                  {ex.bill && (
                    <div className="mt-1">
                      {typeof ex.bill === "string" && ex.bill.endsWith(".pdf") ? (
                        <a href={ex.bill} target="_blank" rel="noopener noreferrer" className="admin-expense-bill-link">View PDF Bill</a>
                      ) : (
                        <a href={ex.bill} target="_blank" rel="noopener noreferrer"><img src={ex.bill} alt="Bill" className="admin-modal-bill-preview" /></a>
                      )}
                    </div>
                  )}
                  <div className="admin-expense-actions">
                    <button className="admin-btn warning" onClick={() => openExpenseEdit(ex.id)}>
                      Edit
                    </button>
                    <button className="admin-btn danger" onClick={() => handleExpenseDelete(ex.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Add/Edit Expense Modal */}
            {expenseModal.open && (
              <div className="admin-modal-backdrop">
                <div className="admin-modal">
                  <button className="admin-modal-close" onClick={() => setExpenseModal({ open: false, id: null, data: { title: "", description: "", amount: "", quantity: 1, bill: null } })}>
                    ×
                  </button>
                  <h4 className="admin-modal-title">{expenseModal.id ? "Edit Expense" : "Add Expense"}</h4>
                  <div
                    className={`expense-type-switch${expenseType === 'item' ? ' active' : ''}`}
                    onClick={() => setExpenseType(expenseType === 'item' ? 'simple' : 'item')}
                  >
                    <div className="expense-type-knob">
                      {expenseType === 'item' ? 'Item' : 'Simple'}
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={expenseModal.data.title}
                    onChange={e => setExpenseModal(modal => ({ ...modal, data: { ...modal.data, title: e.target.value } }))}
                    className="admin-modal-input"
                    required
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={expenseModal.data.description}
                    onChange={e => setExpenseModal(modal => ({ ...modal, data: { ...modal.data, description: e.target.value } }))}
                    className="admin-modal-textarea"
                    rows={2}
                  />
                  {expenseType === 'item' && (
                    <input
                      type="text"
                      placeholder="Current Location"
                      value={expenseModal.data.currentLocation || ''}
                      onChange={e => setExpenseModal(modal => ({ ...modal, data: { ...modal.data, currentLocation: e.target.value } }))}
                      className="admin-modal-input"
                      required
                    />
                  )}
                  <input
                    type="number"
                    placeholder="Item Price"
                    value={expenseModal.data.amount}
                    onChange={e => setExpenseModal(modal => ({ ...modal, data: { ...modal.data, amount: e.target.value } }))}
                    className="admin-modal-input"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Item Quantity"
                    min="1"
                    value={expenseModal.data.quantity}
                    onChange={e => {
                      const val = e.target.value;
                      setExpenseModal(modal => ({ ...modal, data: { ...modal.data, quantity: val.replace(/^0+/, "") } }));
                    }}
                    className="admin-modal-input"
                    required
                  />
                  <label className="admin-modal-label">Bill (Image or PDF, optional)</label>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleBillChange}
                    className="mb-2"
                  />
                  {billPreview && (
                    <div className="mb-2">
                      {expenseModal.data.bill && expenseModal.data.bill.type === "application/pdf" ? (
                        <span className="text-xs text-gray-600">PDF selected</span>
                      ) : (
                        <img src={billPreview} alt="Bill Preview" className="admin-modal-bill-preview" />
                      )}
                    </div>
                  )}
                  <button
                    className="admin-btn"
                    onClick={handleExpenseSave}
                    disabled={!expenseModal.data.title || !expenseModal.data.amount || expenseLoading}
                    style={{ width: "100%" }}
                  >
                    {expenseModal.id ? "Save Changes" : "Add"}
                  </button>
                  {expenseError && <div style={{ color: 'red', marginTop: 8 }}>{expenseError}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryTab() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [itemModal, setItemModal] = useState({ title: "", description: "", amount: "", quantity: 1, bill: null, currentLocation: "" });
  const [billPreview, setBillPreview] = useState(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "inventory"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setInventory(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (e) => {
      setError(e.message);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = inventory.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(search.toLowerCase())) ||
    (item.currentLocation && item.currentLocation.toLowerCase().includes(search.toLowerCase()))
  );

  const openEditModal = (id) => {
    setEditItemId(id);
    const item = inventory.find(i => i.id === id);
    setItemModal({
      title: item.title,
      description: item.description || "",
      amount: item.amount,
      quantity: item.quantity,
      bill: item.bill || null,
      currentLocation: item.currentLocation || ""
    });
    setBillPreview(item.bill || null);
    setShowModal(true);
  };
  const openAddModal = () => {
    setEditItemId(null);
    setItemModal({ title: "", description: "", amount: "", quantity: 1, bill: null, currentLocation: "" });
    setBillPreview(null);
    setShowModal(true);
  };
  const handleBillChange = (e) => {
    const file = e.target.files[0];
    setItemModal(modal => ({ ...modal, bill: file }));
    setBillPreview(file ? URL.createObjectURL(file) : null);
  };
  const handleSave = async () => {
    setLoading(true);
    setShowModal(false);
    setItemModal({ title: "", description: "", amount: "", quantity: 1, bill: null, currentLocation: "" });
    setBillPreview(null);
    setEditItemId(null);
    try {
      let bill = billPreview;
      if (itemModal.bill && itemModal.bill instanceof File) {
        bill = await uploadSingleFile(itemModal.bill);
      }
      const data = {
        title: itemModal.title,
        description: itemModal.description,
        amount: itemModal.amount,
        quantity: itemModal.quantity,
        bill,
        currentLocation: itemModal.currentLocation,
        createdAt: serverTimestamp(),
      };
      if (editItemId) {
        await updateDoc(doc(db, "inventory", editItemId), data);
      } else {
        await addDoc(collection(db, "inventory"), data);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "inventory", id));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  return (
    <div>
      <div className="admin-projects-header">
        <h3 className="admin-project-title">Inventory</h3>
        <button className="admin-btn" onClick={openAddModal}>+ Add Item</button>
      </div>
      <input
        type="text"
        placeholder="Search inventory..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="admin-modal-input inventory-search-bar"
      />
      <div className="admin-projects-list">
        {filtered.length === 0 && <div className="inventory-empty-state">No items found.</div>}
        {filtered.map(item => (
          <div key={item.id} className="admin-project-card">
            <div className="admin-project-title">{item.title}</div>
            {item.description && <div className="admin-project-desc">{item.description}</div>}
            <div className="inventory-card-details">
              <b>Price:</b> Rs {item.amount} <b>Qty:</b> {item.quantity}
            </div>
            {item.currentLocation && <div className="inventory-card-location"><b>Location:</b> {item.currentLocation}</div>}
            {item.bill && (
              <div className="inventory-bill-link">
                {typeof item.bill === 'string' && item.bill.endsWith('.pdf') ? (
                  <a href={item.bill} target="_blank" rel="noopener noreferrer" className="admin-expense-bill-link">View Bill (PDF)</a>
                ) : (
                  <a href={item.bill} target="_blank" rel="noopener noreferrer"><img src={item.bill} alt="Bill" className="admin-modal-bill-preview" /></a>
                )}
              </div>
            )}
            <div className="admin-project-actions">
              <button className="admin-btn warning" onClick={() => openEditModal(item.id)}>Edit</button>
              <button className="admin-btn danger" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
            <h4 className="admin-modal-title">{editItemId ? "Edit Item" : "Add Item"}</h4>
            <input
              type="text"
              placeholder="Title"
              value={itemModal.title}
              onChange={e => setItemModal(modal => ({ ...modal, title: e.target.value }))}
              className="admin-modal-input"
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={itemModal.description}
              onChange={e => setItemModal(modal => ({ ...modal, description: e.target.value }))}
              className="admin-modal-textarea"
              rows={2}
            />
            <input
              type="number"
              placeholder="Item Price"
              value={itemModal.amount}
              onChange={e => setItemModal(modal => ({ ...modal, amount: e.target.value }))}
              className="admin-modal-input"
              required
            />
            <input
              type="number"
              placeholder="Item Quantity"
              min="1"
              value={itemModal.quantity}
              onChange={e => {
                const val = e.target.value;
                setItemModal(modal => ({ ...modal, quantity: val.replace(/^0+/, "") }));
              }}
              className="admin-modal-input"
              required
            />
            <input
              type="text"
              placeholder="Current Location"
              value={itemModal.currentLocation || ''}
              onChange={e => setItemModal(modal => ({ ...modal, currentLocation: e.target.value }))}
              className="admin-modal-input"
              required
            />
            <label className="admin-modal-label">Bill (Image or PDF, optional)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleBillChange}
              className="mb-2"
            />
            {billPreview && (
              <div className="mb-2">
                {itemModal.bill && itemModal.bill.type === "application/pdf" ? (
                  <span className="text-xs text-gray-600">PDF selected</span>
                ) : (
                  <img src={billPreview} alt="Bill Preview" className="admin-modal-bill-preview" />
                )}
              </div>
            )}
            <button
              className="admin-btn"
              onClick={handleSave}
              disabled={!itemModal.title || !itemModal.amount || loading}
              style={{ width: "100%" }}
            >
              {editItemId ? "Save Changes" : "Add"}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationsTab() {
  return <div />;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  let TabContent;
  if (activeTab === "projects") TabContent = <ProjectsTab />;
  else if (activeTab === "inventory") TabContent = <InventoryTab />;
  else TabContent = <NotificationsTab />;

  return (
    <div className="admin-panel-root">
      {/* Logout button */}
      <button className="admin-logout-btn" onClick={handleLogout}>
        Logout
      </button>
      {/* Responsive top nav bar */}
      <nav className="admin-navbar">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            className={"admin-navbar-btn" + (activeTab === tab.key ? " active" : "")}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {/* Tab content */}
      <div className="admin-content">{TabContent}</div>
    </div>
  );
}

