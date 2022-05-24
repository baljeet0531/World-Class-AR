from flask import Flask

app = Flask(__name__, static_folder='/')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

if __name__ == "__main__":
    app.run("localhost", 8000, debug=True)
