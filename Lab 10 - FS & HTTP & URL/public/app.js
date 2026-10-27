const form = document.getElementById('studentForm');
const studentIdField = document.getElementById('studentId');
const nameField = document.getElementById('name');
const ageField = document.getElementById('age');
const deptField = document.getElementById('department');
const yearField = document.getElementById('year');
const emailField = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const formMessage = document.getElementById('formMessage');
const formTitle = document.getElementById('formTitle');

const studentsBody = document.getElementById('studentsBody');
const emptyMessage = document.getElementById('emptyMessage');
const searchBox = document.getElementById('searchBox');
const deptFilter = document.getElementById('deptFilter');
const yearFilter = document.getElementById('yearFilter');
const refreshBtn = document.getElementById('refreshBtn');
const totalCount = document.getElementById('totalCount');

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = 'message ' + (type || '');
  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.className = 'message';
  }, 3000);
}

function buildQuery() {
  const params = new URLSearchParams();
  if (searchBox.value.trim()) params.set('search', searchBox.value.trim());
  if (deptFilter.value.trim()) params.set('department', deptFilter.value.trim());
  if (yearFilter.value.trim()) params.set('year', yearFilter.value.trim());
  const qs = params.toString();
  return qs ? '/api/students?' + qs : '/api/students';
}

async function loadStudents() {
  try {
    const res = await fetch(buildQuery());
    const students = await res.json();
    renderStudents(students);
  } catch (err) {
    console.error(err);
    showMessage('Failed to load students', 'error');
  }
}

function renderStudents(students) {
  studentsBody.innerHTML = '';
  totalCount.textContent = students ? students.length : 0;

  if (!students || students.length === 0) {
    emptyMessage.classList.remove('hidden');
    return;
  }
  emptyMessage.classList.add('hidden');

  students.forEach((s) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${escapeHtml(s.name)}</td>
      <td>${s.age}</td>
      <td>${escapeHtml(s.department)}</td>
      <td>${s.year}</td>
      <td>${escapeHtml(s.email)}</td>
      <td class="col-actions">
        <button class="btn-edit-text" data-id="${s.id}">Edit</button>
        <button class="btn-danger-text" data-id="${s.id}">Delete</button>
      </td>
    `;
    const [editBtn, deleteBtn] = tr.querySelectorAll('button');
    editBtn.addEventListener('click', () => startEdit(s));
    deleteBtn.addEventListener('click', () => deleteStudent(s.id));
    studentsBody.appendChild(tr);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function startEdit(student) {
  studentIdField.value = student.id;
  nameField.value = student.name;
  ageField.value = student.age;
  deptField.value = student.department;
  yearField.value = student.year;
  emailField.value = student.email;
  formTitle.textContent = 'Edit record';
  submitBtn.textContent = 'Update record';
  cancelEditBtn.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  nameField.focus();
}

function resetForm() {
  form.reset();
  studentIdField.value = '';
  formTitle.textContent = 'New record';
  submitBtn.textContent = 'Save record';
  cancelEditBtn.classList.add('hidden');
}

cancelEditBtn.addEventListener('click', resetForm);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    name: nameField.value.trim(),
    age: Number(ageField.value),
    department: deptField.value.trim(),
    year: Number(yearField.value),
    email: emailField.value.trim(),
  };

  const id = studentIdField.value;
  const isEdit = Boolean(id);
  const endpoint = isEdit ? `/api/students/${id}` : '/api/students';
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      showMessage(data.error || 'Something went wrong', 'error');
      return;
    }

    showMessage(isEdit ? 'Record updated.' : 'Record added.', 'success');
    resetForm();
    loadStudents();
  } catch (err) {
    console.error(err);
    showMessage('Request failed', 'error');
  }
});

async function deleteStudent(id) {
  if (!confirm('Delete this student record?')) return;
  try {
    const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) {
      showMessage(data.error || 'Failed to delete', 'error');
      return;
    }
    showMessage('Record deleted.', 'success');
    loadStudents();
  } catch (err) {
    console.error(err);
    showMessage('Delete failed', 'error');
  }
}

refreshBtn.addEventListener('click', loadStudents);
searchBox.addEventListener('input', debounce(loadStudents, 300));
deptFilter.addEventListener('input', debounce(loadStudents, 300));
yearFilter.addEventListener('input', debounce(loadStudents, 300));

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Initial load
loadStudents();
