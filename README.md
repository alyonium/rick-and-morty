# Rick and Morty [API](https://rickandmortyapi.com/)-based app

### Deploy:

[View deploy 👆🏻](https://alyonium.github.io/rick-and-morty)

### Stack:

- React (Vite)
- TypeScript
- GraphQL (Apollo Client & Codegen)
- MUI
- Formik
- Emotion

### About the app:

This app features: Characters Catalog & Character Page.

### Characters Catalog

Displays a paginated table of Characters with a search bar.

⚠️ The search works through API and doesn't include edited values.

### Character Page
Displays a page with Character details that has two modes: view & edit.

#### View mode
Displays Character data (name, species, gender, status, location & episodes).

#### Edit mode
Displays Character data and allows to edit fields.

⚠️ API doesn't allow to get full lists of data (such as locations or episodes) without pagination, and MUI doesn't provide an async select. Therefore, it's not possible to edit the Character's location or episodes list (this can be done through the MUI Table component, but it's quite labor-intensive for a test task).

Edit mode has simple validation.

Edited data is stored locally using local storage. As API doesn't allow to modify data, editing implemented through GraphQL local mutation.

### Requirements:

- node.js version >= 20.0.0

### Commands:

Start dev server:

```
npm run dev
```
