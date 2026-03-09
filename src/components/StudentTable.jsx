export default function StudentTable({ students, deleteStudent, editStudent }) {
  if (students.length === 0) {
    return <p>No students found</p>;
  }

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>
              <button onClick={() => editStudent(student)}>Edit</button>

              <button onClick={() => deleteStudent(student.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
