import { App, Note } from './note.js';
let isEditOpen = false;

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
          <button class="unarchive btn btn-warning" id="${note.id}">Un archive</button>
          <button class="remove btn btn-warning"id="${note.id}">Remove</button>
        </td>
      `;

        notesTableBody.appendChild(row);
    });
}

function renderNotesTable(noteApp) {
    const notesTableBody = document.getElementById('notesTableBody');

    notesTableBody.innerHTML = '';

    noteApp.getActiveNotes().forEach((note) => {
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
        <td class="table-dark">${note.content.length > 15 ? note.content.substring(0, 15) + '...' : note.content}</td>
        <td class="table-dark">${noteApp.getDatesMentioned(note.content)}</td>
        <td>
          <button class="edit btn btn-warning" id="${note.id}">Edit</button>
          <button class="archive btn btn-warning" id="${note.id}">Archive</button>
          <button class="remove btn btn-warning"id="${note.id}">Remove</button>
        </td>
      `;
        notesTableBody.appendChild(row);
    });
}
// listener for EDIT

const showEditForm = (el, note, noteApp) => {
    let div = document.createElement('div');
    div.classList.add('editWindow');
    div.innerHTML = `
    <div class="input-group mb-3">
    <span class="input-group-text">Name</span>
    <input type="text" id="editName" value="${note.name}">
    <label class="input-group-text" for="inputGroupSelect01">Category</label>
    <select class="form-select" id="editCategory">
    <option value="Task">Task</option>
    <option value="Random Thought">Random Thought</option>
    <option value="Idea">Idea</option>
  </select>
    <span class="input-group-text">Content</span>
    <textarea class="form-control" aria-label="With textarea" id="editContent">${note.content}</textarea>
    <button class="saveChangesBtn">Save Changes</button>
`;
    div.querySelector('.saveChangesBtn').addEventListener('click', () => {
        isEditOpen = false;
        try {
            noteApp.editNote({
                id: el.id * 1,
                content: div.querySelector('#editContent').value,
                category: div.querySelector('#editCategory').value,
                noteName: div.querySelector('#editName').value,
            });
        } catch (error) {
            console.log('something went wrong :(');
        }

        renderAll(noteApp);
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

let divAddNote = document.createElement('div');
divAddNote.classList.add('createWindow');

function renderAll(noteApp) {
    divAddNote.innerText = ''; // cleaning error zone for creating note

    renderNotesTable(noteApp);
    updateSummaryTable(noteApp);
    renderArchiveNoteTable(noteApp);
    // listener for taking note from ARCHIVE
    document.querySelectorAll('.unarchive').forEach((el) => {
        el.addEventListener('click', () => {
            noteApp.unarchiveNote(el.id * 1);
            renderAll(noteApp);
        });
    });
    // listener for EDIT
    document.querySelectorAll('.edit').forEach((el) => {
        el.addEventListener('click', () => {
            if (!isEditOpen) {
                isEditOpen = true;
                const note = noteApp.getNote(el.id * 1);
                showEditForm(el, note, noteApp);
            }
        });
    });

    // listener for REMOVE
    document.querySelectorAll('.remove').forEach((el) => {
        el.addEventListener('click', () => {
            noteApp.removeNote(el.id * 1);
            renderAll(noteApp);
        });
    });
    // listener for adding to ARCHIVE
    document.querySelectorAll('.archive').forEach((el) => {
        el.addEventListener('click', () => {
            noteApp.archiveNote(el.id * 1);
            renderAll(noteApp);
        });
    });
    // LISTENER FOR CREATING Note
    document.querySelector('.addNote').addEventListener('click', () => {
        divAddNote.innerHTML = `
        <div class="input-group mb-3">
        <span class="input-group-text">Name</span>
        <input type="text" id="createName">
        <label class="input-group-text" for="inputGroupSelect01">Category</label>
        <select class="form-select" id="createCategory">
        <option value="Task">Task</option>
        <option value="Random Thought">Random Thought</option>
        <option value="Idea">Idea</option>
      </select>
        <span class="input-group-text">Content</span>
        <textarea class="form-control" aria-label="With textarea" id="createContent"></textarea>
        <button class="createButton">Create note</button>
    `;
        divAddNote.querySelector('.createButton').addEventListener('click', () => {
            const createdNote = {
                name: divAddNote.querySelector('#createName').value,
                category: divAddNote.querySelector('#createCategory').value,
                content: divAddNote.querySelector('#createContent').value,
            };
            divAddNote.innerHTML = '';
            try {
                noteApp.addNote(createdNote);
                renderAll(noteApp);
            } catch (error) {
                console.log(error);
                divAddNote.innerHTML = 'Error bro :(';
            }
        });
        const divCreateNote = document.getElementsByClassName('createNote')[0];
        divCreateNote.appendChild(divAddNote);
    });
}
// Search for dates inside a content of note

export { renderNotesTable, updateSummaryTable, renderArchiveNoteTable, renderAll };
