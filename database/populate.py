import mysql.connector
import numpy as np
from faker import Faker
import os
from dotenv import load_dotenv

load_dotenv()

db_config = {
    'host': os.getenv('HOST'),
    'user': os.getenv('SQL_USER'),
    'password': os.getenv('PASSWORD'),
    'database': os.getenv('DATABASE'),
}
def generateUsers(num):
    users_data = []
    f, m, l = 'AAA'
    roles = ['Active', 'Pledge', 'Active', 'Pledge', 'Exec', 'Alumni']
     # Generates a random integer between 1 (inclusive) and 4 (exclusive)
    for i in range(num):
        initials = f + m + l
        role = roles[np.random.randint(0,6)]
        fake_user = Faker()
        tmp = [fake_user.email(), initials, role, fake_user.password(), fake_user.password()]
        users_data.append(tmp)
        l = chr(ord('A') + ((i+1) % 26))
        m = chr(ord('A') + (((i+1) //26) % 26))
        f = chr(ord('A') + ((i+1) // (26*26)) %26)
    return users_data
try:
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    #reset table
    cursor.execute('DELETE FROM Users')
    print ("Erased users table")
    users_data = generateUsers(100)
    # Insert data into Users table
    insert_query = "INSERT INTO Users (Email, Initials, Role, Salt, Password) VALUES (%s, %s, %s, %s, %s)"
    cursor.executemany(insert_query, users_data)

    # Commit the changes
    connection.commit()

    print(f"Inserted {cursor.rowcount} rows into Users table.")

except mysql.connector.Error as err:
    print(f"Error: {err}")