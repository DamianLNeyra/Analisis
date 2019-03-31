from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
import time
import datetime

# initializations
app = Flask(__name__)

# Mysql Connection

app.config['MYSQL_HOST'] = 'ec2-75-101-131-79.compute-1.amazonaws.com' 
app.config['MYSQL_USER'] = 'jgamnxsjtrmrsk'
app.config['MYSQL_PASSWORD'] = 'b58c12ebaad31303d9b202e8eda197b66436fac54d779e5531c823abdb3052c4'
app.config['MYSQL_DB'] = 'd6pl9uevndo9so'
mysql = MySQL(app)
#ndnjjsd
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

@app.route('/buscarCliente', methods=['GET', 'POST'])
def buscarCliente():
    cedula= request.form['cedula']
    cur = mysql.connection.cursor()
    data=()
    try:
        cur.execute('SELECT * FROM cliente where cedula = '+cedula)
        data = cur.fetchall()
    except cur.Exception as identifier:
        flash('Error de datos')
    
    
    cur.close()
    return  render_template('index.html', contacts = data)

@app.route('/index', methods=['POST'])
def Index():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente')
    data = cur.fetchall()
    cur.close()
    return render_template('index.html', contacts = data)

@app.route('/paquetes')
def paquetes():
    return render_template('paquetes.html')

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
        flash('Cliente añadido exitosamente')
        return render_template('index.html',contacts = ())

@app.route('/edit/<cedula>', methods = ['POST', 'GET'])
def get_contact(cedula):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente WHERE cedula = '+ cedula)
    data = cur.fetchall()
    cur.close()
    print(data[0])
    return render_template('edit-contact.html', contact = data[0])

@app.route('/update/<cedula>', methods=['POST'])
def update_contact(cedula):
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellidoA = request.form['apellidoA']
        apellidoB = request.form['apellidoB']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        cur = mysql.connection.cursor()
        cur.execute(" UPDATE cliente SET nombre = %s,apellidoP = %s,apellidoD = %s,telefono =%s,direccion =%s WHERE cedula ="+cedula, (nombre, apellidoA, apellidoB,telefono,direccion))
        flash('Cliente actualizado')
        mysql.connection.commit()
        return render_template('index.html',contacts = ())

@app.route('/add_paquete', methods = ['POST', 'GET'])
def add_paquete():
    if request.method == 'POST':        
        cedula = request.form['cedula']
        fecha= datetime.datetime.now()
        print(fecha)
        ciudadOrigen = request.form['ciudadOrigen']
        ciudadDestino = request.form['ciudadDestino']
        Npiezas = request.form['Npiezas']
        direccion = request.form['direccion']
        nombreRecibe = request.form['nombreRecibe']
        cur = mysql.connection.cursor()
        try:
            cur.execute("INSERT INTO paquete (cedula, fecha_Despacho,ciudad_origen, ciudad_destino,Npiezas, direccion_destino,nombre_recibe) VALUES ('"+cedula+"','"+str(fecha)+"',%s,%s,%s,%s,%s)", ( ciudadOrigen,ciudadDestino,Npiezas,direccion,nombreRecibe))
            mysql.connection.commit()
        except Exception as e:
            raise(e)
        flash('Paquete añadido exitosamente')
    return render_template('index.html',contacts = ())

@app.route('/envios/<string:cedula>', methods=['GET', 'POST'])
def envios(cedula):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM paquete where cedula = '+cedula)
    data = cur.fetchall()
    cur.close()
    return  render_template('lista_paquetes.html', contacts = data)

