// Handle data that is passed through HTML5 data property to a main script
function handleFetchComponentMount(name, success, fail) {
  const { dispatch } = this.props;
  try {
    const data = JSON.parse(document.currentScript.dataset[name]);
    dispatch(success(data));
  } catch {
    fail(dispatch)
  }
}

export default handleFetchComponentMount;
