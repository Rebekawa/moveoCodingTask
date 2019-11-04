import requests
from flask import Flask, request, send_from_directory
from lxml import html
import lxml
from jinja2 import Template

import json
from lxml import etree
app = Flask(__name__)

@app.route('/')
def send_html():
    return send_from_directory('static/', 'base.html')

@app.route('/static/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js/', path)

@app.route('/static/css/<path:path>')
def send_css(path):
    return send_from_directory('static/css/', path)

@app.route('/search')
def search_location():
    url = "https://www.timeanddate.com/weather/?query=%s" % (request.args.get('search'))
    return

# get weather given the city name
@app.route('/location')
def location():
    headers = {"Accept-Language": "en-US,en;q=0.5",
               "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0"}
    url = "https://www.timeanddate.com/weather/%s/%s" % (request.args.get('country'), request.args.get('city'))
    r = requests.get(url, headers=headers)
    tree = html.fromstring(r.content)
    location_name = tree.xpath('//*[@id="wt-loc"]/text()')
    temperature = tree.xpath('/html/body/div[1]/div[7]/section[1]/div/div[2]/p[2]/text()[1]')
    humidity_value = tree.xpath('//*[@id="qfacts"]/p[6]/text()')
    wind_value = tree.xpath('//*[@id="qlook"]/p[2]/text()[2]')
    icon = tree.xpath('//*[@id="cur-weather"]/@src')
    try:
       return json.dumps({
           'location': location_name[0],
            'temperature': temperature[0],
            'humidity': 'Humidity: ' + humidity_value[0],
            'wind': wind_value[0],
            'icon': icon[0]
        })
    except:
       return json.dumps({})


if __name__ == '__main__':
    app.run()