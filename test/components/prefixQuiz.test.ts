import { type VueWrapper, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PrefixQuizComponent from '@/components/PrefixQuiz.vue';

vi.mock('@/logic/glyphs', () => ({
  getRandomGlyphs: vi.fn().mockReturnValue('0001A21117FF'),
}));

const PrefixQuiz = () => PrefixQuizComponent;
describe(PrefixQuiz, () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(PrefixQuizComponent);
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show confirmation if input is correct', async () => {
    const input = wrapper.find('#quizSystemName');
    const confirmBtn = wrapper.find('button[type="submit"]');

    await input.setValue('EV1-1 Hello World');
    await confirmBtn.trigger('click');

    const status = wrapper.find('.status');

    expect(status).toBeDefined();
    expect(status.classes('success')).toBe(true);
    expect(confirmBtn.text()).toBe('Next');
  });

  it('should show error when input is incorrect', async () => {
    const input = wrapper.find('#quizSystemName');
    const confirmBtn = wrapper.find('button[type="submit"]');

    await input.setValue('EV1-5');
    await confirmBtn.trigger('click');

    const status = wrapper.find('.status');

    expect(status).toBeDefined();
    expect(status.classes('error')).toBe(true);
  });
});
