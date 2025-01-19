# Notes Application

This is a responsive and user-friendly notes application built with React. The app allows users to create and organize notes into groups, providing a streamlined experience for managing and accessing notes efficiently. It supports data persistence using local storage to ensure notes and groups are saved across sessions.

## Features

1. **Group Creation**:
   - Users can create groups for organizing their notes.
   - A popup modal allows for group creation, which closes automatically when clicking outside the popup.

2. **Add Notes**:
   - Notes can be added to specific groups.
   - Each note is saved along with metadata like the date and time of creation and the last update.

3. **Save Notes**:
   - Notes can be saved either by pressing the Enter key or clicking the Enter icon in the text input.

4. **Persistent Storage**:
   - All notes and groups are stored in local storage, ensuring they persist even after the page is reloaded.

5. **Dynamic Group Switching**:
   - When switching between groups, the app dynamically fetches and displays all notes related to the selected group.

6. **Responsive Design**:
   - The application is fully responsive and optimized for mobile and desktop devices.

## Live Demo

You can view the live version of the application here: [Notes App](https://chimerical-puppy-9cefea.netlify.app/)

## Technologies Used

- **React**: For building the user interface and managing state.
- **CSS**: For styling the components and ensuring responsiveness.
- **Local Storage**: For persisting data across sessions.

## How to Use

1. **Create a Group**:
   - Click the "Add Group" button to open the popup.
   - Enter the group name and choose a color for the group.
   - Click "Create" to save the group.

2. **Add Notes**:
   - Select a group from the sidebar.
   - Type your note in the text area and press Enter or click the "Add Note" button to save it.

3. **Switch Groups**:
   - Click on any group in the sidebar to view and manage its associated notes.

## Installation Instructions

If you want to run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/notes-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd notes-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser at `http://localhost:3000/`.

## Future Improvements

- Add a search functionality to quickly find notes.
- Implement user authentication to enable multi-user support.
- Integrate a backend for more robust data management.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to contribute or share feedback to improve the application!
