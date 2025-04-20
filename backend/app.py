from flask import Flask, request, send_from_directory, jsonify, render_template
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# Route to get the list of files

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/files", methods=["GET"])
def list_files():
    try:
        files = os.listdir(app.config["UPLOAD_FOLDER"])
        return jsonify(files)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route to upload a file
@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    file.save(os.path.join(app.config["UPLOAD_FOLDER"], file.filename))
    return jsonify({"message": "File uploaded successfully!"})


# Route to download a file
@app.route("/download/<filename>", methods=["GET"])
def download_file(filename):
    try:
        return send_from_directory(
            app.config["UPLOAD_FOLDER"], filename, as_attachment=True
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
