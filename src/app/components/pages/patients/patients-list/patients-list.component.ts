import { FormGroup, FormBuilder } from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { PatientsService } from 'src/app/services/entities/patients.service.';
import { FilterCriteria } from 'src/app/helpers/crud/filter-criteria';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListComponent } from 'src/app/helpers/crud/list-components.helpers';

@Component({
  selector: 'app-test',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent extends ListComponent implements OnInit {

  public filterForm: FormGroup;
  public clearFiltersBtn: boolean;
  public selectedSize = 15;

  public tableHeaders = [
    { title: '#', value: 'id' },
    { title: 'Nome', value: 'name' },
    { title: 'Plano de Saúde', value: ['health_insurance', 'name'] },
    { title: 'Criada em', value: 'created_at' },
    { title: 'Atualizado em', value: 'updated_at' }
  ];

  // public tableRowActions = [
  //   { title: 'Ver Paciente', icon: 'fa-search', color: 'btn-primary', emits: 'show-action'},
  //   { title: 'Excluir Paciente', icon: 'fa-trash', color: 'btn-danger', emits: 'delete-action'}
  // ];

  constructor(private patientsService: PatientsService,
    private shareData: ShareDataService,
    private router: Router,
    private fb: FormBuilder) {
    super();
    this.filterCriteria = new FilterCriteria();
    this.resource = this.patientsService;
    this.shareDataService = this.shareData;




  }

  ngOnInit() {

    this.filterForm = this.fb.group({
      search: [''],
      health_insurance: ['']
    });

    this.filterCriteria.addListParams();
    this.loadData();

  }

  public submitFilters() {

    const controls = this.filterForm.controls;
    let countFilters = 0;

    if (controls.health_insurance.value) {
      this.filterCriteria.addParam('health_insurance', this.filterForm.controls.health_insurance.value);
      countFilters += 1;
    } else {
      this.filterCriteria.removeParam('health_insurance');
    }

    if (controls.search.value) {
      this.filterCriteria.addParam('search', this.filterForm.controls.search.value);
      countFilters += 1;

    } else {
      this.filterCriteria.removeParam('search');
    }

    if (countFilters > 0) this.clearFiltersBtn = true;
    else this.clearFiltersBtn = false;

    this.loadData();

  }

  public clearFilters() {
    this.filterCriteria.clearParams();
    this.filterCriteria.addListParams();

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
