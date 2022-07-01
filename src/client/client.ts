on('ps-ui', (nui: string, toggle: boolean, data?: any, hasFocus?: boolean, hasCursor?: boolean) => {
  /**
   * @param nui - The name of the UI element.
   * @param toggle - Whether the UI element is toggled.
   * @param data - The data to pass to the UI element.
   * @param hasFocus - [Default: false] Whether the UI element has focus.
   * @param hasCursor - [Default: false] Whether the UI element has cursor.
   */
  SetNuiFocus(hasFocus ? true : false, hasCursor ? true : false);
  SendNuiMessage(
    JSON.stringify({
      action: nui,
      data: {
        nui_toggle: toggle,
        data,
      },
    }),
  );
});

RegisterCommand(
  'test-ui',
  () => {
    emit('ps-ui', 'nui-test', true, { abc: '123' });
    console.log('Trying to open');
  },
  false,
);
