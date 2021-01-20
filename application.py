import requests
from flask import Flask,jsonify,request,Response
from tiingo import TiingoClient
from flask_cors import CORS, cross_origin
import flask
from datetime import date
from dateutil.relativedelta import relativedelta

# Init

application = Flask(__name__)
CORS(application)
# newsapi = NewsApiClient(api_key='347b6cdf23694a248efaff78da1fa5b4')

TIINGO_API_KEY = '293da9828b3db14e5e6ce4861b5890a157a0adbc'

# This is here to remind you to change your API key.
if not TIINGO_API_KEY or (TIINGO_API_KEY == 'REPLACE-THIS-TEXT-WITH-A-REAL-API-KEY'):
    raise Exception("Please provide a valid Tiingo API key!")


config = {
    'api_key': TIINGO_API_KEY,
    'session': True # Reuse HTTP sessions across API calls for better performance
}

client = TiingoClient(config)


@application.route('/getOutlookData/<ticker>',methods=['GET'])
@cross_origin()
def getOutlookData(ticker):

    print(ticker)
    ticker_metadata = client.get_ticker_metadata(ticker)
    # print(ticker_metadata)
    result = ticker_metadata
    return jsonify(result)

@application.route('/getSummaryData/<ticker>',methods=['GET'])
@cross_origin()
def getSummaryData(ticker):

    headers = {
        'Content-Type': 'application/json'
    }
    requestResponse = requests.get(
        "https://api.tiingo.com/iex/"+ticker+"?token=293da9828b3db14e5e6ce4861b5890a157a0adbc",
        headers=headers)
    result=requestResponse.json()
    result=jsonify(result[0])
    return result


@application.route('/getChartsData/<ticker>',methods=['GET'])
@cross_origin()
def getChartsData(ticker):
    priordate = date.today() + relativedelta(months=-6)
    priordate=str(priordate)
    print(priordate)
    headers = {
        'Content-Type': 'application/json'
    }
    requestResponse = requests.get(
        "https://api.tiingo.com/iex/"+ticker+"/prices?startDate="+priordate+"&resampleFreq=12hour&columns=open,high,low,close,volume&token="+TIINGO_API_KEY,
        headers=headers)
    result=requestResponse.json()
    result=jsonify(result)

    return result


@application.route('/getNewsData/<ticker>',methods=['GET'])
@cross_origin()
def getNewsData(ticker):
    headers = {
        'Content-Type': 'application/json'
    }
    requestResponse = requests.get("https://newsapi.org/v2/everything?q="+ticker+"&apiKey=347b6cdf23694a248efaff78da1fa5b4",
        headers=headers)
    rawresult=requestResponse.json()
    totalresults = rawresult["totalResults"]
    print(totalresults)
    i = 1
    finalresult = {}
    rawresult = rawresult["articles"]
    for article in rawresult:
        # print(article)
        totalresults = totalresults - 1
        print("\n\n")
        if ("url" in article and "title" in article and "urlToImage" in article and "publishedAt" in article):
            if (article["url"] != '' and article["title"] != '' and article['urlToImage'] != '' and article[
                'publishedAt'] != ''):
                # print(article)
                finalresult[i] = article
                i = i + 1
        if i > 5 or totalresults < 0:
            break

    print(finalresult)

    result=jsonify(finalresult)
    return result



# @application.route('/')
# def slider():
#     return application.send_static_file('stockapi.html')
#
#



# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
