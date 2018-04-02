from werkzeug.security import generate_password_hash
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:5000/be'
db = SQLAlchemy(app)



from .models import User, Group, Tutor, Course, Meeting





@app.cli.command('initdb')
def initdb_command():
    """Reinitializes the database"""
    db.drop_all()
    db.create_all()

    user1 = User('Bob', 'Smith', 'a@gmail.com', '1111111111', generate_password_hash('123'), 'patient')
    user2 = User('Carol', 'Stevens', 'b@gmail.com', '1111111111', generate_password_hash('123'), 'therapist')
    user3 = User('Anna','Martin','c@gmail.com','1111111111', generate_password_hash('123'),'patient')
    user4 = User('Daniel','Rutgers','d@gmail.com','1111111111', generate_password_hash('123'),'patient')
    user5 = User('Frank','Lorris','e@gmail.com','1111111111', generate_password_hash('123'),'patient')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.commit()

    group1 = Group('tits', 'fuck bitches get money', user1.id)
    group2 = Group('five0', 'fun fun fun', user1.id)
    db.session.add(group1)
    db.session.add(group2)
    db.session.commit()

    user2.groups.append(group1)
    user5.groups.append(group1)
    db.session.add(user2)
    db.session.add(user5)
    db.session.commit()

    course1 = Course('course 1', 'this class sucks', 'CS', 1530)
    db.session.add(course1)
    db.session.commit()

    tutor1 =  Tutor(course1.id, user2.id)
    db.session.add(tutor1)
    db.session.commit()

    group1.group_courses.append(course1)
    db.session.add(group1)
    db.session.commit()

    meeting1 = Meeting( 'shalom', datetime.now(), 'yo bitches house', user1.id, None, tutor1.id)
    db.session.add(meeting1)
    db.session.commit()




    print('created all database')
