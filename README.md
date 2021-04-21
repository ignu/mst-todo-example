# [Endpoint TODO Challenge](http://endtodo.surge.sh/)

A simple todo app that loads a list of todos (tasks which need to be completed) from a remote server. Each todo has a status indicating if it has been completed or not as well as an optional due date. When a todo is marked as complete, the server should be notified about the updated status. If a todo is past its due date but not yet completed it should be clearly indicated to the user that it is overdue.

Todos in the list should be sorted in the following order:

- Overdue items at the top
- Sort by due date (due soonest at the top)
- Completed items at the bottom

### `yarn && yarn start`

Downloads the dependencies and runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

There is also a version deployed to surge at [http://endtodo.surge.sh/](http://endtodo.surge.sh/)

# Dependencies

### mobx-state-tree

I'm choosing mobx-state-tree for the store. This might be a heavy solution for the scope of this project, but it's an illustration of what I would reach for in a more complicated application. I also like that it's more straight-forward to test. Some of the lighter solutions like jotai and zustand require the use of hooks, so in order to test store behaviors you're forced to create a useless component just to query its DOM.

### missing .env

The hardcoded keys/urls are in the store for ease of running, but in a real project those would be stored in environment variables.
