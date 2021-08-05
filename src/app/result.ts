export interface Result<T>{
    code:number;
    message:string;
    data:any[T];
    

}