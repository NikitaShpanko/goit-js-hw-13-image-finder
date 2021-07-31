import { defaults } from '@pnotify/core';

export default function pnotifySetup(context) {
  defaults.delay = 2000;
  defaults.stack.context = context;
  defaults.textTrusted = true;
  defaults.stack.dir1 = 'down';
  defaults.stack.firstpos1 = 10 + parseInt(context.style.paddingTop);
  defaults.stack.dir2 = 'right';
  defaults.stack.firstpos2 = 10;
  defaults.stack.spacing2 = 0;
  defaults.stack.maxStrategy = 'close';
  defaults.stack.maxClosureCausesWait = false;
  defaults.width = '100%';
  defaults.maxTextHeight = null;
}
