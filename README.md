# api-architecture


1. RESTful Architecture

** 7 RESTful Routes **

BOOK Model

* VIEWS ROUTES *
GET /book -> Handlebars or HTML (View all books)
GET /book/:id -> Handlebars or HTML (View a single book with that id)
GET /book/edit/:id -> Handlebars or HTML (View a Book form, pre-populated with data. )
GET /book/new -> Handlebars or HTML (View a Book form, empty)

* API ROUTES *
POST /book -> JSON (Creates a new book in the DB)
PUT /book/:id -> JSON (Update an existing book, by ID)
DELETE /book/:id -> JSON (Delete an existing book, by ID)

BOOK Model + AUTHOR model

* VIEWS ROUTES *
GET /book -> Handlebars or HTML (View all books, include associated authors)
GET /book/:id -> Handlebars or HTML (View a single book with that id with associated author)
GET /book/edit/:id -> Handlebars or HTML (View a Book form, pre-populated with data. Can I edit author at same time?)
GET /book/new -> Handlebars or HTML (View a Book form, empty, maybe with dropdown to Select existing author)

* API ROUTES *
POST /book -> JSON (Creates a new book in the DB)
PUT /book/:id -> JSON (Update an existing book, by ID, and maybe corresponding author?)
DELETE /book/:id -> JSON (Delete an existing book, by ID)




2. Resource-driven APIs

Resource = A single item in a database table (single row, single document, single object)
Collection = Multiple items from a database table (multiple rows, multiple documents, array of objects)

* API ROUTES * 

BOOK Model

GET /book -> JSON (Returns a collection of books from the DB)
GET /book/:id -> JSON (Returns a single book resource from the DB by ID)
POST /book -> JSON (Creates a single book resource in the DB)
PUT /book/:id -> JSON (Updates a single book resource in the DB by ID)
DELETE /book/:id -> JSON (Removes a single book resource in the DB by ID)

To create a Book, with an authorId as a foreign key, what must I have FIRST?

I MUST have an author. 
I MUST have that author's id. 
