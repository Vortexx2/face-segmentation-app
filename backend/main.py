from typing import Literal

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ['http://localhost:5500', 'http://127.0.0.1:5500']
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"],
                   allow_headers=["*"])


@app.get("/")
async def hello_world(request: Request):
  print(request.headers)
  return {"message": "hello world"}


class FaceSegmentationBody(BaseModel):
  image: str
  technique: Literal['cascade']


@app.post("/segmentation/faces")
async def segment_faces(segmentation_request: FaceSegmentationBody):
  return segmentation_request
