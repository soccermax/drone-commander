from django.shortcuts import render
from django.http import HttpResponse
from .droneHelper import connect, get_battery, take_off, land, back_flip


# Create your views here.
def main(request):
    return HttpResponse("Hello")


def connect_to_drone(request):
    result = connect()
    return HttpResponse(result)


def take_off_drone(request):
    return HttpResponse(take_off())


def land_drone(request):
    return HttpResponse(land())


def battery_level_drone(request):
    return HttpResponse(get_battery())


def back_flip_drone(request):
    return HttpResponse(back_flip())
