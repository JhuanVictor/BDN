import { ErroHandlerService } from './../../core/erro-handler.service';
import { Component, OnInit, ViewChild, ViewEncapsulation, Inject} from '@angular/core';

import { Item } from './../../model/item.model';
import { Lista } from './../../model/list.model';
import { ItemService } from './../item.service';
import { ListaService } from './../lista.service';

//Tabela
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

//Blob
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

//Dialog
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastyService } from 'ng2-toasty';
import { ConfirmDialogService } from 'src/app/core/confirm-dialog.service';


@Component({
  selector: 'app-lista-pesquisa',
  templateUrl: './lista-pesquisa.component.html',
  styleUrls: ['./lista-pesquisa.component.css'],
  encapsulation: ViewEncapsulation.None //Mudar cor dos tooltip's
})
export class ListaPesquisaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'imagem', 'nome',  //Colunas da tabela
  'subcategoria', 'descricao', 'options'];
  dataSource: MatTableDataSource<Item>; // Variavel para receber os dados da tabela
  listas: Lista; //Variavel que recebe as listas
  listaAtual = { codigo: 0, nome: ''} //Variavel que guarda a lista que está em uso
  itemAtual = {}; //Variavel que guarda o item que está em uso
  itens: Item[]; //Array para os itens de uma lista
  fakeItens: Item[];


  erro: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private sanitizer : DomSanitizer,
              public dialog: MatDialog,
              private listaService: ListaService,
              private toasty: ToastyService,
              private itemService: ItemService,
              private dialogService: ConfirmDialogService,
              private erroHandler: ErroHandlerService) {  }

  ngOnInit() {
    this.listar();
      this.dataSource = new MatTableDataSource(this.fakeItens);
      this.dataSource.paginator = this.paginator; //paginação da tabela
      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) { //Metodo do filtro da tabela
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialogLista(tipo: string): void {
    const dialogRef = this.dialog.open(NovaLista, { width: '400px', height: '200px',
    data: { lista : this.listaAtual, tipo: tipo }});

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.listaAtual = result.lista;
        this.listar();
      }else{
        this.listar();
      }
    });
  }

  get dadosLista(){
    return Boolean(this.listaAtual.nome);
  }

  listar(){
    this.listaService.listar()
      .subscribe((data: Lista) => {
        this.listas = data;
        this.toasty.success('Listas carregadas com sucesso!!!');
      })
      ,(error: any) => {
        this.erroHandler.handle(error);
      }
  }

  exibirItens(lista: Lista){
    this.listaAtual = lista;
    this.listaService.exibirItens(lista.codigo)
      .subscribe((data: any) => {
        this.itens = data;
        this.carregarImagens(this.itens);
        this.dataSource = new MatTableDataSource(this.itens);
        this.dataSource.paginator = this.paginator; //paginação da tabela
        this.dataSource.sort = this.sort;
        this.toasty.success('Itens da lista ' + lista.nome +' carregados com sucesso!!!');
      }), (error: any) => {
        this.erroHandler.handle(error);
      }
  }

  carregarImagens(itens: any){
    for (let x of itens) {
      if(x.imagem){
        const img = this.sanitizer.bypassSecurityTrustStyle(`url(data:image/jpeg;base64,${x.imagem})`);
        x.imagem = img;
      }
    }
  }

  deletarLista(){
    const msgAcao = 'deletar';
    const msgTipo = 'lista';
    const msgItem = this.listaAtual.nome;
    this.dialogService.openConfimDialog(msgAcao, msgTipo, msgItem)
    .afterClosed().subscribe(res => {
      if(res){
        this.listaService.deletarLista(this.listaAtual.codigo)
        .subscribe(() => {
          this.toasty.success('Lista ' + this.listaAtual.nome + ' deletada com sucesso!!!');
          this.listar();
          this.listaAtual = new Lista();
        }), (error: any) => {
          this.erroHandler.handle(error);
        }
      }
    });
  }

  dialogItem(tipo: string): void {
    const dialogRef = this.dialog.open(NovoItem, { width: '600px',
    data: { item: this.itemAtual, lista: this.listaAtual, tipo: tipo}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.itemAtual = result.item;
        this.exibirItens(this.listaAtual);
      }else{
        this.exibirItens(this.listaAtual);
      }
    });
  }

  dialogItemCriar(tipo: string): void {
    this.dialogItem(tipo);
  }

  dialogItemEditar(item: Item, tipo: string): void {
    this.itemAtual = item;
    this.dialogItem(tipo);
  }

  deletarItem(item: Item){
    const msgAcao = 'deletar';
    const msgTipo = 'item';
    const msgItem = item.nome;
    this.dialogService.openConfimDialog(msgAcao, msgTipo, msgItem)
      .afterClosed().subscribe(res => {
        if(res){
          this.itemService.deletarItem(item.codigo)
          .subscribe(() => {
            this.toasty.success('Item deletado com sucesso!!!')
            this.exibirItens(this.listaAtual);
          }, (error: any) => {
            this.erroHandler.handle(error);
          })
        }
      });
  }

  concluirItem(item: Item){
    const msgAcao = 'concluir';
    const msgTipo = 'item';
    const msgItem = item.nome;
    this.dialogService.openConfimDialog(msgAcao, msgTipo, msgItem)
      .afterClosed().subscribe(res => {
        if(res){
          this.itemService.concluirItem(item.codigo)
            .subscribe(() =>{
              this.toasty.success('Item concluido!!!')
              this.exibirItens(this.listaAtual);
            }, (error: any) => {
              this.erroHandler.handle(error);
            })
        }
      });
  }

}

