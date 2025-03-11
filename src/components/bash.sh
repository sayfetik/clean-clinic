#:/bin/bash

PORT=8080

while true; do
{
echo -e "НTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n"
echo "«html><head»<meta http-equiv='refresh' content='5'></head><body>"
echo "<h2>System Information</h2>"
echo "<pre>"

echo "<b>System Uptime: </b>"
uptime

echo "<b>Inode Usage:</b>"
df -i
echo "<b>Memory Usage:</b>"
free -h

echo "<b>Disk Space Usage:</b>"
df -h

echo "<b>Last 15 lines of /var/log/syslog:</b>"
tail -n 15 /var/log/syslog

echo "</pre></body></html>"
} | nc -l -p $PORT -q 1
done


[Unit]
Description=Simple Web Server for System Info
After=network.target

[Service]
ExecStart=/home/didi/testdir/task2/web.sh
Restart=always
CPUShares=15%
МеmoгyМах=256M
Slice=mysysinfo.slice

[Install]
WantedBy=multi-user.target

[Slice]
CPUQuota=15%
МеmоryМax=256M