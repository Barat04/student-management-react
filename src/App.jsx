import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./App.css";

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Simulated loading
  useEffect(() => {
    setTimeout(() => {
      const saved = localStorage.getItem("students");
      if (saved) setStudents(JSON.parse(saved));
      setLoading(false);
    }, 1000);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  function addStudent(student) {
    setStudents([...students, student]);
  }

  function updateStudent(updatedStudent) {
    const updated = students.map((s) =>
      s.id === updatedStudent.id ? updatedStudent : s
    );
    setStudents(updated);
    setEditingStudent(null);
  }

  function deleteStudent(id) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  }

  function editStudent(student) {
    setEditingStudent(student);
  }

  // Filter
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Excel download
  function exportExcel(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "students.xlsx");
  }

  if (loading) return <h2>Loading Students...</h2>;

  return (
    <div className="container">
      <h1>Student Management</h1>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editingStudent={editingStudent}
      />

      <br />

      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <button
        className="download-btn"
        disabled={students.length === 0}
        onClick={() => exportExcel(students)}
      >
        Download All
      </button>

      <button
        className="download-btn"
        disabled={!search.trim() || filteredStudents.length === 0}
        onClick={() => exportExcel(filteredStudents)}
      >
        Download Filtered
      </button>

      <br />
      <br />

      <StudentTable
        students={filteredStudents}
        deleteStudent={deleteStudent}
        editStudent={editStudent}
      />
    </div>
  );
}

export default App;
