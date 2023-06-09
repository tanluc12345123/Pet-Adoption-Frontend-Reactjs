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
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VolunteeringPageLayout from '../pages/Volunteers/VolunteeringPageLayout';
import VolunteeringPage from '../pages/Volunteers/Volunteerings/index';
import RegisteredVolunteersPage from '../pages/Volunteers/RegisteredVolunteers/index';
import TrashPage from '../pages/Trash/TrashPage';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import BookingAppointmentPet from '../pages/Pet/BookingAppointment/index';
import InsightsIcon from '@mui/icons-material/Insights';
import StatisticPageLayout from '../pages/Statistic/StatisticPageLayout';
import StatisticByQuarterPage from '../pages/Statistic/StatisticByQuarter/StatisticByQuarterPage';
import StatisticByYearPage from '../pages/Statistic/StatisticByYear/StatisticByYearPage';
import StatisticByMonthPage from '../pages/Statistic/StatisticByMonth/StatisticByMonthPage';
import CustomerPage from '../pages/Customer/CustomerPage';

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
        path: "/customers",
        element: <CustomerPage />,
        state: "customers",
        sidebarProps: {
            displayText: "Customers",
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
            {
                path: "/pet/booking",
                element: <BookingAppointmentPet />,
                state: "pet.booking",
                sidebarProps: {
                    displayText: "Booking Appointment"
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
    {
        path: "/volunteering",
        element: <VolunteeringPageLayout />,
        state: "volunteering",
        sidebarProps: {
            displayText: "Volunteering",
            icon: <VolunteerActivismIcon />
        },
        child: [
            {
                path: "/volunteering/index",
                element: <VolunteeringPage />,
                state: "volunteering.index",
                sidebarProps: {
                    displayText: "Volunteering Activities"
                },
            },
            {
                path: "/volunteering/registered",
                element: <RegisteredVolunteersPage />,
                state: "volunteering.registered",
                sidebarProps: {
                    displayText: "Registered Volunteering"
                },
            },
        ]
    },
    {
        path: "/statistic",
        element: <StatisticPageLayout />,
        state: "statistic",
        sidebarProps: {
            displayText: "Statistic",
            icon: <InsightsIcon />
        },
        child: [
            {
                path: "/statistic/month",
                element: <StatisticByMonthPage />,
                state: "statistic.month",
                sidebarProps: {
                    displayText: "Statistic by month"
                },
            },
            {
                path: "/statistic/quarter",
                element: <StatisticByQuarterPage />,
                state: "statistic.quarter",
                sidebarProps: {
                    displayText: "Statistic by quarter"
                },
            },
            {
                path: "/statistic/year",
                element: <StatisticByYearPage />,
                state: "statistic.year",
                sidebarProps: {
                    displayText: "Statistic by year"
                },
            },
        ]
    },
    {
        path: "/trash",
        element: <TrashPage />,
        state: "trash",
        sidebarProps: {
            displayText: "Trash",
            icon: <RestoreFromTrashIcon />
        }
    },
    
];

export default appRoutes;
