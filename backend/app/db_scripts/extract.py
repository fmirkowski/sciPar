import sqlite3
import json
import os

def export_db_to_json(db_path, output_json_path):
    print(f"Starting export from {db_path}")
    
    # Check if database exists
    if not os.path.exists(db_path):
        print(f"Error: Database file not found at {db_path}")
        return
    
    # Connect to SQLite database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Get all table names
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    if not tables:
        print("No tables found in database")
        return
        
    print(f"Found {len(tables)} tables: {', '.join(table[0] for table in tables)}")
    
    # Dictionary to store all data
    database_dict = {}
    
    # Export each table
    for table in tables:
        table_name = table[0]
        print(f"Processing table: {table_name}")
        
        cursor.execute(f"SELECT * FROM {table_name}")
        
        # Get column names
        columns = [description[0] for description in cursor.description]
        
        # Get all rows
        rows = cursor.fetchall()
        print(f"Found {len(rows)} rows in {table_name}")
        
        # Convert rows to list of dictionaries
        table_data = []
        for row in rows:
            row_dict = dict(zip(columns, row))
            table_data.append(row_dict)
            
        database_dict[table_name] = table_data
    
    # Close connection
    conn.close()
    
    # Create directory if it doesn't exist
    output_dir = os.path.dirname(output_json_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Write to JSON file
    try:
        with open(output_json_path, 'w', encoding='utf-8') as f:
            json.dump(database_dict, f, indent=4, ensure_ascii=False)
        print(f"Successfully exported to {output_json_path}")
    except Exception as e:
        print(f"Error writing to file: {str(e)}")

# Usage example
if __name__ == "__main__":
    # Get current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Set paths relative to current directory
    db_path = os.path.join(current_dir, "arxiv_papers_q-fin.db")  # Replace with your database name
    output_json_path = os.path.join(current_dir, "papers3.json")
    
    print(f"Current directory: {current_dir}")
    export_db_to_json(db_path, output_json_path)