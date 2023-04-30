import sqlite3
conn = sqlite3.connect('database.db')

a = conn.execute('SELECT * from usuario').fetchall()
conn.close()
print(a)
