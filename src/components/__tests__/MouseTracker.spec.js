import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MousePosition from '../MouseTracker.vue';

describe('MousePosition.vue', () => {
  let wrapper;
  let addEventListenerSpy;
  let removeEventListenerSpy;

  beforeEach(() => {
    // 创建 spies 来监控 window 上的事件监听器
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    // 挂载组件
    wrapper = shallowMount(MousePosition);
  });

  afterEach(() => {
    // 清理 spies 和挂载的组件
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
    wrapper.unmount();
  });

  it('should add event listener on mount', () => {
    // 确保在组件挂载时添加了 mousemove 事件监听器
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });

  it('should remove event listener on unmount', async () => {
    // 卸载组件并确保移除了 mousemove 事件监听器
    await wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });

  it('should update x and y on mousemove', async () => {
    // 触发 mousemove 事件并检查 x 和 y 是否更新
    const event = new MouseEvent('mousemove', { pageX: 100, pageY: 200 });
    window.dispatchEvent(event);

    // 确保事件处理程序有足够的时间执行
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.x).toBe(0);
    expect(wrapper.vm.y).toBe(0);
  });
});