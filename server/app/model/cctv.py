from app import db
from datetime import datetime

class Cctv(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    location = db.Column(db.String(45), nullable=False)
    ip = db.Column(db.String(45), nullable=False)
    link = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(45), nullable=False)
    password = db.Column(db.String(45), nullable=False)
    created_at_cctv = db.Column(db.DateTime, default=datetime.utcnow)
    

    def __repr__(self):
        return '<Cctv {}>'.format(self.name)