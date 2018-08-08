// (req, res) => {
//     // let items = Item.find({}, (e, d)=>{
//     //     console.log(d);
//     // })
//     // let item = new Item({
//     //     title: "test",
//     //     description: "test",
//     //     visible: false,
//     //     collapsed: false,
//     //     label: "test",
//     //     children: [],
//     // });
//     // item.save((e, d) => {
//     //     console.log(d);
//     // // })
//     // res.send(item);
//     let hierarchyJSON;
//     let notesJSON;
//     let items = [];
//     let notes = [];
//     let itemNotes = [];
//     let oldNewItems = {};
//     let oldNewNotes = {};
//     Promise.all(
//         [
//             axios.get('https://tree-of-abstraction-kino6052.c9users.io/getNotes'),
//             axios.get('https://tree-of-abstraction-kino6052.c9users.io/getHierarchy')
//         ]
//     )
//     .then(
//         ([responseNotes, responseHierarchy]) => {
//             console.log(responseHierarchy);
//             console.log(responseNotes);
//             if (
//                 responseHierarchy.hasOwnProperty('data') &&
//                 responseHierarchy.data.hasOwnProperty('hierarchy')
//             ){
//                 hierarchyJSON = responseHierarchy.data.hierarchy;
//             }
//             if (hierarchyJSON){
//                 dfs(hierarchyJSON, (item)=>{
//                     let itemSchema = new Item(
//                         {
//                             title: item.name,
//                             description: "",
//                             visible: true,
//                             collapsed: true,
//                             label: item.label,
//                             children: item.children,
//                         }
//                     );
//                     items.push(itemSchema);
//                     oldNewItems[item.id] = itemSchema.id;
//                     if (item.hasOwnProperty('noteIds') && item.noteIds.length > 0) {
//                         item.noteIds.forEach(
//                             (noteId) => {
//                                 let itemNote = new ItemNote({ itemId: itemSchema.id, noteId: noteId })
//                                 itemNotes.push(itemNote); // we will only need to change noteId to noteSchemaId in itemNotes after this
//                             }
//                         );
//                     }
//                 });
//             }
//             // update item children
//             for (let item of items) {
//                 let newChildren = [];
//                 item.children.forEach(
//                     (childId) => {
//                         newChildren.push(oldNewItems[childId]);
//                     }
//                 );
//                 item.children = newChildren;
//             }

//             if (
//                 responseNotes.hasOwnProperty('data') &&
//                 responseNotes.data.hasOwnProperty('notes')
//             ){
//                 notesJSON = responseNotes.data.notes;
//             }
//             if (notesJSON) {
//                 notesJSON.forEach(
//                     (note) => {
//                         let noteSchema = new Note(
//                             {
//                                 title: note.name,
//                                 content: note.content,
//                                 visible: true
//                             }
//                         );
//                         oldNewNotes[note.id] = noteSchema.id;
//                         notes.push(noteSchema);
//                     }
//                 )
//             }


//             // last step update itemNotes
//             for (let itemNote of itemNotes) {
//                 let oldNoteId = itemNote.noteId;
//                 itemNote.noteId = oldNewNotes[oldNoteId];
//             }

//             for (let itemNote of itemNotes) {
//                 itemNote.save();
//             }
//             for (let item of items) {
//                 item.save();
//             }
//             for (let note of notes) {
//                 note.save();
//             }
//             res.send({ items: itemSchemas, itemNotes });
//         })
//     .catch(error => {
//         console.log(error);
//     });