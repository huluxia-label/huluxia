#!/usr/bin/env python3
from bs4 import BeautifulSoup as bf
import requests
import json
import random
import webbrowser
import os
import urllib
import time
if not os.path.exists('images'):
    os.mkdir('images')
ls = []
def huluxia(id=250):
	_key = '6BD0D690D176C706DA83A5D9222E52AEF3708C7537DC1E7AEA069811D93CF42CCDEC8CFE102FF3B77D8737F7BF103B3F19FBAB7F2E14C120'
	hlx = requests.get(
   	 url = 'http://floor.huluxia.com/user/info/ANDROID/2.1',
     headers = {
      	'User-Agent': 
				'Mozilla/5.0 (Macintosh;'
				' Intel Mac OS X 10_14_2) AppleWebKit/537.36'
				' (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
     },
     params = {
				'_key': _key,
				'user_id': id
		 }
	)
	hlx.encoding = 'utf-8'
	hlx_json = json.loads(hlx.content)
	ls.append(hlx_json['avatar'])
	#urllib.request.urlretrieve(hlx_json['avatar'],'./images/%s%s.jpg' % (hlx_json['nick'],hlx_json['userID']))
	time.sleep(2)
	print('成功! %s' % id)

for i in range(1,100):
	huluxia(i)
