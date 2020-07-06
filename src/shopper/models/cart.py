from peewee import *

from . import BaseModel
from .product import Product

class Cart(BaseModel):
	id = IntegerField(primary_key = True, unique = True)
	date = DateField()
	name = TextField()
	visible = BooleanField(default = True)

class CartContent(BaseModel):
	id = IntegerField(primary_key = True, unique = True)
	cart_id = ForeignKeyField(Cart)
	product_id = ForeignKeyField(Product)
	amount = IntegerField()