import asyncio
import websockets
import pyautogui
import json

URL = ""
PORT = 8765

async def processRequest(websocket, path):
	while True:
		data = await websocket.recv()
		data = json.loads(data)
		actionType = data["actionType"]

		if actionType == "mouseMove":
			print("action mouse move")
			direction = data["direction"]
			pixels = data["pixels"]

			if direction == "left" or direction == "top":
				pixels = -pixels

			if direction == "left" or direction == "right":
				print("move left or right")
				pyautogui.moveRel(pixels, 0, duration=0)	
			else:
				print("top or bottom")
				pyautogui.moveRel(0, pixels, duration=0)	
		elif actionType == "keyPressed":
			key = data["key"]

			pyautogui.typewrite([key])
		elif actionType == "scroll":
			direction = data["direction"]
			scrollDistance = 10;
			if direction == "down":
				scrollDistance = -scrollDistance
			pyautogui.scroll(scrollDistance)
		else:
			pyautogui.click()
			
start_server = websockets.serve(processRequest, URL, PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


