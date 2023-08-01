class Note {
    constructor(id, createdAt, content, category, name) {
        this.id = id;
        this.createdAt = createdAt;
        this.content = content;
        this.category = category;
        this.name = name;
    }
}

class App {
    constructor(notes) {
        this.notes = notes;
        this.archivedNotes = [];
    }
    addNote(args) {
        const { content, category, name } = args;
        if (!name || !content || content.length < 10) throw new Error('Missing name or content or content is to small');
        if (!['Task', 'Idea', 'Random Thought'].includes(category)) throw new Error('We dont support this content');
        this.notes.push({
            id: this.notes.length + this.archivedNotes + 1,
            createdAt: Date.now().toLocaleString(),
            content,
            category,
            name,
        });
        return this;
    }
    getNote(id) {
        return this.notes.find((n) => n.id === id);
    }
    editNote(...args) {
        let { id, content, category, noteName } = args[0];
        if (!category || content.length < 10) throw new Error('Content length is to small or no category');
        if (!content || !['Task', 'Idea', 'Random Thought'].includes(category)) throw new Error('Wrong category');
        const note = this.notes.find((n) => n.id === id);
        if (note) {
            note.content = content || note.content;
            note.category = category || note.category;
            note.name = noteName || note.name;
        }
        return this;
    }
    removeNote(id) {
        this.notes = this.notes.filter((n) => n.id !== id);
        this.archivedNotes = this.archivedNotes.filter((n) => n.id !== id);
        return this;
    }
    getArchiveNote(id) {
        return this.archivedNotes.find((n) => n.id === id);
    }
    archiveNote(id) {
        const note = this.getNote(id);
        if (note) {
            this.notes = this.notes.filter((n) => n.id !== id);
            this.archivedNotes.push(note);
        }
        return this;
    }

    unarchiveNote(id) {
        const note = this.getArchiveNote(id);
        if (note) {
            this.archivedNotes = this.archivedNotes.filter((n) => n.id !== id);
            this.notes.push(note);
        }
        return this;
    }

    getActiveNotes() {
        return this.notes;
    }

    getArchivedNotes() {
        return this.archivedNotes;
    }
    getSummary() {
        const summary = {
            active: {
                Task: 0,
                'Random Thought': 0,
                Idea: 0,
            },
            archived: {
                Task: 0,
                'Random Thought': 0,
                Idea: 0,
            },
        };

        this.notes.forEach((note) => {
            summary.active[note.category]++;
        });

        this.archivedNotes.forEach((note) => {
            summary.archived[note.category]++;
        });

        return summary;
    }
    getDatesMentioned(content) {
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g; // regex for dd/mm/yyyy
        return content.match(dateRegex) ? content.match(dateRegex).join(', ') : '';
    }
}

export { Note, App };
