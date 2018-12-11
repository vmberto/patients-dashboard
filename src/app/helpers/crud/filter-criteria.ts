export class FilterCriteria {
    private _params: Object = {} as Object;

    get params (){ 
        return this._params;
    }



    
    /**
     * @param paramName
     * @param value
     */
    public addParam(paramName: string, value: any): void{
        this._params[paramName] = value;
    }

    public removeParam(paramName: string): void {
        delete this._params[paramName];
        
    }
    

    public addListParams(): void {
        this.addParam('limit', 15);
        this.addParam('page', 1);
        this.addParam('sortedBy', 'asc');
        this.addParam('orderBy', 'id');
    
    }



    
}