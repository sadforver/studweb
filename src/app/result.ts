import { NzTableFilterValue, NzTableSortOrder } from "ng-zorro-antd/table";

export interface Result<T>{
    code:number;
    message:string;
    data:[T];
    count:number;
}
export interface checkres{
    code:number;
    message:string;
    count:number;
}export interface searchTerm {
    pageIndex: number;
    pageSize: number;
    sortField: string;
    sortOrder: NzTableSortOrder;
    searchTerm:string;
    filter: Array<{
        key: string;
        value: NzTableFilterValue;
    }>;
    
}