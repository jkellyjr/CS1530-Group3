
export class Meeting {
  id:number;
  name:string;
  meeting_time:Date;
  location:string;
  student_id:number;
  group_id:number;
  tutor_id:number;
}

// id = db.Column(db.Integer, unique = True, primary_key = True)
// name = db.Column(db.String(50), nullable = False)
// meeting_time = db.Column(db.DateTime, nullable = False)
// location = db.Column(db.String(50), nullable = True)
//
// student_id = db.Column(db.Integer, db.ForeignKey('user.id'))
// group_id = db.Column(db.Integer, db.ForeignKey('study_group.id'))
// tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'))
