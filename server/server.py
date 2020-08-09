import asyncio
import websockets
import pyautogui
import json

URL = "localhost"
PORT = 8765

async def processRequest(websocket, path):
	while True:
		data = await websocket.recv()
		data = json.loads(data)
		actionType = data["actionType"]

		if actionType == "mouseMove":
			direction = data["direction"]
			pixels = data["pixels"]

			if direction == "left" or direction == "top":
				pixels = -pixels

			if direction == "left" or direction == "right":
				pyautogui.moveRel(pixels, 0, duration=0.25)	
			else:
				pyautogui.moveRel(0, pixels, duration=0.25)	
		else:
			pyautogui.click()
			
start_server = websockets.serve(processRequest, URL, PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


