from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

web = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
for i in ("html", "js", "css", "assets"):
	web.mount(f"/{i}", StaticFiles(directory=i), name=i)

@web.get("/", response_class=HTMLResponse)
def index():
	html, code = next(read_file("index.html"))
	return HTMLResponse(content=html, status_code=code)

def read_file(filename, prefix="html"):
	try:
		f = open(f"{prefix}/{filename}")
	except IOError:
		yield None, 500		# Return 500 for now since we only load index.html. If we cant, we're fucked.
	else:
		with f:
			yield f.read(), 200
	finally:
		f.close()