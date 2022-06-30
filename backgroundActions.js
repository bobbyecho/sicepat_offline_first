import backgroundService from 'react-native-background-actions';

export default class RNBackgroundActions {
    static isRunning() {
        return backgroundService.isRunning();
    }

    async start(
        loopingAction,
        {taskName, taskDesc, taskTitle, delay}
    ) {
        await backgroundService.start(
            async (taskData) => {
                console.log('looping dulu 1', taskData)
                if (taskData) {
                    const {delayInMs} = taskData;
                    console.log('looping dulu')
                    while (backgroundService.isRunning()) {
                        loopingAction();
                        await new Promise((resolve) => {
                            setTimeout(() => {
                              resolve(true);
                            }, delayInMs);
                          });
                    }
                }
            },
            {
                taskName,
                taskTitle,
                taskDesc,
                taskIcon: {
                    name: 'ic_launcherx',
                    type: 'mipmap'
                },
                // linkingURI: getUriScheme, // See Deep Linking for more info
                parameters: {delayInMs: delay}
            }
        );
    }

    stop() {
        void backgroundService.stop();
    }

    removeListener() {
        return backgroundService.removeAllListeners();
    }
}
