import { createServerContext } from 'react';
/** The context containing the search query */
export default createServerContext<string>('searchContext', '');
