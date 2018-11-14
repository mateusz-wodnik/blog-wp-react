import FetchActions from '../../_utils/FetchActions';

const FetchNavigation = new FetchActions('navigation', 'menus/main');
export const getNavigationRequest = FetchNavigation.get;
export const setNavigation = FetchNavigation.set;
