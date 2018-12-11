import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { listObjShow } from 'src/app/helpers/animations/animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [listObjShow]
})
export class TableComponent implements OnInit {

  @Input() resource: any;
  @Input() resourceFunction: any;

  @Input() filterCriteria: any = {};
  @Input() tableHeadings: any[];

  
  @Input()  tableRowActions: any[];
  @Output() actionButtonEmitter: EventEmitter<any> = new EventEmitter<any>();

  public tableData: any[];
  public pagination: any;

  public headingValues;

  public sortedByHeader;
  public sortChanges: number = 0;

  constructor(private shareData: ShareDataService) { }

  ngOnInit() {
    this.filterCriteria.addListParams();

    this.headingValues = this.tableHeadings.map((heading) => { return heading.value })

    this.loadData();

  }
  
  /**
   * Verifica se o campo da tabela é uma data
   * @param obj 
   */
  public verifyIfItsTimestamp(obj){
    return obj === 'created_at' || obj === 'updated_at';
  }

  /**
   * Verifica se o campo da tabela é um array
   * @param obj 
   */
  public verifyIfItsArray(obj) {
    return typeof obj !== 'string';
    
  }

    /**
   * Verifica se o campo da tabela é um array
   * @param obj 
   */
  public verifyIfItsToCount(obj) {
    return obj === 'patients';
    
  }

  /**
   * Verifica o campo da tabela e define um tamanho para a coluna
   * 
   * @param field 
   * 
   */
  public tdWidth(field: string): string {
    let width: string = '20%';

    if(field === 'id') width = '7.5%';

    return width;
  }


  private loadData() {

    this.shareData.activateLoadingScreen(true)

    this.resource[this.resourceFunction ? this.resourceFunction : 'query'](this.filterCriteria.params ? this.filterCriteria.params : '')
      .subscribe(
        (res) => {
          this.shareData.activateLoadingScreen(false)
          if(res.data) this.tableData = res.data;
          else if(res.meta && res.meta.pagination) this.pagination = res.meta.pagination;
          else this.tableData = res;



      },
      () => {
        this.shareData.activateLoadingScreen(false)

      });
  }



  public addFilters(search: string): void {
    this.filterCriteria.addParam('search', search);
    this.loadData();
  }

  public changeSort(tableHead): void {
    
    if(this.sortedByHeader && this.sortedByHeader.value !== tableHead.value) {
      this.sortedByHeader.sorted = null; 
      this.sortChanges = 0;
    }

    if(this.sortedByHeader && this.sortedByHeader.value === tableHead.value || !tableHead.sorted) this.sortChanges += 1;

    this.sortedByHeader = tableHead;

    if(this.sortChanges === 3){
      tableHead.sorted = null;
      this.filterCriteria.updateParam('orderBy', 'id')
      this.filterCriteria.updateParam('sortedBy', 'desc');
      this.sortChanges = 0;
    }else{
      tableHead.sorted = tableHead.sorted === 'asc' ? 'desc' : 'asc';
      this.filterCriteria.updateParam('orderBy', tableHead.value) //tableHead.value.toString().replace(',', '.')
      this.filterCriteria.updateParam('sortedBy', this.filterCriteria.params.sortedBy === 'asc' ? 'desc' : 'asc' );
    }  

    this.loadData();
  }
  

  /**
   * Recebe a ação, o id e o index na tabela do objeto para enviar ao component pai
   * @param action 
   */
  public emitButtonAction (action: string, rowObjId: number, rowIndex: number): void {
    const emitActionAndId = {action, rowObjId};
    
    if(action === 'delete-action' && this.tableData[rowIndex]) {
      this.tableData = this.tableData.filter((data) => {return this.tableData.indexOf(data) !== rowIndex});
    }
    
    this.actionButtonEmitter.emit(emitActionAndId);

  }










  



}

