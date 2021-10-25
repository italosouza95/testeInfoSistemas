import { Component, ChangeDetectionStrategy, Input, OnChanges, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Veiculo } from 'src/app/models/Veiculo';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListarComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebuttonDelete') closebuttonDelete;
  @Input() veiculos: Veiculo[];
  veiculoSelecionadoAcao: Veiculo;
  tipoFormulario: String;
  formSubmitted: Boolean = false;

  mostrarMensagem: Boolean = false;
  mensagemAlert: String;


  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.atualizarTabela()
  }

  atualizarTabela() {
    this.veiculos = JSON.parse(JSON.stringify(JSON.parse(sessionStorage.getItem('veiculos'))))
  }

  fecharModal(event) {
    let prefixoMensagem = `${event.veiculo.modelo} - ${event.veiculo.ano}`;

    this.mensagemAlert = (this.tipoFormulario == 'CADASTRO') ? (this.mensagemAlert = `${prefixoMensagem} cadastrado com sucesso!`)
      : (this.tipoFormulario == 'EDICAO') ? (this.mensagemAlert = `${prefixoMensagem} editado com sucesso!`)
        : (this.tipoFormulario == 'EXCLUSAO') ? (this.mensagemAlert = `${prefixoMensagem} excluido com sucesso!`)
          : this.mensagemAlert = null;
    this.veiculos = event.listaVeiculos;
    this.mostrarMensagem = true;
    this.closebutton.nativeElement.click();
    this.closebuttonDelete.nativeElement.click();
    this.formSubmitted = false;
    this.tipoFormulario = undefined;
    this.ref.detectChanges();

  }
}
