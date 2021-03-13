from django.urls import path
from .views import main, connect_to_drone, take_off_drone, land_drone, battery_level_drone, back_flip_drone

urlpatterns = [
    path('', main),
    path('connectDrone', connect_to_drone),
    path('takeOff', take_off_drone),
    path('land', land_drone),
    path('batteryLevel', battery_level_drone),
    path('backFlip', back_flip_drone),
]
