import { PresentationsState, presentationsAdapter } from './presentations.interfaces';
import { Presentation } from '@labdat/data-models';

export const presentationsInitialState: PresentationsState = presentationsAdapter.getInitialState({
  currentPresentationId: null,
  loaded: false,
  loading: false,
  error: '',
  count: 0
});
