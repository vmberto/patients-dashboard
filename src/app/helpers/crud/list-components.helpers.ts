import { subscribeOn } from 'rxjs/operators';
import { ShareDataService } from './../../services/share-data/share-data.service';
import { FilterCriteria } from 'src/app/helpers/crud/filter-criteria';
import { MatPaginator, PageEvent } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';


export class ListComponent {

    @ViewChild(MatPaginator) pagination: MatPaginator;

    protected resource;
    protected resourceFunction;
    protected filterCriteria;
    protected shareDataService;

    protected tableData;
    protected tableHeaders;
    protected tableMetaData;

    private sortedByHeader;
    private sortChanges = 0;


    // Pagination
    public status: string;
    public length: number;
    public pageSize = 12;
    public page = 1;
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50];
    public searchableFields: string[];
    public pageEvent: PageEvent;


    public constructor() { }



    /**
     * Adicionar comentário
     */
    loadData(): Observable<any> {

        this.shareDataService.activateLoadingScreen(true);

        return this.resource[this.resourceFunction ? this.resourceFunction : 'query'](this.filterCriteria.params ? this.filterCriteria.params : {}).subscribe(
            (res) => {
                if (res.data) this.tableData = res.data;
                if (res.meta) this.tableMetaData = res.meta;
                this.shareDataService.activateLoadingScreen(false);


            },
            () => {
                this.shareDataService.activateLoadingScreen(false);
            }
        );

    }

    public changeSort(tableHead): void {

        if (this.sortedByHeader && this.sortedByHeader.value !== tableHead.value) {
            this.sortedByHeader.sorted = null;
            this.sortChanges = 0;
        }

        if (this.sortedByHeader && this.sortedByHeader.value === tableHead.value || !tableHead.sorted) this.sortChanges += 1;

        this.sortedByHeader = tableHead;

        if (this.sortChanges === 3) {
            tableHead.sorted = null;
            this.filterCriteria.addParam('orderBy', 'id');
            this.filterCriteria.addParam('sortedBy', 'desc');
            this.sortChanges = 0;
        } else {
            tableHead.sorted = tableHead.sorted === 'asc' ? 'desc' : 'asc';
            this.filterCriteria.addParam('orderBy', tableHead.value); // tableHead.value.toString().replace(',', '.')
            this.filterCriteria.addParam('sortedBy', this.filterCriteria.params.sortedBy === 'asc' ? 'desc' : 'asc');
        }

        this.loadData();
    }
}
