from flask import Flask, render_template, request
from flaskext.mysql import MySQL
import json
import time

app = Flask(__name__)
mysql = MySQL()

#MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'mysql'
app.config['MYSQL_DATABASE_DB'] = 'blog'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/posts', methods=['POST'])
def post():
    content = request.form['content']
    userName = request.form['userName']
    currentTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    conn = mysql.connect()
    cursor = conn.cursor()
    query = "insert into posts (content,user_name,post_date) values (%s,%s,%s)"
    cursor.execute(query,(content,userName,currentTime))
    conn.commit()
    return "Success"

@app.route('/posts', methods=['GET'])
def getPosts():
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("SELECT * from posts order by post_date DESC")
    data = cursor.fetchall()
    returnList = []
    for row in data:
        returnList.append({"content":row[0],"userName":row[1],"date":row[2]})
    return  json.dumps(returnList)

@app.route('/deletePost', methods=['DELETE'])
def deletePost():
    postTime = request.args['postDate']

    conn = mysql.connect()
    cursor = conn.cursor()
    query = "delete from posts where post_date = %s"
    cursor.execute(query,(postTime))
    conn.commit()
    return "Success"

if __name__ == '__main__':
    app.run(debug=True)
