from json import *
import sqlite3 as sql
import uuid

from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'seulgi-fan'
jwt = JWTManager(app)


def correct_token(token):
    conn = sql.connect('database.db')
    result = conn.execute(f"SELECT * FROM token WHERE token='{token}';").fetchall()
    if result:
        return True
    else: 
        return False

'''
Authentification section
'''
@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get('email')
    password = request.json.get('password')

    try:
        conn = sql.connect('database.db')
        user = conn.execute(f"SELECT id_usuario, email FROM usuario WHERE email='{email}' AND password='{password}'").fetchall()
        conn.close()
    except:
        return jsonify({'error': 'Error with the database'}), 401
    if user:
        token = str(uuid.uuid4())

        conn = sql.connect('database.db')
        index = conn.execute(f"SELECT COUNT(*) FROM token;").fetchall()[0]
        conn.execute("INSERT INTO token (session_id, user_id, token) VALUES (?, ?, ?);", (str(index[0]), user[0][0], token))
        conn.commit()
        conn.close()

        return jsonify({'token': token, 'email': user[0][1]})
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
    

@app.route("/logout", methods=["POST"])
def logout():
    token = request.json.get('token')
    
    conn = sql.connect('database.db')
    conn.execute(f"DELETE FROM token WHERE token='{token}';")
    conn.commit()

    remaining_tokens = conn.execute(f"SELECT token FROM token WHERE user_id=(SELECT user_id FROM token WHERE token='{token}')").fetchall()
    if len(remaining_tokens) > 0:
        conn.execute(f"DELETE FROM token WHERE token='{token}'")
        conn.commit()

    conn.close()

    return jsonify({'message': 'Logged out successfully'})

'''
Routes to get information about books
'''
@app.route("/get-all-books", methods=['GET'])
#@jwt_required()
def get_all_books():
    if request.method == 'GET':
        token = request.json.get('token')
        if correct_token(token) == False:
            return {'message': "Not valid token", 'resources':[]}
        
        try:       
            with sql.connect("database.db") as conn:
                resources = conn.execute("SELECT * from material;").fetchall()
                msg = "Resources found"
        except:
            resources = []
            msg = "Error in the search"
    conn.close()
    return {'message': msg, 'resources':resources}

@app.route("/get-book", methods=['GET'])
@jwt_required()
def get_book():
    if request.method == 'GET':
        try:       
            with sql.connect("database.db") as conn:
                resource = conn.execute("SELECT * from material where ...;").fetchall()
                msg = "Record successfully added"
        except:
            resource = []
            msg = "Resource not found"
    conn.close()
    return {'message': msg, 'resources':resource}

@app.route("/get-chronology-book", methods=['GET'])
@jwt_required()
def get_chronology_book():
    if request.method == 'GET':
        try:       
            with sql.connect("books.db") as con:
                cur = con.cursor()
                cur.execute("",() )
                con.commit()
                msg = "Record successfully added"
        except:
            con.rollback()
            msg = "error in insert operation"
    con.close()
    return msg

'''
Routes to edit states or add new books
'''
@app.route("/new-book", methods=['POST'])
@jwt_required()
def post_new_book():
    if request.method == 'POST':
        try:       
            with sql.connect("books.db") as con:
                cur = con.cursor()
                cur.execute("",() )
                con.commit()
                msg = "Record successfully added"
        except:
            con.rollback()
            msg = "error in insert operation"
    con.close()
    return msg


@app.route("/update-book", methods=['UPDATE'])
@jwt_required()
def update_state_book():
    if request.method == 'UPDATE':
        try:
            with sql.connect("books.db") as con:
                cur = con.cursor()
                cur.execute("",() )
                con.commit()
                msg = "Record successfully added"
        except:
            con.rollback()
            msg = "error in insert operation"
    con.close()
    return msg


if __name__ == '__main__':
    app.run()