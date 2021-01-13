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
@app.route("/get_register")
def get_register():
  register = mongo.db.register.find()
  return render_template("register.html", register=register)


@app.route("/filter", methods=["GET", "POST"])
def get_filter():
  data = mongo.db.register.find()

  register = []
  for changes in data:
    change = {'changeNr' : changes['change_nr'],
              'changeName' : changes['change_name'],
              'dateAdded' : changes['date_added'],
              }
    register.append(change)

  # return render_template("filter.html", x=register)
  return jsonify(register)
  # data = requests.get("https://webhooks.mongodb-realm.com/api/client/v2.0/app/contrarolotumapi-dmxob/service/API/incoming_webhook/webhook0")
  # register = {}

  # register = []
  # data = list(mongo.db.register.find())
  # register = dumps(data, default=json_util.default)
  # register_dict = 
  # register = json.dumps([{'change': register_tmp['change_name']}])
  # return render_template("filter.html", x=register)
  # return register

  # if ideas:

		# list to hold ideas
    # public_ideas = []

		#prep data for json
    # for i in ideas:
    #   tmpIdea = {
		# 		# 'change nr' : ichange_nr,
		# 		i[change_name]
		# 	}

			# comments / our embedded documents
			# tmpIdea['comments'] = [] # list - will hold all comment dictionaries
			# loop through idea comments
			# for c in i.comments:
				# comment_dict = {
				# 	'name' : c.name,
				# 	'comment' : c.comment,
				# 	'timestamp' : str( c.timestamp )
				# }

				# # append comment_dict to ['comments']
				# tmpIdea['comments'].append(comment_dict)

			# insert idea dictionary into public_ideas list
      # public_ideas.append( tmpIdea )

		# prepare dictionary for JSON return
    # data = {
		# 	'status' : 'OK',
		# 	'ideas' : public_ideas
		# }

		# jsonify (imported from Flask above)
		# will convert 'data' dictionary and set mime type to 'application/json'
		# return jsonify(data)
    # return render_template("filter.html", x=register)
  # else:
  #   error = {
	# 		'status' : 'error',
	# 		'msg' : 'unable to retrieve ideas'
  #     }
  #   return jsonify(error)

  # for changes in data:
  #   register += {"changes": [changes['change_name']]}
  # register = list(data)
  # for changes in data:
  #   register = list(changes)
  # changeNames = list(data)
  # for doc in data:
  #   changeNames += ["Change Name" : ["change_name"]]

  # register = json.dumps(changeNames)
  # return render_template("filter.html", x=register)
  # return jsonify(register)


if __name__ == "__main__":
  app.run(host=os.environ.get("IP"),
    port=int(os.environ.get("PORT")),
    debug=True)
