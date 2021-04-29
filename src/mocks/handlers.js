import { rest } from 'msw';
import mock from './youtube-videos-mock.json';

export const handlers = [
  rest.get('https://youtube.googleapis.com/youtube/v3/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock));
  }),
  rest.get('https://youtube.googleapis.com/youtube/v3/videos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        kind: 'youtube#videoListResponse',
        etag: '-Z3owRNySrxLwHJiNad7ZJT3-Gw',
        items: [mock.items[1]],
      })
    );
  }),
];
