# Disclaimer

This framework is still in a working stage. Keep in mind that anything seen here could possibly change in the future. This is given as an example for now to help teams facilitate conversations.

## Getting Started

1. `yarn`
2. `yarn start`

## Major Framework Dependencies

- Navigation: [react-router-dom](https://reacttraining.com/react-router/)
- State: [mobx-state-tree](https://mobx-state-tree.js.org/)
- UI Library: [Material UI](https://material-ui.com/)
- Translations: [i18next](https://www.i18next.com/)
- API Service: [Apisauce](https://github.com/infinitered/apisauce)
- [humps](https://github.com/domchristie/humps) (optional if data coming from requests is already camelCase)

## Features include

- Private/protected routes
- Data driven Forms
- Loading indicator button
- RequestStatus for API requests in MST. Hook up your UI to the status to display loading indicators or any other action
- Dynamically show/hide features based on config loaded

## Additional helpful links

- [Custom environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env)
- [Create React App documentation](https://create-react-app.dev/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Wes Bos provides great React tutorials/learning](https://www.youtube.com/wesbos)

## To Do

- General cleanup
- Look at better environment variable handling
- Error reporting
- Documentation
- Breaking out components (currently Form, LoadingButton, PrivateRoute, PublicRoute) into a shared UI library

## Recommended Dev Tools

- [MobX Developer Tools Chrome Plugin](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod?hl=en)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
