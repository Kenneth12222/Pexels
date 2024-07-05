
---

# Pexels Image Gallery

## Project Overview

The Pexels Image Gallery is a responsive web application that allows users to discover and search for stunning high-quality photos from the Pexels API. Users can search for photos, view detailed information about each photo, and explore similar images. The application is built with React and styled for a professional, user-friendly experience.

## Features

- **Search Photos**: Users can search for photos by entering keywords in the search bar.
- **Photo Grid**: Display a grid of photos based on the search query.
- **Photo Details**: Click on a photo to view a larger version and details about the photographer.
- **Similar Photos**: View similar photos related to the selected photo.
- **Responsive Design**: The application is fully responsive and works well on all devices.

## Project Structure

```
Pexels
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components
│   │   ├── Hero.js
│   │   └── Navbar.js
│   ├── context
│   │   └── PexelContext.js
│   ├── page
│   │   ├── Home.jsx
│   │   └── Navbar.jsx
│   ├── style
│   │   ├── Footer.css
│   │   ├── Hero.css
│   │   ├── Home.css
│   │   └── Navbar.css
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (or npm)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pexels-image-gallery.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pexels-image-gallery
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```
   or
   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add your Pexels API key:
   ```
   REACT_APP_PEXELS_API_KEY=your_pexels_api_key
   ```

### Running the Application

1. Start the development server:
   ```bash
   yarn start
   ```
   or
   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- **Search for Photos**: Use the search bar in the hero section to find photos by entering keywords.
- **View Photo Details**: Click on any photo in the grid to see a larger version and details about the photographer.
- **Explore Similar Photos**: When viewing a photo's details, scroll down to see similar photos related to the selected image.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Pexels](https://www.pexels.com/) for providing free high-quality photos.
- [React](https://reactjs.org/) for the amazing library.
- [Axios](https://axios-http.com/) for handling HTTP requests.

---

Feel free to reach out if you have any questions or need further assistance. Happy coding!

---
