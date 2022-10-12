import DeleteBoss from './DeleteBoss';
import { PlaythroughsContextProvider } from '../context/PlaythroughsContext';
import { fireEvent, render, screen } from '@testing-library/react';

const setDeleteBossModal = jest.fn();

describe(DeleteBoss, () => {
  //   it('Delete boss modal is closed after deletion', () => {
  //     const { getByTestId } = render(
  //       <PlaythroughsContextProvider>
  //         <DeleteBoss
  //           id={1}
  //           name='boss1'
  //           deleteBossModal={true}
  //           setDeleteBossModal={setDeleteBossModal}
  //         />
  //       </PlaythroughsContextProvider>
  //     );
  //     const deleteBoss = getByTestId('deleteBoss');
  //     const deleteBtn = getByTestId('deleteBtn');

  //     expect(deleteBoss).toBeVisible();
  //     fireEvent.click(deleteBtn);
  //     expect(deleteBoss).not.toBeVisible();
  //   });

  it('Delete boss modal is closed when the Cancel button, X button or background is clicked', () => {
    const { getByTestId } = render(
      <PlaythroughsContextProvider>
        <DeleteBoss
          id={1}
          name='boss1'
          deleteBossModal={true}
          setDeleteBossModal={setDeleteBossModal}
        />
      </PlaythroughsContextProvider>
    );
    const toggleDeleteBtn = getByTestId('toggle-deleteBtn');
    const toggleDeleteX = getByTestId('toggle-deleteX');
    const toggleDeleteBg = getByTestId('toggle-deleteBg');

    expect(setDeleteBossModal).not.toHaveBeenCalled();
    fireEvent.click(toggleDeleteBtn);
    fireEvent.click(toggleDeleteX);
    fireEvent.click(toggleDeleteBg);
    expect(setDeleteBossModal).toHaveBeenCalledTimes(3);
  });
});
