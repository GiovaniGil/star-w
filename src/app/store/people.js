import defaultStore from '@/app/arch/store/defaultStore';
import PeopleRequest from '@/app/request-classes/PeopleRequest';

const { store } = defaultStore(PeopleRequest);

export default {
  ...store,
};
