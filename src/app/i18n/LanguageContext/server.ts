import { createServerContext } from 'react';
/** The context used by server side pages to set the language context */
export default createServerContext<string>('lng', 'en');
