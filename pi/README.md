# Raspberry Pi display

This Raspberry Pi will boot into a fullscreen kiosk style browser displaying our hosted dashboards.

Currently, three files contain custom configuration to support this implementation:
- /etc/xdg/lxsession/LXDE/autostart 
- /etc/network/interfaces
- /etc/rc.local

Also, one additional package is needed: `sudo apt-get install unclutter`

## TODO
- Automate process to image a fresh Raspberry Pi with all of the above.
- Handle network connectivity issues
- Integrate remote control
