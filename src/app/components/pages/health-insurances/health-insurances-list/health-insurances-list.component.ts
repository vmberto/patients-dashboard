import { showCreateInput } from 'src/app/utils/animations/animations';
import { ShareDataService, HealthInsurancesService } from 'src/app/services';
import { ListComponent } from 'src/app/utils/crud/list-components.utils';
import { FilterCriteria } from 'src/app/utils/crud/filter-criteria';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-insurances-list',
  templateUrl: './health-insurances-list.component.html',
  styleUrls: ['./health-insurances-list.component.css'],
  animations: [showCreateInput]
})
export class HealthInsurancesListComponent extends ListComponent implements OnInit {


  public createHealthInsurance: boolean;

  public healthInsurancesTableHeading = [
    { title: '#', value: 'id' },
    { title: 'Nome', value: 'name' },
    { title: 'Quantidade de Pacientes', value: 'patients' },
    { title: 'Criado em', value: 'created_at' },
    { title: 'Atualizado em', value: 'updated_at' }
  ];


  constructor(private healthInsurancesService: HealthInsurancesService, private shareData: ShareDataService) {
    super();
    this.filterCriteria = new FilterCriteria();
    this.resource = this.healthInsurancesService;
    this.shareDataService = this.shareData;
  }

  ngOnInit() {
    this.filterCriteria.addListParams();

    this.loadData();
  }




  public openCreateInput() {
    this.createHealthInsurance = !this.createHealthInsurance;
  }

  public create(newHealthInsurance) {
    if (newHealthInsurance) {
      this.resource.post({ name: newHealthInsurance }).subscribe(() => {
        this.loadData();
      });
    }
  }

  public delete(id) {
    this.resource.delete(id).subscribe(() => {
      this.loadData();
    });

  }


}
