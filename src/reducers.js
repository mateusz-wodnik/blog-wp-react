import posts from './components/Posts/reducer';
import slider from './components/Slider/reducer';
import page from './components/Page/reducer';
import navigation from './components/Navigation/reducer';
import featured from './components/Featured/reducer';
import widgetAbout from './widgets/About/reducer';
import widgetSocials from './widgets/Socials/reducer';
import widgetTags from './widgets/Tags/reducer';

const reducers = {
  ...posts,
  ...slider,
  ...page,
  ...navigation,
  ...featured,
  ...widgetAbout,
  ...widgetSocials,
  ...widgetTags,
};

export default reducers;
