import { Routes } from '@angular/router';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';


export const rootRouterConfig: Routes = [
    { 
        path: '', 
        redirectTo: ' ', 
        pathMatch: 'full' 
    },
    { 
        path: '',
        component: IntroPageComponent,
        data: {
            title: "Inicio"
        }
    },
    { 
        path: 'cursos/:id',
        component: DashboardPageComponent,
        data: {
            title: "DashBoard"
        }
    },
];



