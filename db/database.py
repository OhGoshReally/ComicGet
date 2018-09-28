#!/usr/bin/python

import os
from peewee import *
from datetime import date

class DatabaseHandler:
    #db = SqliteDatabase(':memory:')

    db = SqliteDatabase('./db/library.db')


class BaseModel(Model):
    db = SqliteDatabase(SqliteDatabase(':memory:'))

    class Meta:
        #database = super.db
        database = DatabaseHandler.db


class Comic(BaseModel):
    title = CharField(null=True)
    titleslug = CharField(null=True)
    activestatus = BooleanField(null=True)
    synopsis = CharField(null=True)
    publisher = CharField(null=True)
    startdate = DateField(null=True)
    filepath = CharField(null=True)
    fileprofile = CharField(null=True)
    rating = CharField(null=True)
    size = CharField(null=True)
    files = CharField(null=True)
    externalsite = CharField(null=True)
    externallink = CharField(null=True)
    externalid = IntegerField(null=True)


class Chapter(BaseModel):
    comic = ForeignKeyField(Comic, backref='chapters')
    name = CharField(null=True)
    monitored = BooleanField(null=True)
    exists_on_disk = BooleanField(null=True)
    pages = IntegerField(null=True)
    number = IntegerField(null=True)


class Alternative_Names(BaseModel):
    comic = ForeignKeyField(Comic, backref='alt_names')
    name = CharField(null=True)

class Tag(BaseModel):
    comic = ForeignKeyField(Comic, backref='tags')
    tag = CharField(null=True)

class Metadata_Items(BaseModel):
    comic = ForeignKeyField(Comic, backref='metadata')
    posterpath = CharField(null=True)
    bannerpath = CharField(null=True)

class Config(BaseModel):
    key = CharField(null=True)
    value = CharField(null=True)
    type = CharField(null=True)

class Create():
    def createTables(self):
        print("Checking database")

        DatabaseHandler.db.create_tables([
            Comic, 
            Chapter, 
            Alternative_Names,
            Tag,
            Metadata_Items,
            Config
        ])

        check = Config.get_or_create(
            key='default_view',
            defaults={
                'value': 'card', 
                'type': 'ui'
        })

        check = Config.get_or_create(
            key='default_view_override',
            defaults={
                'value': 'false', 
                'type': 'ui'
        })

        print("Done checking database")

if __name__ == "__main__":
    Create().createTables()