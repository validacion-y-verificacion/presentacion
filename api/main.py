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
    conn.close()
    if result:
        return True
    else: 
        return False
    
def authentication(email, password):
    conn = sql.connect('database.db')
    result = conn.execute(f"SELECT password FROM usuario WHERE email='{email}';").fetchall()
    conn.close()
    if result[0][0] == password:
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
    if authentication(email, password) == False:
        return jsonify({'error': 'Invalid email or password'}), 401
    else:
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
def get_book():
    if request.method == 'GET':
        id_material = request.json.get('id_material')
        token = request.json.get('token')
        if correct_token(token) == False:
            return {'message': "Not valid token", 'resources':[]}
        try:       
            with sql.connect("database.db") as conn:
                resource = conn.execute(f"SELECT * FROM material WHERE id_material='{ id_material }';").fetchall()
                msg = "Record found"
        except:
            resource = []
            msg = "Error with the database"
    conn.close()
    return {'message': msg, 'resources':resource}

'''
Routes to add or delete books
'''
@app.route("/new-book", methods=['POST'])
def post_new_book():
    if request.method == 'POST':
        try:
            token = request.json.get('token')
            if correct_token(token) == False:
                return {'message': "Not valid token", 'resources':[]}
        except:
            return {'message': "No token", 'resources':[]}
        try:       
            #titulo TEXT, autor TEXT, editorial TEXT, anio YEAR, descripcion TEXT, estado INT
            titulo = request.json.get('titulo')
            autor = request.json.get('autor')
            editorial = request.json.get('editorial')
            anio = request.json.get('anio')
            descripcion = request.json.get('descripcion')
            estado = request.json.get('estado')

            with sql.connect("database.db") as conn:
                index = len(conn.execute(f"SELECT autor FROM material;").fetchall())
                conn.execute(f"INSERT INTO material (id_material, titulo, autor, editorial, anio, descripcion, estado) VALUES ('{index}', '{titulo}', '{autor}', '{editorial}', '{anio}', '{descripcion}', '{estado}');")
                conn.commit()
                msg = "Record successfully added"
        except:
            conn.rollback()
            msg = "error in insert operation"
    conn.close()
    return msg

@app.route("/delete-book", methods=['POST'])
def post_delete_book():
    if request.method == 'POST':
        try:
            token = request.json.get('token')
            if correct_token(token) == False:
                return {'message': "Not valid token", 'resources':[]}
        except:
            return {'message': "No token", 'resources':[]}
        try:       
            index = request.json.get('index')
            with sql.connect("database.db") as conn:
                index = request.json.get('index')
                conn.execute(f"DELETE FROM material WHERE id_material='{index}';")
                conn.commit()
                msg = "Record successfully deleted"
        except:
            conn.rollback()
            msg = "error in delete operation"
    conn.close()
    return msg

'''
Routes update params of books
'''
@app.route("/update-book", methods=['UPDATE'])
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