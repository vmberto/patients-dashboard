import { FormGroup, FormBuilder } from '@angular/forms';
import { ShareDataService, PatientsService } from 'src/app/services';
import { FilterCriteria } from 'src/app/utils/crud/filter-criteria';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListComponent } from 'src/app/utils/crud/list-components.utils';

@Component({
  selector: 'app-test',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent extends ListComponent implements OnInit {

  public filterForm: FormGroup;
  public clearFiltersBtn: boolean;
  public currentListStatus: number;


  public filtersFormOpen: 'open' | 'close' = 'close';

  public selectedSize = 15;

  public tableHeaders = [
    { title: '#', value: 'id', sortable: true },
    { title: 'Nome', value: 'name', sortable: true },
    { title: 'Plano', value: 'health_insurance', sortable: true },
    { title: 'Contato', value: 'contact', sortable: false },
    { title: 'Criado', value: 'created_at', sortable: true }
  ];

  public TABS = [
    { title: 'Ativos',   value: 1 },
    { title: 'Inativos', value: 2 },
    { title: 'De Alta',  value: 3 },
  ];

  constructor(private patientsService: PatientsService,
    private shareData: ShareDataService,
    private router: Router) {
    super();

    this.filterCriteria = new FilterCriteria();
    this.resource = this.patientsService;
    this.shareDataService = this.shareData;
  }

  ngOnInit() {

    this.filterCriteria.addListParams();
    this.filterCriteria.addParam('patient_status', 1);
    this.currentListStatus = 1;

    this.loadData();
  }

  public submitFilters(filters) {

    const filterStringArray = [];
    let countFilters = 0;

    filters.forEach(filter => {
      if (filter[Object.keys(filter)[0]]) {
        this.filterCriteria.addParam(Object.keys(filter)[0], filter[Object.keys(filter)[0]]);

        filterStringArray.push(filter[Object.keys(filter)[0]]);

        countFilters += 1;
      } else {
        this.filterCriteria.removeParam(Object.keys(filter)[0]);
      }
    });

    if (countFilters > 0) this.clearFiltersBtn = true;
    else this.clearFiltersBtn = false;

    this.loadData();

  }

  public clearFilters() {
    this.filterCriteria.clearParams();
    this.filterCriteria.addListParams();

    this.filterForm.reset();

    this.clearFiltersBtn = false;

    this.loadData();
  }

  public limitChange(newLimit) {
    this.selectedSize = newLimit;
    this.filterCriteria.addParam('limit', newLimit);
    this.loadData();

  }

  public paginationChange(newPage) {
    this.filterCriteria.addParam('page', newPage);
    this.loadData();
  }


  changeListStatus(status): void {
    if (this.currentListStatus !== status) {
      this.currentListStatus = status;
      switch (status) {
        case 1: this.filterCriteria.addParam('patient_status', 1); break;
        case 2: this.filterCriteria.addParam('patient_status', 2); break;
        case 3: this.filterCriteria.addParam('patient_status', 3); break;
      }

      this.loadData();
    }
  }

  changeFiltersModalState(state) {
    this.filtersFormOpen = state;
  }

  /**
   * Direciona para a rota de detalhes do paciente
   * @param id (number)
   */
  public show(id: number) {
    this.router.navigate([`home/patients/show/${id}`]);
  }

  /**
   * Exclui um paciente
   * @param id (number)
   */
  public delete(id: number) {
    this.patientsService.delete(id).subscribe(
      () => {
        this.loadData();

      }
    );
  }

}
