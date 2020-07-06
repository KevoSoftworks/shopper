from peewee import *

from . import BaseModel

class ProductType(BaseModel):
	id = IntegerField(primary_key = True, unique = True)
	name = CharField(max_length = 255)

class Product(BaseModel):
	id = IntegerField(primary_key = True, unique = True)
	type = ForeignKeyField(ProductType, null = True, default=None)
	name = TextField()
	visible = BooleanField(default = True)