import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToolsState {
  activeToolId: string;
}

const initialState: ToolsState = {
  activeToolId: 'flyer-maker'
};

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setActiveTool: (state, action: PayloadAction<string>) => {
      state.activeToolId = action.payload;
    }
  }
});

export const { setActiveTool } = toolsSlice.actions;
export default toolsSlice.reducer;