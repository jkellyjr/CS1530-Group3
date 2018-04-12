export class RequestContact {
  constructor(
    public id:number,
    public tutor_id: number,
    public student_id: number,
    public requestor_id: number,
    public approved: boolean,
    public message: string,
    public requested_name: string,
    public requestor_name: string
  ) { }
}
