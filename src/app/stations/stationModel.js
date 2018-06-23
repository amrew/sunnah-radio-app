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
      startFetchStations(
        prevState: StationState,
        shouldRefresh: boolean
      ): StationState {
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
        if (rootState.station.status.loaded && !payload.shouldRefresh) {
          return Promise.resolve();
        }
        this.startFetchStations(payload.shouldRefresh);
        try {
          let token;
          try {
            token = await storage.load({key: 'riiToken'});
          } catch (error) {
            // scrap token from html string
            const htmlString = await apiClient.get('media/player');
            token = parseToken(htmlString);
            storage.save({key: 'riiToken', data: token});
          }
          // get stations
          const stations = await apiClient.post(
            'wp-admin/admin-ajax.php',
            'lang=id_ID&action=rii_data&security=' + token,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          this.successFetchStations(stations);
        } catch (err) {
          console.log(err);
          this.failedFetchStations(err);
        }
      },
    },
  };
};

// @todo: move this helper to somewhere

const parseToken = htmlString => {
  const parsedHtml = htmlString.split('nonce":"')[1];
  const nonce = parsedHtml.split('","logo_rii"');
  return nonce[0];
};

const prettifyStationField = (station: any): Station => ({
  id: station.uid_rad,
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
