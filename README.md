# Front end for act-matrix app

A simple online ACT Matrix tool.
Users can use the sample matrix which uses browser storage or they can create an account and use the dashboard when logged in to create their own matrix instances.

## setup

- The app uses the [Vite](https://vitejs.dev/) React setup.

## routing

- [React router](https://reactrouter.com/en/main)
- [react-router-hash-link](https://www.npmjs.com/package/react-router-hash-link) for on page # links (skip to content).

## authentication

- Authentication is done through [Auth0](https://auth0.com/) as a SPA.

## editor

- [tiptap](https://tiptap.dev/)
- I had some difficulty getting the correct content to display in the editor when changing matrix instance, this useeffect used in the editor component fixed my issue.

```
 useEffect(() => {
    if (editor && !editor.isDestroyed) {
      editor?.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

```

## hosting

- hosted on [vercel](https://vercel.com/home)
- I was getting 404 not found errors when I refreshed the browser. I had to add a vercel.json file with this code to fix it.

```
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

## component structure

### dashboard

- available when user is logged in.
- fetches all matrix instances of user on load.
- provides user context.
- renders userpanel component and matrix component.
- has state that changes when an update is made in any child components.

### userpanel

- holds functions that handles profile and matrix instances updates (update title, create new, delete).
- renders update form component based on update type.

### matrix

- renders 4 quadrant components.
- quadrant component handles matrix content updates.
- quadrant renders the editor component.

[link to backend repo](https://github.com/MauritzLM/act_matrix_server)







