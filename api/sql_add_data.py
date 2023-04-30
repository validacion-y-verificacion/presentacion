import sqlite3 as sql

conn = sql.connect('database.db')
data_users = [((0, "Admin", "Admin", "admin@gmail.com", "123", "Administrador")),
    ((1, "Javier", "Norambuena", "test1@gmail.com", "123", "Estudiante")),
    ((2, "Bastian", "Cornejo", "test2@gmail.com", "123", "Estudiante")),
    ((3, "Amanda", "Salinas", "test3@gmail.com", "123", "Estudiante")),
    ((4, "Benjamin", "Cayo", "test4@gmail.com", "123", "Estudiante")),] 

for users in data_users:
    conn.execute(f"INSERT INTO usuario (id_usuario, nombre, apellido, email, tipo) VALUES ('{users[0]}', '{users[1]}', '{users[2]}', '{users[3]}', '{users[4]}');")
conn.commit()
conn.close()
print("Usuarios agregados")



conn = sql.connect('database.db')
data_users = [((0, "Introduction to Algorithms", "Thomas H. Cormen", "The MIT Press", "2022", "A comprehensive update of the leading algorithms text, with new material on matchings in bipartite graphs, online algorithms, machine learning, and other topics.", "Disponible")),
    ((1, "Information theory inference and learning algorithms", "David J. C. MacKay", "The MIT Press", "2003", "nformation theory and inference, often taught separately, are here united in one entertaining textbook. These topics lie at the heart of many exciting areas of contemporary science and engineering - communication, signal processing, data mining, machine learning, pattern recognition, computational neuroscience, bioinformatics, and cryptography.", "Disponible")),
    ((2, "Deep Learning", "Ian Goodfellow", "The MIT Press", "2016", "An introduction to a broad range of topics in deep learning, covering mathematical and conceptual background, deep learning techniques used in industry, and research perspectives.", "Disponible")),
    ((3, "The DevOps Handbook", "Gene Kim", "IT Revolution Press", "2021", "This award-winning and bestselling business handbook for digital transformation is now fully updated and expanded with the latest research and new case studies!", "Disponible")),] 

for users in data_users:
    conn.execute(f"INSERT INTO material (id_material, titulo, autor, editorial, anio, descripcion, estado) VALUES ('{users[0]}', '{users[1]}', '{users[2]}', '{users[3]}', '{users[4]}', '{users[5]}', '{users[6]}');")
conn.commit()
conn.close()
print("Material agregados")