
export class Course {
  id:number;
  name:string;
  description:string;
  subj_code:string;
  course_num:number;
}

// id = db.Column(db.Integer, unique = True, primary_key = True)
// name = db.Column(db.String(30), nullable = False)
// description = db.Column(db.String(80), nullable = True)
// subj_code = db.Column(db.String(10), nullable = False)
// course_num = db.Column(db.Integer, nullable = False)
//
// course_tutor = db.relationship('Tutor', backref = db.backref('course', lazy = True))
