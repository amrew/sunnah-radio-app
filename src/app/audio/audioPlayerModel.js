// @flow
import RNAudioStreamer from 'react-native-audio-streamer';
import {DeviceEventEmitter} from 'react-native';

type AudioState = {
  currentlyPlaying: CurrentlyPlaying,
  hasEventListener: boolean,
};

export type CurrentlyPlaying = {
  id: ?string,
  url: ?string,
  status: PlayerStatus,
};

export type PlayerStatus =
  | 'PLAYING'
  | 'PAUSED'
  | 'STOPPED'
  | 'FINISHED'
  | 'BUFFERING'
  | 'ERROR';

export default () => {
  return {
    state: {
      currentlyPlaying: {
        id: null,
        url: null,
        status: 'STOPPED',
      },
      hasEventListener: false,
    },
    reducers: {
      changeStatus(prevState: AudioState, status: PlayerStatus): AudioState {
        if (prevState.currentlyPlaying.status === status) return prevState;
        return {
          ...prevState,
          currentlyPlaying: {
            ...prevState.currentlyPlaying,
            status,
          },
          hasEventListener: true,
        };
      },
      setActiveAudio(
        prevState: AudioState,
        payload: {audioID: string, audioUrl: string}
      ): AudioState {
        if (!payload) {
          return {
            currentlyPlaying: {
              id: null,
              url: null,
              status: 'STOPPED',
            },
            hasEventListener: false,
          };
        }
        const {audioID, audioUrl} = payload;
        return {
          ...prevState,
          currentlyPlaying: {
            ...prevState.currentlyPlaying,
            id: audioID,
            url: audioUrl,
          },
        };
      },
    },
    effects: {
      async setAudio(
        payload: {audioID: string, audioUrl: string},
        rootState: any
      ) {
        const {audioID, audioUrl} = payload;
        const {
          audioPlayer: {currentlyPlaying, hasEventListener},
        } = rootState;

        if (!hasEventListener) {
          DeviceEventEmitter.addListener(
            'RNAudioStreamerStatusChanged',
            this.changeStatus
          );
        }

        this.setActiveAudio(payload);
        RNAudioStreamer.setUrl(audioUrl);
        setTimeout(() => {
          RNAudioStreamer.play();
        }, 0);
      },

      async play() {
        RNAudioStreamer.play();
      },

      async pause() {
        RNAudioStreamer.pause();
      },

      async stop() {
        DeviceEventEmitter.removeListener(
          'RNAudioStreamerStatusChanged',
          this.changeStatus
        );
        RNAudioStreamer.pause();
        this.setActiveAudio(null);
      },
    },
  };
};
