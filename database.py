from peewee import *


class DatabaseHandler:
    db = SqliteDatabase(':memory:')


class BaseModel(Model):
    db = SqliteDatabase(SqliteDatabase(':memory:'))

    class Meta:
        database = super.db


class Comic(BaseModel):
    kitsu_id = IntegerField()
    name = CharField()
    database_link = CharField()
    source = CharField()
    directory = CharField()
    watched = BooleanField()


class Chapter(BaseModel):
    comic = ForeignKeyField(Comic)
    name = CharField()
    downloaded = BooleanField()
    exists_on_disk = BooleanField()
    pages = IntegerField()
    release_date = TimestampField()
    watched = BooleanField()



class Alternative_Names(BaseModel):
    comic = ForeignKeyField(Comic)
    name = CharField()






if __name__ == "__main__":
    print("What am i doing? :(")
