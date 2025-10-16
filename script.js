document.addEventListener("DOMContentLoaded", () => {
    const addInput = document.querySelector(".add");
    const dateInput = document.querySelector(".date");
    const tambahBtn = document.querySelector(".tambah");
    const deleteAllBtn = document.querySelector(".delete");
    const filterSelect = document.querySelector(".filter");
    const tbody = document.querySelector(".content-table tbody");

    let tasks = [];

    function renderTasks(filter = "all") {
        tbody.innerHTML = "";

        const filtered = tasks.filter(task => {
            return filter === "all" || task.status === filter;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
            return;
        }

        filtered.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.text}</td>
                <td>${task.date}</td>
                <td>${task.status}</td>
                <td>
                    <button class="complete" data-index="${index}">✔</button>
                    <button class="remove" data-index="${index}">🗑</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    tambahBtn.addEventListener("click", () => {
        const text = addInput.value.trim();
        const date = dateInput.value;

        if (!text || !date) {
            alert("Silahkan Isi task dan tanggal dulu ya!");
            return;
        }

        tasks.push({ text, date, status: "pending" });
        addInput.value = "";
        dateInput.value = "";
        renderTasks(filterSelect.value);
    });

    filterSelect.addEventListener("change", () => {
        renderTasks(filterSelect.value);
    });

    deleteAllBtn.addEventListener("click", () => {
        if (confirm("Yakin mau hapus semua task?")) {
            tasks = [];
            renderTasks(filterSelect.value);
        }
    });

    tbody.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("complete")) {
            tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
            renderTasks(filterSelect.value);
        } else if (e.target.classList.contains("remove")) {
            tasks.splice(index, 1);
            renderTasks(filterSelect.value);
        }
    });

    renderTasks();
});

    