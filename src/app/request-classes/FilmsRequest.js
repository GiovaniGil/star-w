import CrudRequest from '@/app/arch/crud/CrudRequest';

export default class FilmsRequest extends CrudRequest {
  static baseUrl() {
    return 'films';
  }
}
