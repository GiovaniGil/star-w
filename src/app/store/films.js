import defaultStore from '@/app/arch/store/defaultStore';
import FilmsRequest from '@/app/request-classes/FilmsRequest';

const { store } = defaultStore(FilmsRequest);

export default {
  ...store,
};
