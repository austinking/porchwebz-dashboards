# Raspberry Pi display

This Raspberry Pi will boot into a fullscreen kiosk style browser displaying our hosted dashboards.

Currently, three files contain custom configuration to support this implementation:
- /etc/xdg/lxsession/LXDE/autostart 
- /etc/network/interfaces
- /etc/rc.local

Also, one additional package is needed: `sudo apt-get install unclutter`

## TODO
- Automate process to image a fresh Raspberry Pi with all of the above.
 - http://computers.tutsplus.com/articles/how-to-clone-raspberry-pi-sd-cards-using-the-command-line-in-os-x--mac-59911
 - http://sysmatt.blogspot.com/2014/08/backup-restore-customize-and-clone-your.html
- Handle network connectivity issues
- Integrate remote control
 - http://www.amazon.com/gp/product/B003UE52ME – $20 wireless keyboard with mouse touchpad 
