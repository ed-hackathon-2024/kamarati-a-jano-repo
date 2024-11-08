from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

DB_HOST = 'hackathon-2024db.ctyyk8aykahg.eu-north-1.rds.amazonaws.com'
DB_PORT = '5432'
DB_NAME = 'hackathon2024DB'
DB_USER = 'pouzivatel'
DB_PASSWORD = 'Hackathon-2024db'





def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn



@app.route('/api/login_data', methods=['GET'])
def get_login_data():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM login")
        rows = cursor.fetchall()
    
        login_data = [{"login": row[0], "password": row[1]} for row in rows]
        
        cursor.close()
        conn.close()
        
        return jsonify(login_data)
    
    except Exception as e:
        print("Chyba pri načítaní údajov:", e)
        return jsonify({"error": "Nepodarilo sa načítať údaje"}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5002)

