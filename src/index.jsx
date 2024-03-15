import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';
import Root from './routes/root';
import Overview from './routes/overview';
import Board, {
	loader as boardLoader
} from './routes/board';
const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error('Can\'t find root container');

const router = createBrowserRouter([
	{
		path: "/",
		loader: () => redirect('/boards'),
	},
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "boards",
				element: <Overview />,
			},
			{
				path: "boards/:boardId",
				element: <Board />,
				loader: boardLoader,
			},

		]
	}
]);

const root = createRoot(rootContainer);

root.render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)