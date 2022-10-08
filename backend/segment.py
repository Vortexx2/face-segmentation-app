import cv2 as cv
import numpy as np
from imageio.core.util import Array

face_cascade = cv.CascadeClassifier('models/face_cascade.xml')


def segment(image: Array):
  image = cv.cvtColor(np.array(image), cv.COLOR_RGB2BGR)
  gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)

  # detect the faces
  faces = face_cascade.detectMultiScale(gray, 1.4, 1)

  drawn_image = image

  # Draw the rectangle around each face
  print(faces)
  for (x, y, w, h) in faces:
    cv.rectangle(drawn_image, (x, y), (x + w, y + h), (255, 0, 0), 2)
  cv.imwrite('myloadedfile.png', drawn_image)

  return drawn_image
