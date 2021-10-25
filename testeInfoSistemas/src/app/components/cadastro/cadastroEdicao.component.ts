import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-cadastro-edicao',
  templateUrl: './cadastroEdicao.component.html',
  styleUrls: ['./cadastroEdicao.component.css'],

  changeDetection: ChangeDetectionStrategy.Default
})
export class CadastroEdicaoComponent implements OnInit, OnChanges {

  @Input() tipoFormulario: String;
  @Input() veiculoParaEdicao: Veiculo;
  @Input() formSubmitted: Boolean = false;
  @Output() fecharModal = new EventEmitter();
  
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private veiculoService: VeiculoService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [],
      modelo: [, [Validators.required]],
      ano: [, [Validators.required]],
      placa: [, [Validators.required]],
      chassi: [, [Validators.required]],
      renavam: [, [Validators.required]],
      marca: [, [Validators.required]]
    })
  }

  ngOnChanges() {
    if (this.tipoFormulario === 'EXCLUSAO')
      this.excluirVeiculo(this.veiculoParaEdicao)
    if (this.tipoFormulario === 'EDICAO' && this.formSubmitted === false)
      this.formulario.setValue(this.veiculoParaEdicao)

    if (this.formSubmitted === true && this.formulario.valid) {
      if (this.tipoFormulario === 'CADASTRO')
        this.cadastrar(this.formulario.value);
      else if (this.tipoFormulario === 'EDICAO')
        this.editar(this.formulario.value);
    }
  }


  cadastrar(veiculoParaCadastro: Veiculo) {
    try {
      // incrementa id a partir do último veiculo cadastrado
      let ultimoVeiculo = this.veiculoService.listarVeiculos()[this.veiculoService.listarVeiculos().length - 1];
      veiculoParaCadastro.id = ultimoVeiculo.id + 1;

    } catch {
      // seta id 1 caso não exista nenhum veiculo
      veiculoParaCadastro.id = 1;
    }
    finally {
      // cadastra e reseta o formulario
      this.veiculoService.cadastrarVeiculo(veiculoParaCadastro);
      this.fecharModal.emit({ tipoFormulario: this.tipoFormulario, veiculo: veiculoParaCadastro, listaVeiculos: this.veiculoService.listarVeiculos() })

      this.formulario.reset();

      this.formSubmitted = false;
    }
  }

  editar(veiculoParaEdicao: Veiculo) {
    this.veiculoService.editarVeiculo(veiculoParaEdicao);
    this.fecharModal.emit({ tipoFormulario: this.tipoFormulario, veiculo: veiculoParaEdicao, listaVeiculos: this.veiculoService.listarVeiculos() })
    this.formulario.reset();
    this.formSubmitted = false;

  }
  excluirVeiculo(veiculoParaExclusao: Veiculo) {
    this.veiculoService.excluirVeiculo(veiculoParaExclusao)
    this.fecharModal.emit({ tipoFormulario: this.tipoFormulario, veiculo: veiculoParaExclusao, listaVeiculos: this.veiculoService.listarVeiculos() })
  }
}
