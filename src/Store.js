import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import reducers from './reducers';
import navigationData from './components/Navigation/navigation.data';


const StoreContext = createContext('StoreContext');
export const StoreProvider = StoreContext.Provider;
export const StoreConsumer = StoreContext.Consumer;

class Store extends Component {
  // Default states
  state = {
    posts: {
      items: [],
      loading: false,
      error: null,
    },
    slider: {
      items: [],
      loading: false,
      error: null,
    },
    page: {
      item: {},
      loading: false,
      error: null,
    },
    navigation: {
      items: [],
      loading: false,
      error: null,
    },
    featured: {
      items: [],
      loading: false,
      error: null,
    },
    widgetAbout: {
      item: {},
      loading: false,
      error: null,
    },
    widgetSocials: {
      items: [],
      loading: false,
      error: null,
    },
    widgetTags: {
      item: {
        tags: [],
      },
      loading: false,
      error: null,
    }
  };

  componentDidMount() {
    // // Populate data passed within first server response with HTML file
    // const data = document.currentScript.dataset;
    // const navigation = JSON.parse(data.navigation || '[]');
    // for (let key in data) {
    //   data[key]
    // }
    // this.setState(state => ({ navigation: { ...state.navigation, items: navigation } }))
  }

  dispatch = (action) => {
    const update = (() => {
      const { state } = this;
      const toUpdate = {};
      for (const reducer in reducers) {
        const result = reducers[reducer](state, action)
        if (result) toUpdate[reducer] = result;
      }
      return toUpdate;
    })();
    this.setState(state => ({ ...state, ...update }), () => {
      console.log(action, update)
    });
  };

  render() {
    const { state, dispatch, props: { children } } = this;
    return (
      <StoreProvider value={{
        ...state,
        dispatch,
      }}
      >
        {children}
      </StoreProvider>
    );
  }
}

Store.defaultProps = {
  children: null,
};

Store.propTypes = {
  children: PropTypes.node,
};

export default Store;
