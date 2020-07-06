import peewee as pw

db = pw.MySQLDatabase("shopper", host="db", user="shopper", password="shopper")

class BaseModel(pw.Model):
	class Meta:
		database = db
		legacy_table_names = False