import FetchActions from '../../_utils/FetchActions';

const FetchAbout = new FetchActions('widgetAbout', 'sidebar/about');
export const getAboutRequest = FetchAbout.get;
