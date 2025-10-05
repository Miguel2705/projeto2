import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'buscar-cep',
    loadComponent: () => import('../pages/buscar-cep/buscar-cep.page').then(m => m.BuscarCepPage)
  },
  {
    path: 'sobre-aluno',
    loadComponent: () => import('../pages/sobre-aluno/sobre-aluno.page').then(m => m.SobreAlunoPage)
  }
];
