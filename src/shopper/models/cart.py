from peewee import *

from . import BaseModel
from .product import Product

class Cart(BaseModel):
	id = AutoField()
	date = DateField()
	name = TextField()
	visible = BooleanField(default = True)

class CartContent(BaseModel):
	id = AutoField()
	cart_id = ForeignKeyField(Cart)
	product_id = ForeignKeyField(Product)
	amount = IntegerField()