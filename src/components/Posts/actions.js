import FetchActions from '../../_utils/FetchActions';

const FetchPosts = new FetchActions('posts', 'posts');
export const getPostsRequest = FetchPosts.get;
export const setPosts = FetchPosts.set;
