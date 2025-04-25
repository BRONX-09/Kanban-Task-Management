import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import boardsSlice from "../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsesMenu from "./ElipsesMenu";
import DeleteModal from "../modals/DeleteModal";

export default function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isElipsisOpen, setElipsisOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onDropdownClick = () => {
    setDropdownOpen((state) => !state);
    setElipsisOpen(false);
    setBoardType("add");
  };
  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setElipsisOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setElipsisOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards || []);
  const board = boards.find(
    (board) => board.isActive || { name: "Board Name" }
  );

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* left side */}

        <div className=" flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className=" h-6 w-6" />
          <h3 className=" hidden md:inline-block font-bold font-sans md:text-4xl">
            Kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board.name}
            </h3>
            <img
              src={DropdownOpen ? iconUp : iconDown}
              alt="dropdown_icon"
              className="w-3 ml-2 md:/*/hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* RightSide */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className=" hidden md:block button"
            onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
          >
            + Add New Task
          </button>
          <button
            className="button py-1 px-3 md:hidden"
            onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
          >
            +
          </button>

          <img
            src={elipsis}
            alt="elipses"
            className="cursor-pointer h-6"
            onClick={() => {
              setBoardType("edit");
              setDropdownOpen(false);
              setElipsisOpen((prevState) => !prevState);
            }}
          />
        </div>

        {isElipsisOpen && (
          <ElipsesMenu
            type="Boards"
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        )}
      </header>

      {DropdownOpen && (
        <HeaderDropdown
          setDropdownOpen={setDropdownOpen}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}
