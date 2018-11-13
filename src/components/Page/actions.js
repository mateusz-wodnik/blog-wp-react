import FetchActions from '../../_utils/FetchActions';

const FetchPage = new FetchActions('page');
export const getPageRequest = FetchPage.get;
export const setPage = FetchPage.set;

