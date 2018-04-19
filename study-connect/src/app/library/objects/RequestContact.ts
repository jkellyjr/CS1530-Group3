export class RequestContact {
  constructor(
    public id:number,
    public accepted: boolean,
    public message: string,
    public requestor_id: number,
    public requestor_role: string,
    public requestor_name: string,
    public requested_role: string,
    public requested_id: number,
    public requested_name: string
  ) { }
}
