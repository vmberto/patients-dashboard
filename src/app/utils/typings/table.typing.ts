export interface TableHeaders {
    title: string;
    value: string;
    sortable: boolean;
}

export interface TableMetaData {
    filterConfig: any[];
    paginationConfig: PaginationConfig;
}

export interface PaginationConfig {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
}

