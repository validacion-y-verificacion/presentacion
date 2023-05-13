import sqlite3 as sql

conn = sql.connect('database.db')

conn.execute('CREATE Table token (session_id INT, user_id INT, token TEXT, PRIMARY KEY (session_id));')
print("Table token created successfully")

conn.execute('CREATE TABLE usuario (id_usuario INT, nombre TEXT, apellido TEXT, email TEXT, password TEXT, tipo TEXT, PRIMARY KEY (id_usuario));')
print("Table Usuario created successfully")

conn.execute('CREATE TABLE material (id_material INT, titulo TEXT, autor TEXT, editorial TEXT, anio YEAR, descripcion TEXT, estado INT, PRIMARY KEY (id_material));')
print("Table material created successfully")

conn.execute('CREATE TABLE prestamos (id INT, id_usuario INT, id_material INT, fecha_prestamo DATE, fecha_retorno DATE, FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (id_material) REFERENCES material(id_material), PRIMARY KEY (id))')
print("Table prestamos created successfully")

conn.execute('CREATE TABLE reservas (id INT, id_usuario INT, id_material INT, fecha_prestamo DATE, estado TEXT, FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (id_material) REFERENCES material(id_material), PRIMARY KEY (id))')
print("Table reservas created successfully")
conn.close()