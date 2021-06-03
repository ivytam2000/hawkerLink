FROM python:3.9.5-slim

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

ENV FLASK_APP=api.py

CMD flask run --host=0.0.0.0 --port=${PORT:-5000}