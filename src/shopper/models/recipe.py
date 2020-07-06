from peewee import *

from . import BaseModel
from .product import Product

class Recipe(BaseModel):
	id = IntegerField(primary_key = True, unique = True)
	name = TextField()
	content = TextField()
	visible = BooleanField(default = True)

class RecipeIngredients(BaseModel):
	id = IntegerField(primary_key = True, unique = True)
	recipe_id = ForeignKeyField(Recipe)
	product_id = ForeignKeyField(Product)
	amount = IntegerField()