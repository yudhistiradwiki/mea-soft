from app.model.cctv import Cctv
from app import response, app, db
from flask import request

def index():
    try:
        cctv = Cctv.query.all()
        data = formatArray(cctv)
        
        return response.success(data, "Success")

    except Exception as e:
        print(e)

def formatArray(datas):
    array = []
    
    for i in datas:
        array.append(singleObject(i))

    return array

def singleObject(data):
    data = {
        'id' : data.id,
        'name' : data.name,
        'location' : data.location,
        'ip' : data.ip,
        'link' : data.link,
        'username' : data.username,
        'password' : data.password,
        'created_at_cctv' : data.created_at_cctv
    }

    return data

def detail(id):
    try:
        cctv = Cctv.query.filter_by(id=id).first()
        image = Cctv.query.filter(Cctv.link == id)

        if not cctv:
            return response.badRequest([], 'Tidak ada data cctv')

        imagedata = formatImage(image)
        data = singleDetailObject(cctv, imagedata)

        return data

    except Exception as e:
        print(e)

def singleDetailObject(cctv, dataimage):
    data = cctv.link
    return data

def singleImage(image):
    data = {
        'id' : image.id,
        'image' : image.image,
        'count_hd' : image.count_hd,
        'count_lv' : image.count_lv,
        'avg_panjang_bbox_hd' : image.avg_panjang_bbox_hd,
        'created_at' : image.created_at,
        'updated_at' : image.updated_at
    }

    return data

def formatImage(data):
    array = []
    for i in data:
        array.append(singleImage(i))
    
    return array