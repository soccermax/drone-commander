from pyparrot.Minidrone import Mambo

mamboAddr = "e0:14:fe:37:3d:fb"
mambo = Mambo(mamboAddr, use_wifi=False)


def connect():
    print("trying to connect")
    result = mambo.connect(num_retries=3)
    mambo.ask_for_state_update()
    print("connected: %s" % result)
    return result


def get_battery():
    return mambo.sensors.battery


def take_off():
    result = mambo.safe_takeoff(5)
    return result


def land():
    result = mambo.safe_land(5)
    return result


def back_flip():
    result = mambo.flip(direction='back')
    return result
