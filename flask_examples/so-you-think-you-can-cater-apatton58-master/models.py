from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(80), unique=True, nullable=False)
    userType = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)

    customer_events = db.relationship("Event", backref="customer")
    staff_signups = db.relationship("Signup", backref="staff")

    def __init__(self, userName, userType, password):
        self.userName = userName
        self.userType = userType
        self.password = password

    def __repr__(self):
        return "<User {}>".format(self.userName)

class Event(db.Model):
    event_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable = False)
    date = db.Column(db.Date, unique=True, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)

    signups = db.relationship("Signup", backref="event")

    def __init__(self, title, date, customer_id):
        self.title = title
        self.date = date
        self.customer_id = customer_id

class Signup(db.Model):
    signup_id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("event.event_id"), nullable=False)

    def __init__(self, staff_id, event_id):
        self.staff_id = staff_id
        self.event_id = event_id

