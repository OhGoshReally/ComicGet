import json
import re
import os
import configparser
from multiprocessing import Process

from web import web
from web import soctest
from db import database

Processes = [
    database.Create().createTables(),
    web.run(), 
    soctest.Main()
    ]

def run(n):
    Processes[n]

if __name__ == '__main__':
    jobs = []
    for i in range(len(Processes)):
        p = Process(target=run, args=(i,))
        jobs.append(p)
        p.start()
    #basepath = os.path.abspath(os.getcwd())
    #p = Process(target=web.run())
    #p.start()
    #p2 = Process(target=soctest.Main())
    #p2.start()
    #p.join()
    #p2.join()
