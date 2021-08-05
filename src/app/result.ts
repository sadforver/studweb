export interface Result<T>{
    code:number;
    message:string;
    data:any[T];
}
export interface checkres{
    code:number;
    message:string;
    count:number;
}