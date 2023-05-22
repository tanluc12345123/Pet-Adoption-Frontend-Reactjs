import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Home from '../pages/Home/index';
import PetPageLayout from '../pages/Pet/PetPageLayout';
import PetSchedulePage from '../pages/Pet/PetSchedule/index';
import PetPage from '../pages/Pet/Pet/index';
import ServicePageLayout from '../pages/Services/ServicePageLayout';
import ServicePage from '../pages/Services/Service/index';
import OrderServicePage from '../pages/Services/OrderService/index';
import VeterinarianPageLayout from '../pages/Veterinarians/VeterinarianPageLayout';
import VeterinarianPage from '../pages/Veterinarians/Veterinarian/index';
import OrderVeterinarianPage from '../pages/Veterinarians/OrderVeterinarian/index';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';

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
            icon: <PetsIcon />
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
    {
        path: "/service",
        element: <ServicePageLayout />,
        state: "service",
        sidebarProps: {
            displayText: "Service",
            icon: <DesignServicesIcon />
        },
        child: [
            {
                path: "/service/index",
                element: <ServicePage />,
                state: "service.index",
                sidebarProps: {
                    displayText: "Service"
                },
            },
            {
                path: "/service/ordered",
                element: <OrderServicePage />,
                state: "service.ordered",
                sidebarProps: {
                    displayText: "Ordered Service"
                },
            },
        ]
    },
    {
        path: "/veterinarian",
        element: <VeterinarianPageLayout />,
        state: "veterinarian",
        sidebarProps: {
            displayText: "Veterinarian",
            icon: <VaccinesOutlinedIcon />
        },
        child: [
            {
                path: "/veterinarian/index",
                element: <VeterinarianPage />,
                state: "veterinarian.index",
                sidebarProps: {
                    displayText: "Veterinarian"
                },
            },
            {
                path: "/veterinarian/ordered",
                element: <OrderVeterinarianPage />,
                state: "veterinarian.ordered",
                sidebarProps: {
                    displayText: "Ordered Veterinarian"
                },
            },
        ]
    },
];

export default appRoutes;