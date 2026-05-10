# Frontend Documentation

## Overview
The frontend of the UberClone project is built using modern web development tools and frameworks. It provides a user-friendly interface for both users and captains to interact with the application.

## Technologies Used
- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling the application.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For handling client-side routing.

## Folder Structure
```
frontend/
├── public/                # Static assets
├── src/                   # Source code
│   ├── assets/            # Images and other assets
│   ├── components/        # Reusable components
│   ├── context/           # Context API for state management
│   ├── pages/             # Page components for routing
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point for the application
│   ├── App.css            # Global styles
│   ├── index.css          # Tailwind CSS imports
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── README.md              # Documentation
```

## Key Features
- **User Authentication**: Login and signup for both users and captains.
- **Protected Routes**: Ensures only authenticated users can access certain pages.
- **State Management**: Context API is used for managing global state.
- **Responsive Design**: Styled with Tailwind CSS for a mobile-first approach.

## Available Scripts
In the project directory, you can run:

### `npm install`
Installs all the dependencies required for the project.

### `npm run dev`
Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run preview`
Serves the production build locally for testing.

## Environment Variables
The project uses environment variables for configuration. Create a `.env` file in the root of the `frontend` folder and add the following:
```
VITE_BASE_URL=http://localhost:5000
```
Replace the value with the URL of your backend server.

## Pages
- **Home**: Landing page of the application.
- **User Login**: Login page for users.
- **User Signup**: Signup page for users.
- **Captain Login**: Login page for captains.
- **Captain Signup**: Signup page for captains.
- **Dashboard**: Dashboard for users.
- **Captain Dashboard**: Dashboard for captains.

## Context API
The application uses the Context API for managing global state:
- **UserContext**: Manages the state for user-related data.
- **CaptainContext**: Manages the state for captain-related data.

## Styling
The application is styled using Tailwind CSS. Global styles are defined in `App.css` and `index.css`.

## Deployment
To deploy the frontend, build the application using `npm run build` and serve the contents of the `dist` folder using a static file server or a hosting platform like Netlify or Vercel.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

