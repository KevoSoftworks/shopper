from fastapi import APIRouter
from pydantic import BaseModel as BM
from typing import Optional
from playhouse.shortcuts import model_to_dict

from ..models.recipe import *

router = APIRouter()

# Ok fuck it, for now I'm going to put request models right here, since my database models
# use similar classing definitions. I'll solve this someday.
class Deletable(BM):
	id: int

class CreateRecipe(BM):
	id: Optional[int]
	name: str
	content: str

@router.get("")
async def list_recipes():
	query = Recipe.select().where(Recipe.visible)
	return [{**i, "products": await list_ingredients(i.get("id"))} for i in query.dicts()]

@router.get("/{id}")
async def list_recipe(id: int):
	return Recipe.select().where(Recipe.id == id and Recipe.visible).dicts().get()

@router.get("/{id}/ingredients")
async def list_ingredients(id: int):
	query = RecipeIngredients.select().where(RecipeIngredients.recipe_id == id)
	return [i for i in query.dicts()]

@router.post("", response_model=CreateRecipe)
async def create_recipe(recipe: CreateRecipe):
	# TODO: Any form of input validation
	new_recipe = Recipe(name = recipe.name, content = recipe.content)
	new_recipe.save()

	return model_to_dict(new_recipe)

@router.delete("")
async def delete_recipe(recipe: Deletable):
	delete_recipe = Recipe.get(Recipe.id == recipe.id)
	delete_recipe.visible = False
	delete_recipe.save()

	return True