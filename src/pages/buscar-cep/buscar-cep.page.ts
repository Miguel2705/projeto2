import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CepService, CepResponse } from '../../services/cep.service';

@Component({
  selector: 'app-buscar-cep',
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './buscar-cep.page.html',
  styleUrls: ['./buscar-cep.page.css']
})
export class BuscarCepPage {
  cep: string = '';
  resultado: CepResponse | null = null;
  erro: string = '';
  carregando: boolean = false;

  constructor(private cepService: CepService) {}

  buscarCep() {
    this.erro = '';
    this.resultado = null;

    const cepLimpo = this.cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      this.erro = 'CEP inválido. Digite 8 números.';
      return;
    }

    this.carregando = true;

    this.cepService.buscarCep(cepLimpo).subscribe({
      next: (data) => {
        this.carregando = false;
        if (data.erro) {
          this.erro = 'CEP não encontrado. Verifique o número digitado.';
        } else {
          this.resultado = data;
        }
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Erro ao buscar CEP. Tente novamente.';
      }
    });
  }

  formatarCep(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 8) {
      valor = valor.substring(0, 8);
    }
    this.cep = valor;
  }
}
