// @flow
import axios from 'axios';
import Storage from 'react-native-storage';

import stationModel from './stations/stationModel';
import audioPlayerModel from './audio/audioPlayerModel';

export const persistenWhitelist = ['station', 'audioPlayer'];

export default (apiClient: axios, storage: Storage) => {
  return {
    station: stationModel(apiClient, storage),
    audioPlayer: audioPlayerModel(),
  };
};