from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

# initializations
app = Flask(__name__)

# Mysql Connection

app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Pi3141592654'
app.config['MYSQL_DB'] = 'transporte'
mysql = MySQL(app)

# settings
app.secret_key = "mysecretkey"

# routes

@app.route('/')

def login():
    return render_template('login.html')

@app.route('/verificar', methods=['GET', 'POST'])
def verificar(): 
   password = request.form['password']
   name= request.form['nombre']
   if password== '1234' and name=='mneyra':
    return render_template('index.html')
   else :
    return render_template('login.html')

@app.route('/envios')
def envios():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM paquete ')
    data = cur.fetchall()
    cur.close()
    return  render_template('index.html', contacts = data)

@app.route('/buscarCliente', methods=['GET', 'POST'])
def buscarCliente():
    cedula= request.form['cedula']
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente where cedula = '+cedula)
    data = cur.fetchall()
    cur.close()
    return  render_template('index.html', contacts = data)

@app.route('/index', methods=['POST'])
def Index():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM contacts')
    data = cur.fetchall()
    cur.close()
    return render_template('index.html', contacts = data)


@app.route('/add_contact', methods=['POST'])
def add_contact():
    if request.method == 'POST':
        cedula = request.form['cedula']
        name = request.form['nombre']
        phone = request.form['telefono']
        direccion = request.form['direccion']
        apellidoA = request.form['apellidoA']
        apellidoB = request.form['apellidoB']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO cliente (cedula, nombre, apellidoP,apellidoD, direccion, telefono) VALUES (%s,%s,%s,%s,%s,%s)", (cedula, name, apellidoA,apellidoB,direccion,phone))
        mysql.connection.commit()
        flash('Contact Added successfully')
        return redirect(url_for('Index'))

@app.route('/edit/<id>', methods = ['POST', 'GET'])
def get_contact(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM contacts WHERE id = %s', (id))
    data = cur.fetchall()
    cur.close()
    print(data[0])
    return render_template('edit-contact.html', contact = data[0])

@app.route('/update/<id>', methods=['POST'])
def update_contact(id):
    if request.method == 'POST':
        fullname = request.form['fullname']
        phone = request.form['phone']
        email = request.form['email']
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE contacts
            SET fullname = %s,
                email = %s,
                phone = %s
            WHERE id = %s
        """, (fullname, email, phone, id))
        flash('Contact Updated Successfully')
        mysql.connection.commit()
        return redirect(url_for('Index'))

@app.route('/delete/<string:id>', methods = ['POST','GET'])
def delete_contact(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM contacts WHERE id = {0}'.format(id))
    mysql.connection.commit()
    flash('Contact Removed Successfully')
    return redirect(url_for('Index'))

# starting the app
if __name__ == "__main__":
    app.run(port=3307, debug=True)
