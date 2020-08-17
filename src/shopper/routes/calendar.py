from functools import reduce
from fastapi import APIRouter
from pydantic import BaseModel as BM
from typing import Optional
from playhouse.shortcuts import model_to_dict
from peewee import operator

from ..models.calendar import *

router = APIRouter()

# Ok fuck it, for now I'm going to put request models right here, since my database models
# use similar classing definitions. I'll solve this someday.
class Deletable(BM):
	id: int

@router.get("/content")
@router.get("/{id}/content")
async def get_calendar_content(id: Optional[int] = None):
	cal = await get_calendar(id)

	content = CalendarContent.select().where(CalendarContent.visible == True) \
		.dicts()

	entry = list(range(7))
	content = [i for i in content]

	

@router.get("")
@router.get("/{id}")
async def get_calendar(id: Optional[int] = None):
	cond = list()
	cond.append(Calendar.visible == True)
	if id is not None:
		cond.append(Calendar.id == id)
	cond = reduce(operator.and_, cond)

	# Yup, this breaks if we have no calendars of if the id doesn't exist
	return Calendar.select().where(cond) \
		.order_by(Calendar.date.desc()).limit(1) \
		.dicts().get()