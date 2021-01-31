import os
import requests
import json
from flask import Flask, flash, render_template, redirect, request, session, url_for, jsonify
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
from bson.json_util import dumps
if os.path.exists("env.py"):
  import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)

@app.route("/")
@app.route("/dashboard")
def get_dashboard():
  return render_template("dashboard.html")


@app.route("/register")
def get_register():
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


  # pipeline = [{
  #             '$group': {
  #                 '_id': {
  #                   'changeType': '$change_type'
  #                 },
  #                 'data': {
  #                   '$push': {
  #                     'totalGross' : {'$sum': '$cost_gross'},
  #                     'totalNett' : {'$sum': '$cost_nett'},
  #                     'totalGIA' : {'$sum': '$GIA_ft2'}
  #                     }
  #                   }
  #                 }
  #               }, {
  #               '$group': {
  #                 '_id': 'null',
  #                 'change': {
  #                   '$push': {
  #                     'changeTypes': '$_id.changeType',
  #                     'data': '$data'
  #                     }
  #                   }
  #                 }
  #               }, {
  #                 '$project': {
  #                   '_id': 0,
  #                   'array': {
  #                     '$arrayToObject': {
  #                       '$map': {
  #                         'input': '$change',
  #                         'as': 'el',
  #                         'in': {
  #                           'k': '$$el.changeTypes',
  #                           'v': { "$arrayElemAt": ["$$el.data", 0] }
  #                           }
  #                         }
  #                       }
  #                     }
  #                   }
  #             }]

  arr = list(db.aggregate(pipeline))

  return jsonify(arr)


@app.route("/item", methods=["GET", "POST"])
def add_item():
  if request.method == "POST":
    item = {
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
    mongo.db.register.insert_one(item)
  # item = mongo.db.register.find()
  return render_template("item.html")


if __name__ == "__main__":
  app.run(host=os.environ.get("IP"),
    port=int(os.environ.get("PORT")),
    debug=True)
