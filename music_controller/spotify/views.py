from django.shortcuts import render
from .credentials import *
from rest_framework.views import APIView
from requests import Request, post

class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
