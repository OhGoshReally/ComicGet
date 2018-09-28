#!/usr/bin/python

import os
from peewee import *
from datetime import date

class DatabaseHandler:
    #db = SqliteDatabase(':memory:')

    #dbname = 'newlibrarytest'

    #fileDir = os.path.dirname(os.path.realpath('__file__'))
    #filename = os.path.join(fileDir, './db/', dbname)
    #filename = os.path.abspath(os.path.realpath(filename))

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
    #metadata = CharField(null=True)
    publisher = CharField(null=True)
    #chapters = CharField(null=True)
    #tags = CharField(null=True)
    startdate = DateField(null=True)
    #startyear = CharField(null=True)
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
    #downloaded = BooleanField(null=True)
    monitored = BooleanField(null=True)
    exists_on_disk = BooleanField(null=True)
    pages = IntegerField(null=True)
    number = IntegerField(null=True)
    #release_date = TimestampField()
    #watched = BooleanField()


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

class Create():
    def createTables(self):
        print("Checking database")

        DatabaseHandler.db.create_tables([
            Comic, 
            Chapter, 
            Alternative_Names,
            Tag,
            Metadata_Items
        ])

        print("Done checking database")

if __name__ == "__main__":
    Create().createTables()