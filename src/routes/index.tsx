import Dashboard from "@/_root/pages/dashboard";
import RootLayout from "@/_root/rootLayout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout/>,
        children:[
            {
                path:'/',
                element: <Dashboard/>
            }
        ]

    }
])


export default router