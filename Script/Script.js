class Book
{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
        console.log(title,author,isbn)
    }
    
}
class UI{
     static addBook(book)
    {
        const list=document.querySelector('#book-list')
        const row=document.createElement('tr')
        row.innerHTML=`
        <td>${book.title}</td>
        <td> ${book.author} </td>
        <td>${book.isbn}</td>
        <td> <a class="btn btn-danger btn-sm remove-btn">X</a> </td>`
        list.appendChild(row)

    }
    static showAlert(msg,className)
    {
        
        const div =document.createElement('div')
        div.className=`alert alert-${className}` 
        div.appendChild(document.createTextNode(msg))
       const container= document.querySelector('.container')
       const form=document.querySelector('#book-form')
       container.insertBefore(div,form)
       setTimeout(function(){
        document.querySelector('.alert').remove()
       },3000)

    }
    static clearAll()
    {
        document.querySelector('#title').value=""
        document.querySelector('#author').value=""
        document.querySelector('#isbn').value=""
    }
  static removeBook(e)  
  {
    if(e.target.classList.contains('remove-btn'))
    {
        if(confirm("are you sure"))
        {
         e.target.parentElement.parentElement.remove()
        
        }
    }
   
  }
  static showRandomBook()
  {
    
    const books=store.getBook()
    books.forEach(function(book){
   UI.addBook(book)
    })
  }
}

class store
{
    static getBook()
    {
        let bookArr
        if(localStorage.getItem("bookArr")==null)
        {
            bookArr=[]

        }
        else
        {
           bookArr= JSON.parse(localStorage.getItem("bookArr"))

        }
        return bookArr;
    }
    
    static addBooks(book)
    {
    
        let bookArr=store.getBook();
        bookArr.push(book)
        localStorage.setItem("bookArr",JSON.stringify(bookArr))
       
    }

    static deleteBook(isbn)
    {
        // console.log(isbn)  
       const bookArr= store.getBook()
       
       bookArr.forEach(function(book,index)
       {
        if(book.isbn==isbn)
        {
            
            bookArr.splice(index,1)
            
        }
        localStorage.setItem("bookArr",JSON.stringify(bookArr))

       })

    }
    
}

const d=document.querySelector('#book-form')  //
d.addEventListener('submit',function(e)
{
    if(author.value=="" || title.value==""|| isbn.value=="")
    {
        e.preventDefault()
        UI.showAlert("Fill all the Fields",'danger')

    }
    else{
    e.preventDefault()
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value
    const isbn=document.querySelector('#isbn').value
    const book2=new Book(title,author,isbn)
    UI.addBook(book2)
    store.addBooks(book2)
    UI.showAlert("Book added Successfully",'success')
    UI.clearAll()
    }

})
document.querySelector('#book-list').addEventListener('click',function(e){
 UI.removeBook(e)
store.deleteBook(e.target.parentElement.previousElementSibling.textContent) 
UI.showAlert("Book Remove Successfully","success") 

})

//when content Load
document.addEventListener('DOMContentLoaded',UI.showRandomBook)