let userName = "";
let activeCategory = "";
let allTasks = {
    Personal: [], Work: [], Education: [], Finance: [], Shopping: []
};

// Login
function handleLogin() {
    const input = document.getElementById('username');
    if (input.value.trim() !== "") {
        userName = input.value;
        document.getElementById('welcome-user').innerText = `Halo, ${userName}!`;
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');
        updateCounts();
    }
}

// Buka List Kategori
function openTasks(category) {
    activeCategory = category;
    document.getElementById('category-title').innerText = category;
    
    // Ganti warna header sesuai kategori
    const header = document.getElementById('dynamic-header');
    header.style.background = getCategoryColor(category);

    document.getElementById('dashboard-screen').classList.add('hidden');
    document.getElementById('list-screen').classList.remove('hidden');
    renderTasks();
}

function backToDashboard() {
    document.getElementById('list-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.remove('hidden');
    updateCounts();
}

// Tambah Tugas
function addTask() {
    const input = document.getElementById('new-task-input');
    if (input.value.trim() !== "") {
        allTasks[activeCategory].push({
            text: input.value,
            done: false
        });
        input.value = "";
        renderTasks();
    }
}

// Render List
function renderTasks() {
    const listContainer = document.getElementById('task-list');
    listContainer.innerHTML = "";

    allTasks[activeCategory].forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.done ? 'done' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${index})">
            <span style="margin-left: 10px">${task.text}</span>
            <i class="fas fa-trash-alt delete-btn" onclick="deleteTask(${index})"></i>
        `;
        listContainer.appendChild(li);
    });
}

function toggleTask(index) {
    allTasks[activeCategory][index].done = !allTasks[activeCategory][index].done;
    renderTasks();
}

function deleteTask(index) {
    allTasks[activeCategory].splice(index, 1);
    renderTasks();
}

function updateCounts() {
    let total = 0;
    for (let cat in allTasks) {
        document.getElementById(`count-${cat}`).innerText = `${allTasks[cat].length} Tugas`;
        total += allTasks[cat].length;
    }
    document.getElementById('overall-status').innerText = `Kamu punya ${total} tugas hari ini`;
}

function getCategoryColor(cat) {
    const colors = {
        Personal: '#FF9a9e',
        Work: '#A1c4fd',
        Education: '#84fab0',
        Finance: '#Fccb90',
        Shopping: '#E0c3fc'
    };
    return colors[cat];
}