from fastapi import APIRouter

from ..models import calendar, cart, product, recipe, db

router = APIRouter()

@router.get("/db/create")
async def create_tables():
	models = [
		calendar.Calendar,
		calendar.CalendarContent,
		cart.Cart,
		cart.CartContent,
		product.Product,
		product.ProductType,
		recipe.Recipe,
		recipe.RecipeIngredients
	]

	db.create_tables(models)

	return []