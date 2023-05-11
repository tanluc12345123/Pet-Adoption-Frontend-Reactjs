import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Home from '../pages/Home/index';
import PetPageLayout from '../pages/Pet/PetPageLayout';
import PetSchedulePage from '../pages/Pet/PetSchedule/index';
import PetPage from '../pages/Pet/Pet/index';

const appRoutes = [
    {
        path: "/home",
        element: <Home />,
        state: "home",
        sidebarProps: {
            displayText: "Account",
            icon: <PersonIcon />
        }
    },
    {
        path: "/pet",
        element: <PetPageLayout />,
        state: "pet",
        sidebarProps: {
            displayText: "Pet",
            icon: <DashboardOutlinedIcon />
        },
        child: [
            {
                path: "/pet/index",
                element: <PetPage />,
                state: "pet.index",
                sidebarProps: {
                    displayText: "Pet"
                },
            },
            {
                path: "/pet/schedule",
                element: <PetSchedulePage />,
                state: "pet.schedule",
                sidebarProps: {
                    displayText: "Schedule"
                },
            },
        ]
    },
    // {
    //     path: "/component",
    //     element: <ComponentPageLayout />,
    //     state: "component",
    //     sidebarProps: {
    //         displayText: "Components",
    //         icon: <AppsOutlinedIcon />
    //     },
    //     child: [
    //         {
    //             path: "/component/alert",
    //             element: <AlertPage />,
    //             state: "component.alert",
    //             sidebarProps: {
    //                 displayText: "Alert"
    //             },
    //         },
    //         {
    //             path: "/component/button",
    //             element: <ButtonPage />,
    //             state: "component.button",
    //             sidebarProps: {
    //                 displayText: "Button"
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: "/documentation",
    //     element: <DocumentationPage />,
    //     state: "documentation",
    //     sidebarProps: {
    //         displayText: "Documentation",
    //         icon: <ArticleOutlinedIcon />
    //     }
    // },
    // {
    //     path: "/changelog",
    //     element: <ChangelogPage />,
    //     state: "changelog",
    //     sidebarProps: {
    //         displayText: "Changelog",
    //         icon: <FormatListBulletedOutlinedIcon />
    //     }
    // }
];

export default appRoutes;