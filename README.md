# Food Nomad

## About the app:

---

Food Nomad is an app that advocates the sharing of recipes, lifehacks and excess ingredients within individuals in an effort to reduce food waste.

## App Link:

---

[Food Nomad App Link](https://food-nomad.herokuapp.com/)

## Wireframe:

---

[Food Nomad Web Mockup](https://www.figma.com/proto/UcZCNESBlWCKz99K9GHzox/Food-Nomad-Web-App?node-id=1%3A2&scaling=min-zoom)

## Technologies Used:

---

Server

- express
- method-override
- mongoose
- ejs
- dotenv

Auth

- bcrypt
- express-sessions

Storage

- multer
- multer-storage-cloudinary
- cloudinary

APIs

- Onemap API (Geocoding zip codes)
- Google Maps API (Map Display)

## Database:

---

- Mongo DB
- Cloudinary

## Approach Taken

---

Inspired by an app idea of the same name from a friend of mine. I've decided to scope the project into a suitable web app.

[Food Nomad Mobile Mockup](https://www.figma.com/proto/qCspl4i1uAYmXkwF9xs2H7/Food_Nomad_Final?node-id=45%3A0&scaling=scale-down)

## Achievements

---

- Manage to manipulate and display data onto Google Maps.

## Challenges

---

- Getting promises to work with Google maps as there are calls from the server to the OneMap API as well as Google Map's API.

- Implementing the Cloudinary Image storage with the database

## Known Issues

---

- On edit food form, if no amendment to the date is done, the date will be saved as an empty string.

- On edit recipe, if no image is uploaded, on redirect, it will result in an error but non-image data will be saved.

- On edit recipe, ingredients will not formatted properly in the form. If saved, it will be one unformatted string.

## Screenshots

---

## RESTful Routes

---

| No. | Route | URL | HTTP Verb | Description |
| --- | ----- | --- | --------- | ----------- |
| 1   | Index | /   | GET       | Home Page   |

## Extra Features Planned

---

- Dark Theme
- Able to 'like' user recipes.
- Able to by most liked recipes.
