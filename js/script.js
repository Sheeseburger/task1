import { renderAll, renderNotesTable, updateSummaryTable, renderArchiveNoteTable } from './renderTable.js';
import { App, Note } from './note.js';

// start of the script

var notes = [
    new Note(1, new Date('2023-07-31'), 'Go shopping', 'Task', 'shopping'),
    new Note(2, new Date('2023-07-30'), 'Make a salto', 'Idea', 'skill'),
    new Note(3, new Date('2023-07-22'), 'Run an ironman', 'Task', 'IronMan'),
    new Note(4, new Date('2023-07-01'), 'look at this dates 24/10/2003, 31/07/2023', 'Random Thought', 'dates'),
    new Note(5, new Date('2023-07-13'), 'Love everyone', 'Random Thought', '<3'),
    new Note(6, new Date('2023-07-03'), 'Find x', 'Idea', 'Math'),
    new Note(7, new Date('2023-03-09'), 'Go shopping again bro', 'Task', 'shopping'),
];

var noteApp = new App(notes);
renderAll(noteApp);
