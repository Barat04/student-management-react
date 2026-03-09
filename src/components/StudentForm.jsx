import { useState, useEffect } from "react";

export default function StudentForm({
  addStudent,
  updateStudent,
  editingStudent,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setAge(editingStudent.age);
    }
  }, [editingStudent]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !age) {
      setError("All fields are required");
      return;
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      setError("Enter valid name");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Enter valid email");
      return;
    }

    if (age <= 0 || age > 100) {
      setError("Enter Valid Age");
      return;
    }

    const student = {
      id: editingStudent ? editingStudent.id : Date.now(),
      name,
      email,
      age,
    };

    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setName("");
    setEmail("");
    setAge("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}
