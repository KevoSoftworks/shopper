from peewee import *

from . import BaseModel

class ProductType(BaseModel):
	id = AutoField()
	name = CharField(max_length = 255)
	icon = CharField(max_length = 255)

class Product(BaseModel):
	id = AutoField()
	type = ForeignKeyField(ProductType, column_name = "type", null = True, default=None)
	name = TextField()
	unit = CharField(max_length = 10, default="")
	visible = BooleanField(default = True)