import {useState} from 'react';


function BookEdit({book, onSubmit}){

    //Handle BookEdit change
    const [formData, setFormData] = useState({title: book.title, author: book.author, ISBN: book.ISBN, blurb: book.blurb})

     const handleChange = (event) => {
         const changedField = event.target.name;
         const newValue = event.target.value;
         setFormData(currData => {
             currData[changedField] = newValue;
             return{...currData};
         })
 
     }
 
     const handleSubmit = (event) => {
         event.preventDefault();
         onSubmit(book.id, formData.title, formData.author, formData.ISBN, formData.blurb);
     };
 
     //Bookedit form
    return <form onSubmit ={handleSubmit} className = "book-edit">
        <p>
        <label>Title</label>
        <input className="input" value={formData.title} onChange={handleChange} name = "title"/>
        </p>
        <p>
        <label>Author</label>
        <input className="input" value={formData.author} onChange={handleChange} name = "author"/>
        </p>
        <p>
        <label>ISBN</label>
        <input className="input" value={formData.ISBN} onChange={handleChange} name = "ISBN"/>
        </p>
        <p>
        <label>Blurb</label>
        <input className="input" value={formData.blurb} onChange={handleChange} name = "blurb"/>
        </p>
        <button className="button is-primary">
            Save
        </button>
    </form>
}

export default BookEdit;