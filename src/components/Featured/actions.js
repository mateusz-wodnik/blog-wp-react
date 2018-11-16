import FetchActions from '../../_utils/FetchActions';

const FetchFeatured = new FetchActions('featured', 'posts?tag=featured');
export const getFeaturedRequest = FetchFeatured.get;
export const setFeatured = FetchFeatured.set;
