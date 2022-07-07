#!/bin/sh

adb shell cmd jobscheduler run -f com.sicepat.offline.first 999
adb shell am broadcast -a com.sicepat.offline.first.event.BACKGROUND_FETCH

# (lldb)
# e -l objc -- (void)[[BGTaskScheduler sharedScheduler] _simulateLaunchForTaskWithIdentifier:@"com.transistorsoft.fetch"]