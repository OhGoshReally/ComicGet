"""Config Module

This is the config handling module.
"""

import configparser

import os.path


class Config(configparser.ConfigParser):
    """The class hadling the config for logviwer"""


    def __init__(self, logfile):
        print(logfile)
        if logfile and os.path.isfile(logfile):
            self.read(logfile)
        else:
            print('Could not find file!')
        super().__init__(self)

        
