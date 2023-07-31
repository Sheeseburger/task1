import { App, Note } from './note.js';

// renders Note table
function renderNotesTable(noteApp) {
    const notesTableBody = document.getElementById('notesTableBody');

    notesTableBody.innerHTML = '';

    noteApp.getActiveNotes().forEach((note) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${note.name}</td>
        <td>${note.createdAt.toLocaleString()}</td>
        <td>${note.category}</td>
        <td>${note.content.substring(0, 15) + '...'}</td>
        <td>${noteApp.getDatesMentioned(note.content)}</td>
        <td>
          <button class="edit" id="${note.id}">Edit</button>
          <button class="archive" id="${note.id}">Archive</button>
          <button class="remove"id="${note.id}">Remove</button>
        </td>
      `;
        notesTableBody.appendChild(row);
    });
    // listener for EDIT
    document.querySelectorAll('.edit').forEach((el) => {
        el.addEventListener('click', () => {
            console.log('123');
        });
    });
    // listener for REMOVE
    document.querySelectorAll('.remove').forEach((el) => {
        el.addEventListener('click', () => {
            noteApp.removeNote(el.id * 1);
            renderNotesTable(noteApp);
        });
    });
}

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

// Search for dates inside a content of note

// Event listener for the addNoteForm submission
document.getElementById('addNoteForm').addEventListener('submit', function () {
    console.log('added');
    return;
});

export { renderNotesTable, updateSummaryTable };
