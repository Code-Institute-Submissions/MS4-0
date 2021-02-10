import os
import requests
import json
from flask import Flask, flash, render_template, redirect, request, session, url_for, jsonify
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
  import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)

@app.route("/")
@app.route("/dashboard")
def dashboard():
  return render_template("dashboard.html")


@app.route("/registration", methods=["GET", "POST"])
def registration():
  if request.method == "POST":
    existing_user = mongo.db.users.find_one({"email": request.form.get("email")})

    if existing_user:
      flash("User already exists")
      return redirect(url_for("registration"))
      
    registration = {
      "email": request.form.get("email"),
      "password": generate_password_hash(request.form.get("password1")),
      "first_name": request.form.get("fname"),
      "last_name": request.form.get("lname"),
      "company_name": request.form.get("cname"),
      "user_type": "user"
    }
    mongo.db.users.insert_one(registration)

    session["user"] = request.form.get("email")
    flash("Registration Successful!")
    return redirect(url_for("profile", username=session["user"]))
  return render_template("registration.html")


@app.route("/login", methods=["GET", "POST"])
def login():
  if request.method == "POST":
    # check if username exists in db
    existing_user = mongo.db.users.find_one({"email": request.form.get("email")})

    if existing_user:
      # ensure hashed password matches user input
      if check_password_hash(
        existing_user["password"], request.form.get("password1")):
          session["user"] = request.form.get("email")
          flash("Welcome, {}".format(existing_user["first_name"]))
          return redirect(url_for(
            "profile", username=session["user"]))
      else:
        # invalid password match
        flash("Incorrect Email and / or Password")
        return redirect(url_for("login"))

    else:
      # username doesn't exist
      flash("Incorrect Username and/or Password")
      return redirect(url_for("login"))

  return render_template("login.html")


@app.route("/profile/<username>")
def profile(username):
  # grab the sessions user's username from db
  username = mongo.db.users.find_one(
    {"email": session["user"]})["first_name"]

  if session["user"]:
    return render_template("profile.html", username=username)

  return redirect(url_for("login"))


@app.route("/logout")
def logout():
  # remove user session from cookies
  flash("You have been logged out")
  session.pop("user")
  return redirect(url_for("login"))


@app.route("/register")
def register():
  register = mongo.db.register.find()
  return render_template("register.html", register=register)





@app.route("/filter", methods=["GET", "POST"])
def get_filter():
  db = mongo.db.register

  pipeline = [{
              '$group': {
                  '_id': {
                    'stat': '$status',
                    'changeType': '$change_type'
                  },
                  'data': {
                    '$push': {
                      'totalGross' : {'$sum': '$cost_gross'},
                      'totalNett' : {'$sum': '$cost_nett'},
                      'totalGIA' : {'$sum': '$GIA_ft2'}
                      }
                    }
                  }
                }, {
                '$group': {
                  '_id': '$_id.stat',
                  'change': {
                    '$push': {
                      'status': '$_id.stat',
                      'changeType': '$_id.changeType',
                      'data': '$data'
                      }
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0,
                    'status': '$_id',
                    'changeType': {
                      '$arrayToObject': {
                        "$map": {
                            "input": "$change",
                            "as": "el",
                            "in": {
                                "k": "$$el.changeType",
                                "v": { "$arrayElemAt": ["$$el.data", 0] }
                            }
                        }
                      }
                  }
                }
              }]

  arr = list(db.aggregate(pipeline))

  return jsonify(arr)


@app.route("/budget", methods=["GET", "POST"])
def budget():
  if request.method == "POST":
    update = {
      "date_modified": request.form.get("date_modified"),
      "cost_nett": request.form.get("budget_cost_nett", type=int),
      "cost_gross": request.form.get("budget_cost_gross", type=int),
      "cont_design_total": request.form.get("budget_cont_design_total", type=int),
      "cont_const_total": request.form.get("budget_cont_const_total", type=int),
      "prelims_total": request.form.get("budget_prelims_total", type=int),
      "ohp_total": request.form.get("budget_ohp_total", type=int),
      "NIA_ft2": request.form.get("budget_NIA_ft2", type=int),
      "GIA_ft2": request.form.get("budget_GIA_ft2", type=int)
    }
    mongo.db.budget.update({"_id": ObjectId("6022ed6805fc505f69844c36")}, update)
    return redirect(url_for('dashboard'))

  budget = mongo.db.budget.find_one()

  return render_template("budget.html", budget=budget)


@app.route("/add_change", methods=["GET", "POST"])
def add_change():
  if request.method == "POST":
    change = {
      "change_nr": request.form.get("change_nr"),
      "date_added": request.form.get("date_added"),
      "date_changed": request.form.get("date_changed"),
      "change_name": request.form.get("change_name"),
      "change_description": request.form.get("change_description"),
      "status": request.form.get("status"),
      "change_type": request.form.get("change_type"),
      "cost_nett": request.form.get("cost_nett", type=int),
      "cost_gross": request.form.get("cost_gross", type=int),
      "cont_design_total": request.form.get("cont_design_total", type=int),
      "cont_const_total": request.form.get("cont_const_total", type=int),
      "prelims_total": request.form.get("prelims_total", type=int),
      "ohp_total": request.form.get("ohp_total", type=int),
      "NIA_ft2": request.form.get("NIA_ft2", type=int),
      "GIA_ft2": request.form.get("GIA_ft2", type=int)    }
    mongo.db.register.insert_one(change)
    return redirect(url_for('register'))
  return render_template("add_change.html")


@app.route("/edit_change/<change_id>", methods=["GET", "POST"])
def edit_change(change_id):
  if request.method == "POST":
    submit = {
      "change_nr": request.form.get("change_nr"),
      "date_added": request.form.get("date_added"),
      "date_changed": request.form.get("date_changed"),
      "change_name": request.form.get("change_name"),
      "change_description": request.form.get("change_description"),
      "status": request.form.get("status"),
      "change_type": request.form.get("change_type"),
      "cost_nett": request.form.get("cost_nett", type=int),
      "cost_gross": request.form.get("cost_gross", type=int),
      "cont_design_total": request.form.get("cont_design_total", type=int),
      "cont_const_total": request.form.get("cont_const_total", type=int),
      "prelims_total": request.form.get("prelims_total", type=int),
      "ohp_total": request.form.get("ohp_total", type=int),
      "NIA_ft2": request.form.get("NIA_ft2", type=int),
      "GIA_ft2": request.form.get("GIA_ft2", type=int)
    }
    mongo.db.register.update({"_id": ObjectId(change_id)}, submit)
    return redirect(url_for('register'))

  status = mongo.db.status.find()
  change_type = mongo.db.change_type.find()
  change = mongo.db.register.find_one({"_id": ObjectId(change_id)})

  return render_template("edit_change.html", change=change, status=status, change_type=change_type)


@app.route("/delete_change/<change_id>")
def delete_change(change_id):
  mongo.db.register.remove({"_id": ObjectId(change_id)})
  return redirect(url_for("register"))


if __name__ == "__main__":
  app.run(host=os.environ.get("IP"),
    port=int(os.environ.get("PORT")),
    debug=True)
