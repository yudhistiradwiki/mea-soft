from app import app
from app.controller import CctvController

from app.deploy import run, generate_frames

from flask import Flask, request, render_template, Response
from flask_restful import Resource, Api
from flask_cors import CORS
import cv2, subprocess
import argparse
import os
import platform
import sys
from pathlib import Path

import torch
import torch.backends.cudnn as cudnn

FILE = Path(__file__).resolve()
ROOT = FILE.parents[1]  # YOLOv5 root directory
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))  # add ROOT to PATH
ROOT = Path(os.path.relpath(ROOT, Path.cwd()))  # relative

from models.common import DetectMultiBackend
from utils.dataloaders import IMG_FORMATS, VID_FORMATS, LoadImages, LoadStreams
from utils.general import (LOGGER, Profile, check_file, check_img_size, check_imshow, check_requirements, colorstr, cv2,
                           increment_path, non_max_suppression, print_args, scale_coords, strip_optimizer, xyxy2xywh)
from utils.plots import Annotator, colors, save_one_box
from utils.segment.general import process_mask, scale_masks
from utils.segment.plots import plot_masks
from utils.torch_utils import select_device, smart_inference_mode

@app.route('/')
def index():
    return 'Hello flask app'


@app.route('/cctv', methods=['GET'])
def cctvs():
    return CctvController.index()


@app.route('/cctvdetail/<id>', methods=['GET'])
def cctvDetail(id):
    return CctvController.detail(id)


@app.route('/cctv/<id>', methods=['GET'])
def cctvMostDetail(id):
    return CctvController.detail(id)

@app.route("/video_feed/<id>")
def video_feed(id):
    check_requirements(exclude=('tensorboard', 'thop'))
    data = CctvController.detail(id)
    return Response(run(source="http://10.1.74.9:5000/video_feed/" + str(id)),mimetype='multipart/x-mixed-replace; boundary=frame')
    # return Response(run(source=data),mimetype='multipart/x-mixed-replace; boundary=frame')
