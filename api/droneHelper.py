from pyparrot.Minidrone import Mambo
from django.http import JsonResponse

mamboAddr = "e0:14:fe:37:3d:fb"
mambo = Mambo(mamboAddr, use_wifi=False)


def connect():
    print("trying to connect")
    success = mambo.connect(num_retries=3)
    print("connected: %s" % success)
    mambo.ask_for_state_update()
    if (success):
     # get the state information
        print("sleeping")
        mambo.smart_sleep(60)
        return JsonResponse({
            'status': 'connected'
        })


def get_battery():
    return mambo.sensors.battery


def take_off():
    result = mambo.safe_takeoff(5)
    return result


def land():
    result = mambo.safe_land(5)
    mambo.smart_sleep(60)
    return result


def back_flip():
    result = mambo.flip(direction='back')
    return result


def combo():
    print("trying to connect")
    success = mambo.connect(num_retries=3)
    print("connected: %s" % success)

    if (success):
     # get the state information
        print("sleeping")
        mambo.smart_sleep(2)
        mambo.ask_for_state_update()
        mambo.smart_sleep(2)
        print("taking off!")
        mambo.safe_takeoff(5)
        mambo.smart_sleep(20)
        mambo.flip(direction='back')
        print("landing")
        print("flying state is %s" % mambo.sensors.flying_state)
        mambo.safe_land(5)
        mambo.smart_sleep(5)

        print("disconnect")
        mambo.disconnect()



