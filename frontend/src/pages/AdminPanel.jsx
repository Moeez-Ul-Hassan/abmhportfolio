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
    form.append("file", file);
    const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("File upload failed");
    const { url } = await res.json();
    return url;
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
    setExpenseModal({ open: true, id, data: ex });
    setBillPreview(ex.bill || null);
  };
  const openExpenseAdd = () => {
    setExpenseModal({ open: true, id: null, data: { title: "", description: "", amount: "", quantity: 1, bill: null } });
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
      const projectId = selectedProjectId;
      if (expenseModal.id) {
        await updateDoc(doc(db, `projects/${projectId}/expenses`, expenseModal.id), data);
      } else {
        await addDoc(collection(db, `projects/${projectId}/expenses`), data);
      }
      setExpenseModal({ open: false, id: null, data: { title: "", description: "", amount: "", quantity: 1, bill: null } });
      setBillPreview(null);
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
              {project.description && <div className="admin-project-desc">{project.description}</div>}
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
                  {project.expenses.length} expense(s) | <span className="font-semibold">Total: ${totalExpense.toLocaleString()}</span>
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
                  <div className="admin-expense-title">{ex.title} <span className="text-xs text-gray-500">${ex.amount} x {ex.quantity || 1} = {(Number(ex.amount) * (Number(ex.quantity) || 1)).toLocaleString()}</span></div>
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
                  <input
                    type="number"
                    placeholder="Amount"
                    value={expenseModal.data.amount}
                    onChange={e => setExpenseModal(modal => ({ ...modal, data: { ...modal.data, amount: e.target.value } }))}
                    className="admin-modal-input"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
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
                    disabled={!expenseModal.data.title || !expenseModal.data.amount}
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
  return <div>Inventory management coming soon.</div>;
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

