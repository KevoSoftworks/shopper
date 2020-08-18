from peewee import *

from . import BaseModel
from .recipe import Recipe

class Calendar(BaseModel):
	id = AutoField()
	date = DateField()
	name = TextField()
	visible = BooleanField(default = True)

class CalendarContent(BaseModel):
	id = AutoField()
	calendar_id = ForeignKeyField(Calendar)
	recipe_id = ForeignKeyField(Recipe, null = True, default = None)
	entry = IntegerField()
	content = TextField(null = True, default = None)
	visible = BooleanField(default = True)