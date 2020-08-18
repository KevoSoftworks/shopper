from peewee import *

from . import BaseModel
from .product import Product

class Recipe(BaseModel):
	id = AutoField()
	name = TextField()
	content = TextField()
	upvotes = IntegerField()
	downvotes = IntegerField()
	visible = BooleanField(default = True)

class RecipeIngredients(BaseModel):
	id = AutoField()
	recipe_id = ForeignKeyField(Recipe)
	product_id = ForeignKeyField(Product)
	amount = IntegerField()