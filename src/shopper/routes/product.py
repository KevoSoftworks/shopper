from fastapi import APIRouter
from pydantic import BaseModel as BM
from playhouse.shortcuts import model_to_dict

from ..models.product import *

router = APIRouter()

# Ok fuck it, for now I'm going to put request models right here, since my database models
# use similar classing definitions. I'll solve this someday.
class Deletable(BM):
	id: int

class CreateType(BM):
	name: str

class CreatedType(BM):
	id: int
	name: str

class CreateProduct(BM):
	type: int
	name: str

class CreatedProduct(BM):
	id: int

@router.get("/types")
async def list_types():
	return [i for i in ProductType.select().dicts()]

@router.get("/types/{id}")
async def list_type(id: int):
	return ProductType.select().where(ProductType.id == id).dicts().get()

@router.post("/types", response_model=CreatedType)
async def create_type(item: CreateType):
	new_type = ProductType(name = item.name)
	new_type.save()

	print(model_to_dict(new_type))

	return model_to_dict(new_type)	# Why the fuck does this not work? Return my fucking data!

@router.delete("/types")
async def delete_type(item: Deletable):
	delete_type = ProductType.get(ProductType.id == item.id)
	# TODO: actually check if the instance is actually deleted (exists + no foreign key constraints)
	delete_type.delete_instance()

	return True

@router.get("/by_type/{id}")
async def list_type(id: int):
	return [i for i in ProductType.select().where( \
		Product.type == id and \
		Product.visible \
	).order_by(Product.name).dicts()]

@router.get("/")
async def list_products():
	return [i for i in Product.select().where(Product.visible).dicts()]

@router.get("/{id}")
async def list_product(id: int):
	return Product.select().where(Product.id == id and Product.visible).dicts().get()

@router.post("/", response_model=CreatedProduct)
async def create_product(product: CreateProduct):
	new_product = Product(type = product.type, name = product.name)
	new_product.save()

	return model_to_dict(new_product)

@router.delete("/")
async def delete_product(product: Deletable):
	delete_product = Product.get(Product.id == product.id)
	delete_product.visible = False
	delete_product.save()

	return True