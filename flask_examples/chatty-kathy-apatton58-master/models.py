""" Database models for chat application """
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class User(db.Model):
    """ User table """
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

    sent_messages = db.relationship("Message", backref="sender")

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return "<User {}>".format(self.username)

class Room(db.Model):
    """ Room table """
    room_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)

    messages = db.relationship("Message", backref="room")

    def __init__(self, name, user_id):
        self.name = name
        self.creator_id = user_id

class Message(db.Model):
    """ Message table """
    msg_id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    sender_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey("room.room_id"))

    def __init__(self, content, sender_id, room_id):
        self.content = content
        self.sender_id = sender_id
        self.room_id = room_id