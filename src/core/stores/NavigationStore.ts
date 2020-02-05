import { types } from 'mobx-state-tree';

import { reaction } from 'mobx';

/**
 * Sync the history object with the given mst router store
 * @param {object} history - 'History' instance to subscribe and sync to
 * @param {object} store - Router store instance to sync with the history changes
 */
export const syncHistoryWithStore = (history, store) => {
  store.setHistory(history);

  function isLocationEqual(locationA, locationB) {
    return (
      locationA && locationB && locationA.key && locationB.key && locationA.key === locationB.key
    );
  }

  // Handle update from history object
  const handleLocationChange = location => {
    if (!isLocationEqual(store.location, location)) {
      store.updateLocation({ ...location });
    }
  };
  const unsubscribeFromHistory = history.listen(handleLocationChange);
  const unsubscribeFromStoreLocation = reaction(
    () => store.location,
    location => {
      if (!isLocationEqual(history.location, location)) {
        history.replace({ ...location });
      }
    },
  );

  history.unsubscribe = () => {
    unsubscribeFromHistory();
    unsubscribeFromStoreLocation();
  };

  handleLocationChange(history.location);

  return history;
};

export const NavigationStoreModel = types
  .model({
    location: types.optional(types.frozen(), {}),
    action: types.optional(types.string, ''),
  })
  .actions(self => {
    let history;

    return {
      updateLocation(newState) {
        self.location = newState;
        self.action = history.action;
      },
      setHistory(initialHistory) {
        history = initialHistory;
      },
      push(location: string) {
        history.push(location);
      },
      replace(location: string) {
        history.replace(location);
      },
      goBack() {
        history.goBack();
      },
      goForward() {
        history.goForward();
      },
    };
  });
