== RaspberryPi display

This RaspberryPi will boot into a fullscreen kiosk style browser displaying our hosted dashboards.

Currently, three files contain custom configuration to support this implementation:
- /etc/xdg/lxsession/LXDE/autostart 
- /etc/network/interfaces
- /etc/rc.local

Also, one additional package is needed: `sudo apt-get install unclutter`

=== Coming soon!
Automated process to image a fresh RaspberryPi with all of the above.