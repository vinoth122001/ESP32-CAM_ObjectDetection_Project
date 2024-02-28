
import cv2
import config

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins =['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from roboflow import Roboflow
rf = Roboflow(config.api_key)
project = rf.workspace().project(config.project)
model = project.version(1).model
path = r'Detection/Detected.jpg'
  
# infer on a local image
predictions =model.predict("Images/Products_on_Shelf.jpg", confidence=40, overlap=30)
predicted_data = predictions.json()



# visualize your prediction
predictions.save("Detection/Detected.jpg")
image = cv2.imread(path)
cv2.imshow('img', image)
cv2.waitKey(0)
  
# closing all open windows
cv2.destroyAllWindows()


@app.get("/")
async def root():
    return predicted_data

    