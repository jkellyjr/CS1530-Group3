""" Alex Patton's chat application """

import os
from flask import Flask, request, abort, url_for, redirect, session, render_template, g, flash
from models import db, User, Room, Message
import datetime
import json

app = Flask(__name__)

app.config.update(dict(SQLALCHEMY_DATABASE_URI="sqlite:///"+os.path.join(app.root_path, "chat.db")))

db.init_app(app)

@app.cli.command("initdb")
def initdb_command():
    """ Initialize the database """
    db.drop_all()
    db.create_all()
    print('Initialized the database.')

@app.before_request
def before_request():
    """ Check for a user signed in before requests """
    g.user = None
    if 'user_id' in session:
        g.user = User.query.filter_by(user_id=session['user_id']).first()

@app.route("/")
def root_page():
    """ Redirect root to login """
    session.clear()
    return redirect(url_for("login"))

@app.route("/login/", methods=["GET", "POST"])
def login():
    """ Login page """
    error = None
    if g.user is not None:
        return redirect(url_for("rooms"))
    elif request.method == "POST":
        username = request.form["user"]
        user = User.query.filter_by(username=username).first()
        if user is None or user.password != request.form["pass"]:
            error = "We could not find an account matching that username & password."
        else:
            session["user_id"] = user.user_id
            return redirect(url_for("rooms"))
    return render_template("login.html", error=error)

@app.route("/register/", methods=["GET", "POST"])
def register():
    """ Register a new user """
    error = None
    if g.user is not None:
        return redirect(url_for("rooms"))
    elif request.method == "POST":
        username = request.form["user"]
        password = request.form["pass"]
        if username is None:
            error = "You must enter a username."
        elif password is None:
            error = "You must enter a password."
        elif User.query.filter_by(username=username).first() is not None:
            error = "That username is already taken."
        else:
            db.session.add(User(username, password))
            db.session.commit()
            flash("Registration successful! Please log in now.")
            return redirect(url_for("login"))
        
    return render_template("register.html", error=error)

@app.route("/logout/", methods=["GET"])
def logout():
    session["user_id"] = None
    session["active_room"] = None
    return redirect(url_for("login"))

@app.route("/rooms/", methods=["GET"])
def rooms():
    """ Show list of chat rooms """
    if g.user is None:
        return redirect(url_for("login"))
    all_rooms = Room.query.all()
    session["active_room"] = None
    return render_template("rooms.html", rooms = all_rooms, user_id = g.user.user_id, username = g.user.username)

@app.route("/createRoom/", methods=["GET", "POST"])
def new_room():
    """ Create a new chat room """
    error = None
    if g.user is None:
        return redirect(url_for("login"))
    elif request.method == "POST":
        room_name = request.form["roomName"]
        if room_name is None:
            error = "You must enter a name for the chat room."
        else:
            db.session.add(Room(name=room_name, user_id=g.user.user_id))
            db.session.commit()
            return redirect(url_for("rooms"))
    return render_template("create_room.html", error=error, username = g.user.username)

@app.route("/room/<room_id>", methods=["GET"])
def room(room_id = None):
    """ Show chat room """
    if g.user is None:
        return redirect(url_for("login"))
    # if session["active_room"] != room_id:
    #     flash("You cannot be in two chat rooms at the same time!")
    #     return redirect(url_for("rooms"))
    open_room = Room.query.filter_by(room_id=room_id).first()
    if open_room is None:
        abort(404)
    session["active_room"] = room_id
    return render_template("room.html", room=open_room, username = g.user.username)

@app.route("/messages/", methods=["GET", "POST"])
def messages(room_id = None, last_accessed = None):
    """ Get messages for a chat room or post a new one """
    room_id = request.args.get("room_id")
    last_accessed = request.args.get("last_accessed")
    if g.user is None:
        abort(401)
    if room_id is None:
        abort(400)
    if room_id != session["active_room"]:
        abort(403)
    room = Room.query.filter_by(room_id=room_id).first()
    if room is None:
        abort(404)
    if request.method == "GET":
        messages = None
        if last_accessed is None:
            messages = room.messages
        else:
            messages = db.session.query(Message).filter(Message.msg_id > last_accessed)
        if messages is None:
            return ""
        msg_dicts = []
        for m in messages:
            d = m.__dict__
            d['username'] = m.sender.username
            d['_sa_instance_state'] = None
            d['sender'] = None
            msg_dicts.append(m.__dict__)

        return json.dumps(msg_dicts)
    if request.method == "POST":
        msg = request.form["text"]
        if msg is None:
            abort(400)
        db.session.add(Message(content=msg, sender_id=g.user.user_id, room_id=room.room_id))
        db.session.commit()
        return "All good!"
    
    

@app.route("/room/<room_id>/delete", methods=["GET", "POST"])
def delete_room(room_id = None):
    """ Delete chat room """
    if g.user is None:
        return redirect(url_for("login"))
    room = Room.query.filter_by(room_id=room_id).first()
    if room is None:
        abort(404)
    if room.creator_id != session["user_id"]:
        flash("You are not authorized to delete this chat room.")
        return redirect(url_for("rooms"))
    if request.method == "POST":
        db.session.delete(room)
        db.session.commit()
        flash("Your chat room was successfully deleted.")
        return redirect(url_for("rooms"))
    return render_template("delete_room.html", room=room, username=g.user.username)

class MsgEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__

app.secret_key = "hail2pitt"

if __name__ == "__main__":
	app.run(host="0.0.0.0", debug = True, threaded=True)