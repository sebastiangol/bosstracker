import DetailedBoss from './DetailedBoss';
import { PlaythroughsContextProvider } from '../context/PlaythroughsContext';
import { fireEvent, render, screen } from '@testing-library/react';

const selectedPlaythroughMock = { user_id: 1 };
const setOpenNote = jest.fn();
const setRefresh = jest.fn();
const setLoadingNote = jest.fn();
// jest.mock('./DeleteBoss', () => {
//   return jest.fn(() => <div>Delete Boss Mock</div>);
// });

describe(DetailedBoss, () => {
  it('setOpenNote function is calld when the boss is clicked', () => {
    const { getByTestId } = render(
      <PlaythroughsContextProvider>
        <DetailedBoss
          key={2}
          id={2}
          name='boss2'
          attempts={3}
          completed={true}
          notes="Don't do this thing, do that"
          selectedPlaythrough={selectedPlaythroughMock}
          openNote={0}
          setOpenNote={setOpenNote}
          loadingNote={false}
          setLoadingNote={setLoadingNote}
          refresh={0}
          setRefresh={setRefresh}
          session={1}
        />
      </PlaythroughsContextProvider>
    );
    const toggleNote = getByTestId('toggle-note');
    expect(setOpenNote).not.toHaveBeenCalled();
    fireEvent.click(toggleNote);
    expect(setOpenNote).toHaveBeenCalled();
  });
});
