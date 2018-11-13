export default function FetchReducerCreator(name) {
  const actionName = name.toUpperCase();
  return (state, action) => {
    const { type, ...update } = action;
    switch (type) {
      case `GET_${actionName}`:
      case `LOADING_${actionName}`:
      case `ERROR_${actionName}`:
        return {
          ...state[name],
          ...update
        };

      default:
        return state[name];
    }
  };
}
