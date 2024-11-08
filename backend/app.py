from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)

# Enable CORS for all routes and specifically allow localhost:3000
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Database connection settings
DB_HOST = 'hackathon-2024db.ctyyk8aykahg.eu-north-1.rds.amazonaws.com'
DB_PORT = '5432'
DB_NAME = 'hackathon2024DB'
DB_USER = 'pouzivatel'
DB_PASSWORD = 'Hackathon-2024db'

def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except psycopg2.OperationalError as e:
        print("Database connection failed:", e)
        return None

@app.route('/api/authenticate', methods=['POST'])
def authenticate():
    try:
        print("Received authentication request")
        data = request.get_json()
        if not data:
            return jsonify({"error": "Request data is missing"}), 400

        username = data.get('username')
        password = data.get('password')
        print(f"Username: {username}, Password: {password}")

        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Failed to connect to the database"}), 500

        cursor = conn.cursor()
        cursor.execute("SELECT * FROM login WHERE username = %s AND password = %s", (username, password))
        user = cursor.fetchone()

        cursor.close()
        conn.close()
        print("Database connection closed")

        if user:
            print("Authentication successful")
            return jsonify({"message": "Authentication successful"}), 200
        else:
            print("Invalid credentials")
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        print("Error during authentication:", e)
        return jsonify({"error": "Authentication failed"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
