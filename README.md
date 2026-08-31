# # Development Platforms - Student Express

A student-focused news platform built with HTML, Tailwind CSS, Vanilla JavaScript, and Supabase.

![A screenshot of the homepage of DP-CA](/assets/dp-screenshot.jpg)

Student Express is a front-end news application developed as part of the Development Platforms course assignment at Noroff. The application allows users to register, log in, create articles, and manage their own published content.

Visitors can browse articles and read individual stories, while authenticated users have access to additional functionality such as creating, editing, and deleting their own articles.

The application uses Supabase for authentication and database management and demonstrates the use of a backend-as-a-service platform with a JavaScript front end.

## FEATURES

### Authentication

- **Register a new user**
- **Log in and log out**
- **Supabase authentication**
- **Dynamic navigation based on authentication state**

### Articles

- **View published articles**
- **View individual article details**
- **Featured latest article**
- **Create new articles (authenticated users)**
- **Edit own articles**
- **Delete own articles**
- **View own articles on a dedicated My Articles page**

### Search & Sorting

- **Search articles by keywords**
- **Sort articles by newest or oldest**
- **Load more articles**

### User Content

- **Articles are linked to the user who created them**
- **Authenticated users can manage their own articles**
- **Article ownership is handled using the user's Supabase ID**

### Responsive Design

- **Responsive navigation**
- **Mobile and desktop layouts**
- **Responsive article grids**

## TECH STACK

- **JavaScript (ES6 Modules)**
- **HTML5**
- **Tailwind CSS (CLI)**
- **Supabase**
- **Supabase Authentication**
- **Supabase Database**
- **Deployment – Netlify**

## GETTING STARTED

### Clone the repository

git clone https://github.com/camiP89/Development-Platforms-CA.git

### Install dependencies

npm install

### Run locally

npm run dev

### Build for production

npm run build

## LINKS

- **Live Site:** https://student-express.netlify.app/

- **GitHub Repository:** https://github.com/camiP89/Development-Platforms-CA

## DESIGN

The visual identity for Student Express was designed to resemble a modern student newspaper. The design uses a combination of traditional newspaper-inspired typography and a clean, responsive layout.

## DATABASE & SUPABASE

Supabase is used as the backend platform for the application.

The articles table stores information including:

- **Article ID**
- **Title**
- **Content**
- **Creation date**
- **Image URL**
- **Image alt text**
- **User ID**

The user ID connects each article to the authenticated user who created it.

Supabase authentication is used to manage registration, login, logout, and authenticated user sessions.

## TESTING

Manual testing was conducted throughout development to check the main user flows and application functionality, including:

- **User registration**
- **Login and logout**
- **Authentication state**
- **Viewing articles**
- **Viewing individual articles**
- **Creating articles**
- **Editing articles**
- **Deleting articles**
- **Displaying only the logged-in user's articles on My Articles**
- **Article search**
- **Article sorting**
- **Load More functionality**
- **Responsive layouts**

## REFLECTION

This project improved my understanding of using Supabase as a backend-as-a-service platform and connecting a JavaScript front end to a database.

I gained more experience working with authentication, database queries, asynchronous JavaScript, CRUD operations, and linking database records to authenticated users.

The project also helped strengthen my understanding of structuring JavaScript using ES6 modules and creating reusable components for displaying dynamic content.

Developing Student Express gave me experience moving beyond a traditional external API and working with a platform where authentication and application data can be managed together.

## CONTACT

Email: campug04041@stud.noroff.no

## ACKNOWLEDGEMENTS

- **Noroff Vocational College**
- **Supabase**
