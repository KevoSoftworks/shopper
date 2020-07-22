from peewee import *

from . import BaseModel

class ProductType(BaseModel):
	id = IntegerField(primary_key = True, unique = True)
	name = CharField(max_length = 255)
	icon = CharField(max_length = 255)

class Product(BaseModel):
	id = IntegerField(primary_key = True, unique = True)
	type = ForeignKeyField(ProductType, column_name = "type", null = True, default=None)
	name = TextField()
	unit = CharField(max_length = 10, default="")
	visible = BooleanField(default = True)