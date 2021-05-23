export interface PageVO {
    sort: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    changedQuery: Boolean,

    filterForm?: any;
    totalElements?: number;
    content?: any,
}