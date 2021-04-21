# Endpoint TODO Challenge

A simple todo app that loads a list of todos (tasks which need to be completed) from a remote server. Each todo has a status indicating if it has been completed or not as well as an optional due date. When a todo is marked as complete, the server should be notified about the updated status. If a todo is past its due date but not yet completed it should be clearly indicated to the user that it is overdue.

Todos in the list should be sorted in the following order:

Overdue items at the top
Sort by due date (due soonest at the top)
Completed items at the bottom

# Dependencies

### mobx-state-tree

I'm choosing mobx-state-tree for the store. This might be a heavy solution for the scope of this project, but it's an illustration of what I would reach for in a more complicated application. I also like that it's more straight-forward to test. Some of the lighter solutions like jotai and zustand require the use of hooks, so in order to test store behaviors you're forced to

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
