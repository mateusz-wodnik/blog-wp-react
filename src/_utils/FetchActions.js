import {API_URL} from '../globals';

export default class FetchActions {
  constructor(name, path='') {
    this.actionName = name.toUpperCase();
    this.url = `${API_URL}/wp-json/theme/${path}`
  }
  set = (payload) => ({
    type: `GET_${this.actionName}`,
    [payload.length ? 'items' : 'item']: payload,
    loading: false
  });

  loading = () => ({
    type: `LOADING_${this.actionName}`,
    loading: true,
    error: null,
  });

  get = (dispatch, path='') => {
    dispatch(this.loading());
    return fetch(`${this.url}${path}`)
      .then(res => res.json())
      .then(items => dispatch(this.set(items)))
      .catch(console.error);
  };
}
