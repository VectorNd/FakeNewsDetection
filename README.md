# Fake News Detection

## Overview  
The topic of fake news detection on social media has recently attracted tremendous attention. The basic countermeasure of comparing websites against a list of labeled fake news sources is inflexible, and so a machine learning approach is desirable.  Our project aims to use Natural Language Processing to detect fake news directly, based on the text content of news articles. 

## Problem Definition
Develop a tool that uses machine learning algorithms to identify and flag misleading or fabricated news articles from online sources. The system should analyze text content, verify sources, and provide users with credibility scores.

## Features  
Created a Website showing Real Time News and in real time , ML model assigns a reliability % score and colored shield based on whether news is real or fake . 
User can search for any news article by pasting its url in the search box at the top of the website . User will see the title and short summary of the article and  a reliability % score and get to know whether the news article is real or fake . 

Here are some key features of the Website :

### Basic User Interface and Experience (UI/UX)
1. **Clean Design**: A simple and intuitive layout for easy navigation.
2. **Easy Navigation**: Clear menus and categories for quick access to different news sections.

### Core Content and Delivery
1. **Top News Section**: Display the latest and most important news stories prominently.
2. **Categorized News**: Sections for different topics such as World, Business, Technology, Sports, and Entertainment.

### Additional Features
1. **Search Functionality**: Basic search to get the article summary and its reliability score . 
2. **Providing Feedback**: Provide feedback regarding the reliability of the article . 

## Try It Out 
1. Clone the repo to your local machine
   ```
   > git clone https://github.com/VectorNd/FakeNewsDetection.git
   ```
   ```
   > cd FakeNewsDetection
   ```

3. Now go inside the Backend folder
   ```
   > cd Backend
   ```

5. Make sure you have all the dependencies installed
   ```
   > pip install -r requirements.txt
   ```
   If there is any error , then install dependencies using this -
   ```
   > pip install string urllib joblib
   > pip install flask nltk pickle numpy re os csv flask_cors torch transformers
   ```

7. You are good to go now for starting the backend server
   ```
   > python main.py
   ```

8. Now the backend server starts running on the localhost http://127.0.0.1:5000 

9. Now come out the backend folder
   ```
   > cd ..
   ```

10. Go inside the Frontend folder
   ```
   > cd Frontend
   ```

11. Now install all the node modules
    ```
    > npm install
    ```

12. Now start the frontend Server
    ```
    > npm run start
    ```

13. Now the frontend server starts running on the localhost http://127.0.0.1:3000 and you are into the website 

## Folder Structure 
The file structure is the following

```
.
|
+-- Backend
|   +-- templates
|        +-- index.html
|   +-- .gitattributes
|   +-- .gitignore
|   +-- feedback.csv
|   +-- main.py
|   +-- model.py
|   +-- newsfetch.py
|   +-- requirements.txt 
+-- Frontend
|   +-- public
|       +-- *.png ,*.txt , .. 
|   +-- src
|       +-- App.css , App.js , Main.js , ...
|   +-- .gitignore 
|   +-- package-lock.json
|   +-- package.json
+-- README.md 
``` 

