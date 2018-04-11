export class RequestContact {
  constructor(
    private id:number,
    private tutor_id: number,
    private student_id: number,
    private group_id: number,
    private requestor_id: number,
    private message: string
  ) { }
}
