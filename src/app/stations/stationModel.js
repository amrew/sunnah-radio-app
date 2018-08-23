// @flow
import axios from 'axios';
import Storage from 'react-native-storage';
import type {FetchingState} from '../common/types';

type StationState = {
  stationIds: string[],
  stationMapping: {},
  status: FetchingState,
  detailStatus: FetchingState,
};

export type Station = {
  id: string,
  uuid: string,
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
  address: string,
  latlang: string,
  zone: string,
  webUrl: string,
  email: string,
  channel: string,
  telegramUrl: string,
  contactName: string,
  description: string,
};

export type Stations = Station[];

export default (apiClient: axios, storage: Storage) => {
  return {
    state: {
      stationIds: [],
      stationMapping: {},
      status: {},
      detailStatus: {},
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
        const stationIds = stations.map(station => prettifyStationField(station).id)
        return {
          ...prevState,
          stationIds: [...new Set(stationIds)],
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

      startFetchDetailStation(prevState: StationState): StationState {
        return {
          ...prevState,
          detailStatus: {
            ...prevState.detailStatus,
            loading: true,
            error: null,
          },
        };
      },
      successFetchDetailStation(
        prevState: StationState,
        stations: Stations
      ): StationState {
        return {
          ...prevState,
          detailStatus: {
            ...prevState.detailStatus,
            loading: false,
            loaded: true,
          },
          stationMapping: {
            ...stations.reduce((prevDetails, station) => {
              const newStation = prettifyDetailStationField(station);
              return {
                ...prevDetails,
                [newStation.id]: {...prevDetails[newStation.id], ...newStation},
              };
            }, prevState.stationMapping),
          },
        };
      },
      failedFetchDetailStation(
        prevState: StationState,
        error: Error
      ): StationState {
        return {
          ...prevState,
          detailStatus: {
            ...prevState.detailStatus,
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
        if (rootState.station.status.loaded && !payload.shouldRefresh) {
          return Promise.resolve();
        }
        this.startFetchStations();
        try {
          const stations = await apiClient.get('radio/lrii.php', {
            params: {
              model: 'lima',
            },
          });
          if (!stations) throw new Error('No data found');
          this.successFetchStations(stations);
        } catch (err) {
          console.log(err);
          this.failedFetchStations(err);
        }
      },

      async fetchDetailStation(payload: {id: string}, rootState: any) {
        const {id} = payload;
        this.startFetchDetailStation();
        try {
          const stations = await apiClient.get('jupuk.php', {
            params: {
              ambil: 'radet',
              id_radet: id,
            },
          });
          if (!stations) throw new Error('No data found');
          this.successFetchDetailStation(stations);
        } catch (err) {
          console.log(err);
          this.failedFetchDetailStation(err);
        }
      },
    },
  };
};

// let's prettify the fields
const prettifyStationField = (station: any): any => ({
  id: station.id_radet,
  uuid: station.uid_rad,
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

const prettifyDetailStationField = (station: any): any => ({
  id: station.id_radet,
  address: station.alamat_rad,
  latlang: station.latlng_rad,
  zone: station.zona_radio,
  webUrl: station.web,
  email: station.email,
  channel: station.chanel,
  telegramUrl: station.telegram,
  contactName: station.pembimbing,
  description: station.about,
});
