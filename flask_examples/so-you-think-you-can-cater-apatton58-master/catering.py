from flask import Flask, request, abort, url_for, redirect, session, render_template, g, flash
from models import db, User, Event, Signup
import os, datetime

app = Flask(__name__)

app.config.update(dict( 
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(app.root_path, "catering.db")
))

db.init_app(app)

@app.cli.command("initdb")
def initdb_command():
    db.drop_all()
    db.create_all()
    db.session.add(User("owner","owner","pass"))
    db.session.commit()
    print('Initialized the database.')

@app.before_request
def before_request():
	g.user = None
	if 'user_id' in session:
		g.user = User.query.filter_by(user_id=session['user_id']).first()

@app.route("/")
def rootPage():
    return redirect(url_for("login"))

@app.route("/login/", methods=["GET", "POST"])
def login():
    error = None
    if g.user is not None:
        return redirect(url_for("home", userType=g.user.userType))
    
    elif request.method == "POST":
        uNameIn = request.form["user"]
        user = User.query.filter_by(userName=uNameIn).first()
        if user is None or user.password != request.form["pass"]:
            error = "We could not find an account matching that username & password."
        else:
            session["user_id"] = user.user_id
            return redirect(url_for("home", userType=user.userType))

    return render_template("login.html", error = error)

@app.route("/logout/", methods=["GET"])
def logout():
    session["user_id"] = None
    return redirect(url_for("login"))

@app.route("/register/customer/", methods=["GET", "POST"])
def registerCustomer():
    error = None
    if g.user is not None:
        return redirect(url_for("rootPage"))
    
    elif request.method == "POST":
        uNameIn = request.form["user"]
        passIn = request.form["pass"]
        if uNameIn is None:
            error = "You must enter a username."
        elif passIn is None:
            error = "You must enter a password."
        elif User.query.filter_by(userName=uNameIn).first() is not None:
            error = "That username is already taken."
        else:
            db.session.add(User(uNameIn, "customer", passIn))
            db.session.commit()
            flash("Registration Successful! Please log in now.")
            return redirect(url_for("login"))
    
    return render_template("register.html", type = "Customer", error = error)

@app.route("/register/staff/", methods=["GET", "POST"])
def registerStaff():
    error = None
    if g.user is None or g.user.userType != "owner":
        return redirect(url_for("rootPage"))
    
    elif request.method == "POST":
        uNameIn = request.form["user"]
        passIn = request.form["pass"]
        if uNameIn is None:
            error = "You must enter a username."
        elif passIn is None:
            error = "You must enter a password."
        elif User.query.filter_by(userName=uNameIn).first() is not None:
            error = "That username is already taken."
        else:
            db.session.add(User(uNameIn, "staff", passIn))
            db.session.commit()
            flash("Registration Successful!")
            return redirect(url_for("home", userType="owner"))
    
    return render_template("register.html", type = "Staff", error = error)

@app.route("/home/")
@app.route("/home/<userType>/", methods=["GET", "POST"])
def home(userType=None):
    error = None
    if not userType:
        if g.user is not None:
            return redirect(url_for("home", userType=g.user.userType))
        
        return redirect(url_for("login"))
    
    if g.user is not None:
        if userType  == g.user.userType:
            if userType == "owner":
                events = db.session.query(Event).filter(Event.date >= datetime.datetime.today())
                return render_template("owner_home.html", userName = g.user.userName, events = events)
            elif userType == "staff":
                signups = db.session.query(Signup).filter(Event.date >= datetime.datetime.today(), Signup.staff_id == g.user.user_id)
                events = db.session.query(Event).filter(Event.date >= datetime.datetime.today()).all()
                removals = []
                for e in events:
                    for s in e.signups:
                        if s.staff_id == g.user.user_id:
                            removals.append(e)
                for r in removals:
                    events.remove(r)
                return render_template("staff_home.html", userName = g.user.userName, signups = signups, events = events)
            elif userType == "customer":
                events = db.session.query(Event).filter(Event.customer_id == g.user.user_id, Event.date >= datetime.datetime.today());
                if request.method == "POST":
                    titleIn = request.form["title"]
                    dateIn = datetime.datetime.strptime(request.form["date"], "%Y-%m-%d").date()
                    if titleIn is None:
                        error = "You must enter a title."
                    elif dateIn is None:
                        error = "You must choose a date."
                    elif Event.query.filter_by(date=dateIn).first() is not None:
                        error = "We're very sorry, but we already have an event scheduled for that day. Please select a different date."
                    else:
                        db.session.add(Event(titleIn, dateIn, g.user.user_id))
                        db.session.commit()
                        flash("You've successfully booked your event!")
                        
                return render_template("customer_home.html", userName = g.user.userName, events = events, error = error)
            else:
                abort(404)
    
    return redirect(url_for("login"))

@app.route("/event/<event_id>/delete", methods=["GET"])
def deleteEvent(event_id = None):
    if event_id is None:
        abort(404)
    ev = Event.query.filter_by(event_id = event_id).first()
    if ev is None:
        abort(404)
    if g.user is None:
        return redirect(url_for("login"))
    if ev.customer_id != g.user.user_id:
        flash("You are not authorized to access this event.")
        return redirect(url_for("home"))

    db.session.delete(ev)
    db.session.commit()
    flash("Your event was successfully cancelled.")
    return redirect(url_for("home", userType = "customer"))

@app.route("/event/<event_id>/signup")
def signup(event_id = None):
    if event_id is None:
        abort(404)
    ev = Event.query.filter_by(event_id = event_id).first()
    if ev is None:
        abort(404)
    if g.user is None:
        return redirect(url_for("login"))
    if g.user.userType != "staff":
        flash("Only registered staff can sign up to work an event!")
        return redirect(url_for("home"))
    if len(ev.signups) > 2:
        flash("This event already has 3 staff members working!")
        return redirect(url_for("home"))
    for s in ev.signups:
        if (s.staff_id == g.user.user_id):
            flash("You are already signed up to work this event!")
            return redirect(url_for("home"))

    db.session.add(Signup(g.user.user_id, event_id))
    db.session.commit()
    return redirect(url_for("home"))

app.secret_key = "hail2pitt"

if __name__ == "__main__":
	app.run()
    
