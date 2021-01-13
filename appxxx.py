import os
from flask import Flask, render_template


app = Flask(__name__)

name = 'Roman'

app.route('/')
def homepage():
  return render_template("home.html", x=name)


app.run()
