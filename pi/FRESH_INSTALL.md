# Raspbian

[Download Raspbian](http://www.raspberrypi.org/downloads/) and copy it to an SD or Micro-SD card.

[Mac OS X Steps](http://www.raspberrypi.org/documentation/installation/installing-images/mac.md)

## Hardware

Look at the TV and nearby outlets. Ideal setup

* Wall wart to USB to power the Pi
* Ethernet cable to Pi for network
* HDMI 1

Acceptable
* TV USB to power Pi (sleep will reboot Pi)
* WiFi Dongle EdiMax USB 802.11b/g/n $8 - $12

## Install Software

During Raspbian first boot, make the following changes:

* Expand Filesystem
* Change user password to "loveyourhome"
* Enable boot to Desktop
* Advanced Options
  * Set hostname (after something related to [poetic meter](http://en.wikipedia.org/wiki/Metre_%28poetry%29))

Sign into the pi, then

    $ sudo ifup eth0
    $ sudo apt-get update 
    $ sudo aptitude install -y midori mg vim




## Keyboard + TV tips

Hints: Alt + F? at the deskop allows you to launch


A Terminal

    lxterminal