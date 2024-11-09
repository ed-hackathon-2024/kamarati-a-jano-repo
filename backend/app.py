from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)


CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


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







@app.route('/api/products/receipt/<int:receipt_id>', methods=['GET'])
def get_products_by_receipt(receipt_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT create_date FROM Receipts WHERE id = %s;", (receipt_id,))
    create_date = cursor.fetchone()

    if not create_date:
        return jsonify({"message": "Receipt not found."}), 404

    cursor.execute("""
        SELECT p.name, p.price
        FROM Products p
        JOIN Product_Items pi ON pi.product_id = p.id
        JOIN Receipts r ON r.id = pi.fs_receipt_id
        WHERE r.id = %s;
    """, (receipt_id,))

    products = cursor.fetchall()
    cursor.close()
    conn.close()

    if not products:
        return jsonify({"message": "No products found for this receipt."}), 404

    product_list = [{"name": row[0], "price": row[1]} for row in products]
    return jsonify({
        "create_date": create_date[0].strftime('%Y-%m-%d %H:%M:%S'),
        "products": product_list
    })





@app.route('/api/receipts/customer/<int:customer_id>', methods=['GET'])
def get_receipt_ids_by_customer_id(customer_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Dotaz na získanie všetkých ID bločkov pre daného zákazníka
    cursor.execute("""
        SELECT id 
        FROM Receipts
        WHERE customer_id = %s
        ORDER BY create_date;
    """, (customer_id,))

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    # Spracovanie výsledkov do JSON formátu
    receipt_ids = [row[0] for row in rows]

    return jsonify({"receipt_ids": receipt_ids})





if __name__ == '__main__':
    app.run(debug=True, port=5002)
