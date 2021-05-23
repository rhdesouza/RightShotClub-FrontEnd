export interface Auditable{
    createdBy?:string;
    createdDate?:string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
}