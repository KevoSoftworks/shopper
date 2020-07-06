from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

from .routes import calendar, cart, product, recipe

# Initialise FastAPI and disable any form of open documentation
web = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

# Mount static folders
for i in ("html", "js", "css", "assets"):
	web.mount(f"/{i}", StaticFiles(directory=f"static/{i}"), name=i)

# Include routers from other files
web.include_router(calendar.router, prefix="/calendar")
web.include_router(cart.router, prefix="/cart")
web.include_router(product.router, prefix="/product")
web.include_router(recipe.router, prefix="/recipe")

# Handle the root route
@web.get("/", response_class=HTMLResponse)
def index():
	html, code = next(read_file("index.html", prefix="static/html"))
	return HTMLResponse(content=html, status_code=code)

# Read from file
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