@Component({
  selector: 'nova-lista',
  templateUrl: 'nova-lista.html',
})
export class NovaLista {

  constructor(
    public dialogRef: MatDialogRef<NovaLista>,
    @Inject(MAT_DIALOG_DATA) public data: { lista: Lista, tipo: string},
    private listaService: ListaService,
    private toasty: ToastyService,
    private erroHandler: ErroHandlerService) {}

  get editando(){
      return this.data.tipo;
  }

  salvar(lista: Lista, tipo: string){
    if(tipo === 'CRIAR'){
      this.criarLista(lista);
    }else{
      this.editarLista(lista);
    }
  }

  editarLista(lista: Lista){
    this.listaService.editarLista(lista)
      .subscribe((data: any) =>{
        this.toasty.success('Lista ' + data.nome + ' editada com sucesso!!!');
        this.dialogRef.close();
      }, (error : any) => {
        this.erroHandler.handle(error);
      });
  }

  criarLista(lista: Lista){
    const novaLista = new Lista();
    novaLista.nome = lista.nome;
    this.listaService.criarLista(novaLista)
    .subscribe((data: any) =>{
      this.toasty.success('Lista ' + data.nome + ' criada com sucesso!!!');
      this.dialogRef.close();
    }, (error : any) => {
      this.erroHandler.handle(error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'novo-item',
  templateUrl: 'novo-item.html',
})
export class NovoItem {

  constructor(
    public dialogRef: MatDialogRef<NovoItem>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item, lista: Lista, tipo: string},
    private toasty: ToastyService,
    private itemService: ItemService,
    private erroHandler: ErroHandlerService) {}

  cardImageBase64: string; //String base64

  get editando(){
    return this.data.tipo;
  }

  salvar(item: Item, tipo: string){
    if(tipo === 'CRIAR'){
      this.criarItem(item);
    }else{
      this.editarItem(item);
    }
  }

  editarItem(item: Item){
    item.lista = this.data.lista;
    item.imagem = this.cardImageBase64;
    console.log('Novo item: ', item);
    this.itemService.editarItem(item)
      .subscribe((data: any) => {
        this.toasty.success('Item ' + data.nome + ' editado com sucesso!!!');
        this.dialogRef.close();
      }, (error: any) => {
        this.erroHandler.handle(error);
      })
  }

  criarItem(item: Item){
    let novoItem = new Item();
    novoItem.nome = item.nome;
    novoItem.descricao = item.descricao;
    novoItem.subcategoria = item.subcategoria;
    novoItem.lista = this.data.lista;
    novoItem.imagem = this.cardImageBase64;
    this.cardImageBase64 = '';
    console.log('Novo item: ', novoItem);
    this.itemService.criarItem(novoItem)
      .subscribe((data: any) => {
        this.toasty.success('Item ' + data.nome + ' criado com sucesso!!!');
        this.dialogRef.close();
      }, (error: any) => {
        this.erroHandler.handle(error);
      });
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
            this.toasty.error('Tamanho maximo permitido é, ' + max_size / 1000 + 'Mb');
            return false;
        }

        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.toasty.error('Apenas imagens do tipo PNG e JPG são permitidas.');
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
                if (img_height > max_height && img_width > max_width) {
                  this.toasty.error('Dimensões maximas de imagens atingida.');
                  return false;
                } else {
                  const imgBase64Path = e.target.result;

                  var textoReplace = ",";
                  var resultado_str = imgBase64Path.substring(imgBase64Path.indexOf(textoReplace) + textoReplace.length);
                  this.cardImageBase64 = resultado_str;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
