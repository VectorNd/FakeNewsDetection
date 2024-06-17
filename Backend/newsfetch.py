from newspaper import Article 
from newspaper import Config 
from urllib.parse import urlparse 
import string 
import nltk 
from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize 

nltk.download('punkt')
nltk.download('stopwords')

stop_words = set(stopwords.words('english'))

def extract_article(url):
  USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0'
  config = Config()
  config.browser_user_agent = USER_AGENT
  config.request_timeout = 10

  article = Article(url, config=config)
  article.download()
  article.parse()
  
  print(article)
  
  authors = ", ".join(author for author in article.authors)
  title = article.title
  date = article.publish_date
  text = article.text
  image = article.top_image
  videos = article.movies 
  
  print(authors , title , date , text , image ,videos , sep = '\n')
  
  parsed_url = urlparse(url)
  domain = parsed_url.netloc.split(".")[-2] + "." + parsed_url.netloc.split(".")[-1]
  
  print(domain)
  
  return {"image":image ,"date":date,"domain":domain ,"title": title ,"text" :text}

def remove_punctuation(text):
    punctuation_to_remove = string.punctuation
    
    cleaned_text = text.translate(str.maketrans('', '', punctuation_to_remove))
    
    return cleaned_text

def remove_stopwords(text):
    # Tokenize the text
    text = text.lower()
    word_tokens = word_tokenize(text)
    
    # Remove stopwords
    filtered_text = [word for word in word_tokens if word.lower() not in stop_words]
    
    # Join the filtered words back into a string
    cleaned_text = ' '.join(filtered_text)
    
    return cleaned_text 
   
def text_without_stopwords(text):
  txt = remove_stopwords(text)
  cleaned_text = remove_punctuation(txt) 
  
  return cleaned_text 
 
    



