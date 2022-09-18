(()=>{

    // VARIABLES
    const toggler = document.querySelector('#toggle_addNote')
    const noOfNotes = document.querySelector('#no_of_notes')
    const notesContainer = document.querySelector('#notes_container')
    const noteView = document.querySelector('#noteView')
    const formContainer = document.querySelector('#addNote__formContainer')
        const form = formContainer.querySelector('#addNote__form')
            const noteTitle = form.querySelector('#addNote__noteTitle')
            const noteDescr = form.querySelector('#addNote__noteDescr')
            const addNoteBtn = form.querySelector('#addNote__btn')


    // FUNCTIONS
    const showAddNoteForm = () => {
        formContainer.style.display = 'flex'
        setTimeout(()=>{form.style.transform = 'scale(1)'},300)
    }

    const hideAddNoteForm = () => {
        formContainer.style.display = 'none'
        // form.style.transform = 'scale(0)'
        // form.addEventListener('transitionend',()=>{formContainer.style.display = 'none'})
    }

    const createNote = (title,descr) => {

        const Note = `
            <div class="note">
                <div class="content">
                    <div class="title">${title}</div>
                    <div class="descr">${descr}</div>
                </div>
                <div class="actions">
                    <button class="deleteNote__btn">Delete Note</button>
                </div>
            </div>
        `

        const template = document.createElement('template')
        template.innerHTML = Note.trim()
        return template.content.firstElementChild
    }

    const renderNotes = () => {
        let notes = JSON.parse(localStorage.getItem('StoredNotes'))
        noOfNotes.innerText = notes.length

        notesContainer.innerHTML = ''
        if(notes===null) return
        for(let note of notes){
            let createdNote = createNote(note.title,note.descr)
            notesContainer.appendChild(createdNote)
            // console.log(createdNote)
        }

        const deleteNoteBtns = document.querySelectorAll('.deleteNote__btn')
        for(let button of deleteNoteBtns){
            button.addEventListener('click',e=>{
                const events = e.target.parentElement
                const note = events.parentElement
                const noteTitle = note.querySelector('.title')
                
                const notes = JSON.parse(localStorage.getItem('StoredNotes'))
                const filteredNotes = notes.filter(record=>record.title!=noteTitle.innerText)
                localStorage.setItem('StoredNotes',JSON.stringify(filteredNotes))
                renderNotes()
            })
        }
    }

    renderNotes()

    // EVENT LISTENERS
    toggler.addEventListener('click', showAddNoteForm)

    formContainer.addEventListener('click', hideAddNoteForm)

    form.addEventListener('click',e=>{
        e.stopPropagation()
    })

    // noteView.addEventListener('click',()=>{
    //     noteView.style.display = 'none'
    // })

    addNoteBtn.addEventListener('click',e=>{
        e.preventDefault()

        if(noteTitle.value!='' && noteDescr.value!=''){
            const StoredNotes = localStorage.getItem('StoredNotes')
        
            const Note = {
                "title": noteTitle.value,
                "descr": noteDescr.value
            }
    
            if(StoredNotes===null){
                const Notes = []
                Notes.push(Note)
                localStorage.setItem('StoredNotes',JSON.stringify(Notes))
                console.log(JSON.parse(localStorage.getItem('StoredNotes')))
            }else{           
                const Notes = JSON.parse(StoredNotes)
                Notes.push(Note)
                localStorage.setItem('StoredNotes',JSON.stringify(Notes))
                console.log(JSON.parse(localStorage.getItem('StoredNotes')))
            }
            
            hideAddNoteForm()
            noteTitle.value=''
            noteDescr.value=''
            renderNotes()
        }
    })

})()