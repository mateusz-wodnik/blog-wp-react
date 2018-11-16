import FetchActions from '../../_utils/FetchActions';

const FetchSocials = new FetchActions('widgetSocials', 'menus/social');
export const getSocialsRequest = FetchSocials.get;
export const setSocials = FetchSocials.set;
