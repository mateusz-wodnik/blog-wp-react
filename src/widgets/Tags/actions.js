import FetchActions from '../../_utils/FetchActions';

const FetchTags = new FetchActions('widgetTags', 'sidebar/tags');
export const getTagsRequest = FetchTags.get;
export const setTags = FetchTags.set;
