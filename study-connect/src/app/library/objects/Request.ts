export class Request{
  constructor(
    public message: string,
    public requestor_id: number,
    public student_id: number,
    public tutor_id: number,
    public group_id:number
  ) { }
}
