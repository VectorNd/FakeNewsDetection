from flask import Flask, render_template, request, jsonify, redirect 
import nltk 
import pickle
import numpy as np  
from nltk.corpus import stopwords 
import re
import os
from nltk.stem.porter import PorterStemmer 
import csv
import newsfetch as nft 
import model as model 
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# Build functionalities
@app.route('/', methods=['GET'])
# @cross_origin(supports_credentials=True)
def home():
    return render_template('index.html')

def predict(url):
    article_dict = nft.extract_article(url) 
    prediction = model.get_prediction(article_dict)
    return prediction 

@app.route('/', methods=['POST'])
# @cross_origin(supports_credentials=True)
def webapp():
    body = request.get_json()
    url = body['URL']
    print(f"url : {url}")
    
    prediction = predict(url)
    article_dict = nft.extract_article(url)
    title = article_dict['title']
    content = article_dict['text']
    date = article_dict['date']
    image = article_dict['image']
    print(f"prediction : {prediction}")

    probability = f"{prediction['real_prob']*100:.2f}%"
    result = prediction['prediction']

    return jsonify(result = result,real_prob = f"{prediction['real_prob']}",fake_prob = f"{prediction['fake_prob']}",
                   title = title , content = content , date = date , image = image )

# @app.route('/predict/', methods=['GET','POST'])
# def api():
#     url = request.args.get("URL")
#     prediction = predict(url)
#     return jsonify(prediction=prediction)

@app.route('/feedback', methods=['POST'])
# @cross_origin(supports_credentials=True)
def handle_feedback():
  feedback = request.json['feedback']
  url = request.json['URL']
  
  with open('feedback.csv', mode='a', newline='') as feedback_file:
    feedback_writer = csv.writer(feedback_file)
    feedback_writer.writerow([url, int(feedback == 'real')])
  
  return jsonify(result = "done")

if __name__ == "__main__":
    app.run()