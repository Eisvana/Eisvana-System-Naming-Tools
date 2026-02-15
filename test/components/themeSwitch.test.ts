import { type VueWrapper, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import ThemeSwitchComponent from '@/components/ThemeSwitch.vue';

const ThemeSwitch = () => ThemeSwitchComponent;
describe(ThemeSwitch, () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(ThemeSwitchComponent);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should swap theme if clicked', async () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const button = wrapper.find('button');
    await button.trigger('click');

    expect(document.documentElement.dataset.theme).toBe(newTheme);
  });
});
