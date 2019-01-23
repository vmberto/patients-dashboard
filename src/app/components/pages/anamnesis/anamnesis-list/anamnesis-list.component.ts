import { AnamnesisService, ShareDataService } from 'src/app/services';
import { FilterCriteria } from 'src/app/utils/crud/filter-criteria';
import { ListComponent } from 'src/app/utils/crud/list-components.utils';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collapse } from 'src/app/utils/animations/animations';
import saveAs from 'node_modules/file-saver';

@Component({
  selector: 'app-anamnesis-list',
  templateUrl: './anamnesis-list.component.html',
  styleUrls: ['./anamnesis-list.component.css'],
  animations: [collapse]
})
export class AnamnesisListComponent extends ListComponent implements OnInit {

  public creatingAnamnesis: boolean;

  constructor(private anamnesisService: AnamnesisService,
    private shareData: ShareDataService,
    private router: Router) {
    super();
    this.filterCriteria = new FilterCriteria();
    this.resource = this.anamnesisService;
    this.shareDataService = this.shareData;
  }

  ngOnInit() {
    this.filterCriteria.addListParams();
    this.loadData();
  }

  public create(newAnamnesis) {
    if (newAnamnesis) {
      this.creatingAnamnesis = true;
      this.anamnesisService.post({ name: newAnamnesis }).subscribe(res => {
        this.creatingAnamnesis = false;
        this.router.navigate([`home/anamnesis/edit/${res.new_anamnesis.id}`]);
      });
    }
  }

  /**
 * Direciona para a rota de detalhes da anamnese
 * @param id (number)
 */
  public edit(id: number) {
    this.router.navigate([`home/anamnesis/edit/${id}`]);
  }

  /**
 * Direciona para a rota de detalhes da anamnese
 * @param id (number)
 */
  public download(anamnesis: any) {

    anamnesis.downloading = true;

    this.anamnesisService.downloadAnamnesis(anamnesis.id)
    .then((res) => {
        const file = new Blob([res], {type: 'application/pdf'});
        const anamnesisName = anamnesis.name.toLowerCase().split(' ').join('-');
        const filename = `anamnese-${anamnesisName}.pdf`;

        saveAs(file, filename);
        anamnesis.downloading = false;
    })
    .catch((err) => {
        anamnesis.downloading = false;
        console.log(err);
    });

  }

}
