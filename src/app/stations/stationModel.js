// @flow
import axios from 'axios';
import Storage from 'react-native-storage';
import type {FetchingState} from '../common/types';

type StationState = {
  stationIds: string[],
  stationMapping: {},
  status: FetchingState,
};

export type Station = {
  id: string,
  name: string,
  logo: string,
  url: string,
  status: string,
  info: string,
  listener: number,
  region: string,
  province: string,
  country: string,
  alias: string,
  currentLesson: string,
};

export type Stations = Station[];

export default (apiClient: axios, storage: Storage) => {
  return {
    state: {
      stationIds: [],
      stationMapping: {},
      status: {},
    },
    reducers: {
      startFetchStations(prevState: StationState): StationState {
        return {
          ...prevState,
          status: {
            ...prevState.status,
            loading: true,
            error: null,
          },
        };
      },
      successFetchStations(
        prevState: StationState,
        stations: Stations
      ): StationState {
        return {
          ...prevState,
          stationIds: [
            ...stations.map(station => prettifyStationField(station).id),
          ],
          status: {
            ...prevState.status,
            loading: false,
            loaded: true,
          },
          stationMapping: {
            ...stations.reduce((prevDetails, station) => {
              const newStation = prettifyStationField(station);
              return {
                ...prevDetails,
                [newStation.id]: newStation,
              };
            }, prevState.stationMapping),
          },
        };
      },
      failedFetchStations(prevState: StationState, error: Error): StationState {
        return {
          ...prevState,
          status: {
            ...prevState.status,
            loading: false,
            error,
          },
        };
      },
    },
    effects: {
      async fetchStations(
        payload: {shouldRefresh?: boolean} = {},
        rootState: any
      ) {
        if (
          (rootState.station.status.loaded && !payload.shouldRefresh) ||
          rootState.station.status.loading
        ) {
          return Promise.resolve();
        }
        this.startFetchStations();
        try {
          const stations = await apiClient.get('radio/lrii.php?model=lima');
          this.successFetchStations(stations);
        } catch (err) {
          console.log(err);
          this.failedFetchStations(err);
        }
      },
    },
  };
};

// let's prettify the fields
const prettifyStationField = (station: any): Station => ({
  id: station.id_radet,
  name: station.nama,
  logo: station.logo,
  url: station.url,
  status: station.status,
  info: station.info,
  listener: parseInt(station.pendengar),
  region: station.kab,
  province: station.prop,
  country: station.neg,
  alias: station.alias,
  currentLesson: station.judul,
});
