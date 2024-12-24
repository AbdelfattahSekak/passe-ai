import { defineStore } from 'pinia';
import type { SearchFormData } from '~/types';

export const useSearchStore = defineStore('search', () => {
  const searchParams = ref<SearchFormData>({
    start: '',
    destination: '',
    nbStops: 3
  });

  function setSearchParams(params: SearchFormData) {
    searchParams.value = { ...params };
  }

  function clearSearchParams() {
    searchParams.value = {
      start: '',
      destination: '',
      nbStops: 3
    };
  }

  return {
    searchParams,
    setSearchParams,
    clearSearchParams
  };
});