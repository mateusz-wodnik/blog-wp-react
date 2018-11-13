import FetchActions from '../../_utils/FetchActions';

const FetchSlider = new FetchActions('slider', 'posts?tag=slider');
export const getSliderRequest = FetchSlider.get;

