import { App, Note } from './note.js';

// renders Note table

function renderArchiveNoteTable(noteApp) {
    const notesTableBody = document.getElementById('archiveTableBody');
    notesTableBody.innerHTML = '';
    noteApp.getArchivedNotes().forEach((note) => {
        const row = document.createElement('tr');
        row.classList.add('table-dark');
        row.innerHTML = `
        <td class="table-dark">${note.name}</td>
        <td class="table-dark">${note.createdAt.toLocaleString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })}</td>
        <td class="table-dark">${note.category}</td>
        <td class="table-dark">${note.content.substring(0, 15) + '...'}</td>
        <td class="table-dark">${noteApp.getDatesMentioned(note.content)}</td>
        <td>
          <button class="edit btn btn-warning" id="${note.id}">Edit</button>
          <button class="unarchive btn btn-warning" id="${note.id}">Un archive</button>
          <button class="remove btn btn-warning"id="${note.id}">Remove</button>
        </td>
      `;

        notesTableBody.appendChild(row);
    });
    document.querySelectorAll('.unarchive').forEach((el) => {
        el.addEventListener('click', () => {
            noteApp.unarchiveNote(el.id * 1);
            renderAll(noteApp);
        });
    });
}

function renderNotesTable(noteApp) {
    const notesTableBody = document.getElementById('notesTableBody');

    notesTableBody.innerHTML = '';

    noteApp.getActiveNotes().forEach((note) => {
        // console.log(note);
        const row = document.createElement('tr');
        row.classList.add('table-dark');
        row.innerHTML = `
        <td class="table-dark">${note.name}</td>
        <td class="table-dark">${note.createdAt.toLocaleString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })}</td>
        <td class="table-dark">${note.category}</td>
        <td class="table-dark">${note.content.substring(0, 15) + '...'}</td>
        <td class="table-dark">${noteApp.getDatesMentioned(note.content)}</td>
        <td>
          <button class="edit btn btn-warning" id="${note.id}">Edit</button>
          <button class="archive btn btn-warning" id="${note.id}">Archive</button>
          <button class="remove btn btn-warning"id="${note.id}">Remove</button>
        </td>
      `;
        notesTableBody.appendChild(row);
    });
    document.querySelectorAll('.edit').forEach((el) => {
        el.addEventListener('click', () => {
            const note = noteApp.getNote(el.id * 1);
            showEditForm(el, note, noteApp);
        });
    });

    // listener for REMOVE
    document.querySelectorAll('.remove').forEach((el) => {
        el.addEventListener('click', () => {
            noteApp.removeNote(el.id * 1);
            renderAll(noteApp);
        });
    });
    document.querySelectorAll('.archive').forEach((el) => {
        el.addEventListener('click', () => {
            noteApp.archiveNote(el.id * 1);
            renderAll(noteApp);
        });
    });
}
// listener for EDIT

const showEditForm = (el, note, noteApp) => {
    let div = document.createElement('div');
    div.innerHTML = `
    <label for="editName">Name:</label>
    <input type="text" id="editName" value="${note.name}">
    
    <label for="editCategory">Category:</label>
    <select id="editCategory">
        <option value="Task" ${note.category === 'Task' ? 'selected' : ''}>Task</option>
        <option value="Random Thought" ${note.category === 'Random Thought' ? 'selected' : ''}>Random Thought</option>
        <option value="Idea" ${note.category === 'Idea' ? 'selected' : ''}>Idea</option>
    </select>
    
    <label for="editContent">Content:</label>
    <textarea id="editContent">${note.content}</textarea>
    
    <button id="saveChangesBtn">Save Changes</button>
`;
    div.querySelector('#saveChangesBtn').addEventListener('click', () => {
        const editedNote = {
            id: el.id * 1,
            name: div.querySelector('#editName').value,
            category: div.querySelector('#editCategory').value,
            content: div.querySelector('#editContent').value,
        };
        // console.log(editedNote);
        noteApp.editNote(editedNote);
        renderNotesTable(noteApp);
        updateSummaryTable(noteApp);
    });
    const row = el.closest('tr');
    row.innerHTML = '';
    const cell = row.insertCell(0);
    cell.colSpan = 6;
    cell.appendChild(div);
};
// update summary table, when archive something etc
function updateSummaryTable(noteApp) {
    const summary = noteApp.getSummary();

    document.getElementById('taskActiveCount').textContent = summary.active['Task'];
    document.getElementById('randomThoughtActiveCount').textContent = summary.active['Random Thought'];
    document.getElementById('ideaActiveCount').textContent = summary.active['Idea'];

    document.getElementById('taskArchivedCount').textContent = summary.archived['Task'];
    document.getElementById('randomThoughtArchivedCount').textContent = summary.archived['Random Thought'];
    document.getElementById('ideaArchivedCount').textContent = summary.archived['Idea'];
}

function renderAll(noteApp) {
    renderNotesTable(noteApp);
    updateSummaryTable(noteApp);
    renderArchiveNoteTable(noteApp);
}
// Search for dates inside a content of note

export { renderNotesTable, updateSummaryTable, renderArchiveNoteTable,renderAll };
