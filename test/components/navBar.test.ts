import { type VueWrapper, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import NavBarComponent from '@/components/NavBar.vue';

const NavBar = () => NavBarComponent;
describe(NavBar, () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(NavBarComponent);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
