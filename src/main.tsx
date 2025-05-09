import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import {router} from "./infrastructure/routes/AppRoutes.tsx";
import { Provider } from 'react-redux';
import {store} from "./infrastructure/store/store.ts";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>,
)
