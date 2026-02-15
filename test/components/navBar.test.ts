import NavBar from '@/components/NavBar.vue';
import { beforeEach, describe, expect, it } from 'vitest';
import { type VueWrapper, mount } from '@vue/test-utils';

describe(NavBar, () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(NavBar);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
