import os
import re
import sys
import json
import time
import requests
from itertools import count
from functools import partial
from operator import add, sub
from apiclient.discovery import build

API_KEY = os.environ['YOUTUBE_API_KEY']
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def search_for_video(options):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerkey=API_KEY)

    search_response = youtube.search().list(
    q=options.q,
    part="id, snippet",
    maxResults=options.max_results
    ).execute()

    videos = []

    for search_result in search_response.get("items", []):
        if search_result["id"]["kind"] == "youtube#video" :
            videos.append("%s ($s)" % (search_result["snippet"]["title"], search_result["id"]["videoId"]))

    print "Videos:\n", "\n".join(videos)
