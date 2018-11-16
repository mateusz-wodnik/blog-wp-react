import React, { Fragment } from 'react';
import {
  FacebookShareButton, FacebookShareCount, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  PinterestIcon, PinterestShareButton, PinterestShareCount,
  WhatsappShareButton
} from 'react-share';

const Share = ({ url }) => (
  <Fragment>
    <FacebookShareButton url={url}>
      <FacebookIcon size={32} round />
    {/*<FacebookShareCount*/}
      {/*url="https://facebook.com">*/}
      {/*{count => count}*/}
    {/*</FacebookShareCount>*/}
    </FacebookShareButton>
    <PinterestShareButton url={url}>
      <PinterestIcon size={32} round />
      {/*<PinterestShareCount url={url}>*/}
        {/*{count => count}*/}
      {/*</PinterestShareCount>*/}
    </PinterestShareButton>
    <TwitterShareButton url={url} >
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  </Fragment>
);

export default Share;
