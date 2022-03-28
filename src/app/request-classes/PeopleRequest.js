import CrudRequest from '@/app/arch/crud/CrudRequest';

export default class PeopleRequest extends CrudRequest {
  static baseUrl() {
    return 'people';
  }
}
