This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Game play and rules
You, as the Pacman will try to eat all the food and to not collide with four ghosts. If the Pacman hits any of the ghosts, you'll lose. Each food you eat, giving you a point. When the Pacman eats the whole food on the ground, you'll win. Let's play!
### Control the Pacman
- Just simple as using keyboard arrows **Up, Down, Left, Right** to change Pacman's direction


## Phases

### Create project

### Design components

### Display component onto the scene

### Control user key inputs

### Control ghost random moving

### Control game objects conflicts and scores

### Pause and Unpause

### Handle user input on Phones

### Handle win lose

### Debugging

## Technical issues

### Conflicting Direction state in Scene components

- Because Scene doesn't manage the Direction but Pacman and Controller. If it has its own state, make sure when Pacman's direction and Controller's direction are changed, Scene's direction would be changed accordingly.
- The other reason for this issue is that we're using `componentWillReceiveProps` in Scene. If Scene's points state is changed, its direction will keep updating the same Direction that App is holding.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### Deploying to Github pages

Help link: https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
