import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ContextProvider from './context/ContextProvider';
import Root from './pages/Root';
import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';

const router = createBrowserRouter([
  { path: '/', element: <Root />,  children : [
    { index: true, element: <Browse /> },
    { path: 'search', element: <Search /> },
  ]},
]);

// Provide Context và Router cho toàn app
function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
