import joblib  
import newsfetch as nft 
import torch.nn as nn
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def get_prediction(article_summary):
  # domain = article_dict.domain 
  content = article_summary['text']
  
  # content_without_stopwords = nft.text_without_stopwords(content) 
  # title_without_stopwords = nft.text_without_stopwords(title) 
  
  # x = domain + " " + title_without_stopwords + " " + content_without_stopwords   
  
  tokenizer = AutoTokenizer.from_pretrained("MYC007/Real-and-Fake-News-Detection")
  model = AutoModelForSequenceClassification.from_pretrained("MYC007/Real-and-Fake-News-Detection")
  
  encoded_input = tokenizer(content, truncation = True, padding = "max_length", max_length = 512, return_tensors='pt')
  output = model(**encoded_input)["logits"]
  
  detached_output = output.detach()
  
  softmax = nn.Softmax(dim = 1)
  prediction_probabilities = softmax(detached_output).detach().numpy()
  # tfidf_vect = joblib.load('checkpoints/tfvectorizer.joblib')
  # tfidf_x = tfidf_vect.transform([x]) 
  
  # model = joblib.load('checkpoints/rfc_trained_model.joblib')
  # proba = model.predict_proba(tfidf_x)
  # real_prob = proba[0][0] 
  # fake_prob = proba[0][1]
  
  # fake = model.predict(tfidf_x)[0] 
  
  print(prediction_probabilities)
  for x,y in prediction_probabilities:
    prediction = "Real" if x > y else "fake"
    
  print(prediction)
  
  return {'fake_prob' : prediction_probabilities[0][1], 'real_prob' : prediction_probabilities[0][0] , 'prediction' : prediction}

