// @flow
import axios from 'axios';

import stationModel from './stations/stationModel';
import audioPlayerModel from './audio/audioPlayerModel';

export default (apiClient: axios) => {
  return {
    station: stationModel(apiClient),
    audioPlayer: audioPlayerModel(),
  };
};