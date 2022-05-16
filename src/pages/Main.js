import {
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  SwipeableDrawer,
  Tab,
  Tabs,
} from "@mui/material";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { persistAtomCommon } from "../atoms";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { useTodosStatus } from "../hooks";

function TodosEmpty() {
  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <div className="grid gap-2">
          <span>
            <span className="text-[color:var(--mui-color-primary-main)]">
              할일
            </span>
            을 입력해주세요.
          </span>
          <Button
            size="large"
            variant="contained"
            component={NavLink}
            to="/write"
          >
            할일 추가하기
          </Button>
        </div>
      </div>
    </>
  );
}

const TodoList__filterCompletedIndexAtom = atom({
  key: "app/TodoList__filterCompletedIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon],
});

const TodoList__sortIndexAtom = atom({
  key: "app/TodoList__sortIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon],
});

function TodoList() {
  const todosStatus = useTodosStatus();
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus();
  const onCompletedBtnClicked = (id) => todosStatus.toggleTodoCompletedById(id);

  const [filterCompletedIndex, setFilterCompletedIndex] = useRecoilState(
    TodoList__filterCompletedIndexAtom
  );

  const [sortIndex, setSortIndex] = useRecoilState(TodoList__sortIndexAtom);

  const getFilteredTodos = () => {
    if (filterCompletedIndex == 1)
      return todosStatus.todos.filter((todo) => !todo.completed);

    if (filterCompletedIndex == 2)
      return todosStatus.todos.filter((todo) => todo.completed);

    return todosStatus.todos;
  };

  const filteredTodos = getFilteredTodos();

  const getSortedTodos = () => {
    if (sortIndex == 0) {
      return [...filteredTodos].sort((a, b) => {
        if (a.performDate == b.performDate) return 0;

        return a.performDate > b.performDate ? 1 : -1;
      });
    } else if (sortIndex == 1) {
      return [...filteredTodos].sort((a, b) => {
        if (a.performDate == b.performDate) return 0;

        return a.performDate < b.performDate ? 1 : -1;
      });
    } else if (sortIndex == 2) {
      return [...filteredTodos].sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    }

    return filteredTodos;
  };

  const sortedTodos = getSortedTodos();

  return (
    <>
      <TodoOptionDrawer status={todoOptionDrawerStatus} />

      <Tabs
        variant="fullWidth"
        value={filterCompletedIndex}
        onChange={(event, newValue) => setFilterCompletedIndex(newValue)}
      >
        <Tab
          label={
            <span className="flex">
              <i className="fa-solid fa-list-ul"></i>
              <span className="ml-2">전체</span>
            </span>
          }
          value={0}
        />
        <Tab
          label={
            <span className="flex">
              <i className="fa-regular fa-square"></i>
              <span className="ml-2">미완료</span>
            </span>
          }
          value={1}
        />
        <Tab
          label={
            <span className="flex">
              <i className="fa-regular fa-square-check"></i>
              <span className="ml-2">완료</span>
            </span>
          }
          value={2}
        />
      </Tabs>

      <Tabs
        variant="scrollable"
        value={sortIndex}
        onChange={(event, newValue) => {
          setSortIndex(newValue);
        }}
      >
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-regular fa-clock mr-2"></i>
              <span className="mr-2 whitespace-nowrap">급해요</span>
              <i className="fa-solid fa-sort-up relative top-[3px]"></i>
            </span>
          }
          value={0}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-regular fa-clock mr-2"></i>
              <span className="mr-2 whitespace-nowrap">널럴해요</span>
              <i className="fa-solid fa-sort-down relative top-[-3px]"></i>
            </span>
          }
          value={1}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-pen mr-2"></i>
              <span className="mr-2 whitespace-nowrap">작성순</span>
              <i className="fa-solid fa-sort-up relative top-[3px]"></i>
            </span>
          }
          value={2}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-pen mr-2"></i>
              <span className="mr-2 whitespace-nowrap">작성순</span>
              <i className="fa-solid fa-sort-down relative top-[-3px]"></i>
            </span>
          }
          value={3}
        />
      </Tabs>

      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
        <ul>
          {sortedTodos.map((todo, index) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              index={index}
              onCompletedBtnClicked={onCompletedBtnClicked}
              openDrawer={todoOptionDrawerStatus.open}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function TodoListItem({ onCompletedBtnClicked, todo, index, openDrawer }) {
  return (
    <>
      <li key={todo.id} className="mt-6 sm:mt-8">
        <div className="flex gap-2">
          <Chip
            label={`번호 : ${todo.id}`}
            variant="outlined"
            className="!pt-1"
          />
          <Chip
            label={todo.performDate.substr(2, 14)}
            color="primary"
            variant="outlined"
            className="!pt-1"
          />
        </div>
        <div className="mt-2 sm:mt-4 shadow rounded-[20px] flex">
          <Button
            className="flex-shrink-0 !items-start !rounded-[20px_0_0_20px]"
            color="inherit"
            onClick={() => onCompletedBtnClicked(todo.id)}
          >
            <span
              className={classNames(
                "text-4xl",
                "h-[80px]",
                "flex items-center",
                {
                  "text-[color:var(--mui-color-primary-main)]": todo.completed,
                },
                { "text-[#dcdcdc]": !todo.completed }
              )}
            >
              <i className="fa-solid fa-check"></i>
            </span>
          </Button>
          <div className="flex-shrink-0 my-5 w-[2px] bg-[#dcdcdc] mr-4"></div>
          <div className="whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex-grow flex items-center my-5">
            {todo.content}
          </div>
          <Button
            onClick={() => openDrawer(todo.id)}
            className="flex-shrink-0 !items-start !rounded-[0_20px_20px_0]"
            color="inherit"
          >
            <span className="text-[#dcdcdc] text-2xl h-[80px] flex items-center">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
          </Button>
        </div>
      </li>
    </>
  );
}

function useTodoOptionDrawerStatus() {
  const [todoId, setTodoId] = useState(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const open = (id) => setTodoId(id);

  return {
    todoId,
    opened,
    close,
    open,
  };
}

function TodoOptionDrawer({ status }) {
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();

  const removeTodo = () => {
    if (
      window.confirm(`${status.todoId}번 할일을 삭제하시겠습니까?`) == false
    ) {
      status.close();
      return;
    }

    todosStatus.removeTodoById(status.todoId);
    status.close();
    noticeSnackbarStatus.open(
      `${status.todoId}번 할일이 삭제되었습니다.`,
      "info"
    );
  };

  const todo = todosStatus.findTodoById(status.todoId);

  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={status.opened}
        onClose={status.close}
      >
        <List className="!py-0">
          <ListItem className="!pt-6 !p-5">
            <span className="text-[color:var(--mui-color-primary-main)]">
              {todo?.id}번
            </span>
            <span>&nbsp;</span>
            <span>할일에 대해서</span>
          </ListItem>
          <Divider />
          <ListItem
            className="!pt-6 !p-5 !items-baseline"
            button
            onClick={removeTodo}
          >
            <i className="fa-solid fa-trash-can"></i>
            &nbsp;
            <span>삭제</span>
          </ListItem>
          <ListItem
            className="!pt-6 !p-5 !items-baseline"
            button
            component={NavLink}
            to={`/edit/${todo?.id}`}
          >
            <i className="fa-solid fa-pen-to-square"></i>
            &nbsp;
            <span>수정</span>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}
// ## 메인 페이지관련 컴포넌트 끝

// ## 메인 페이지 시작
function Main() {
  const todosStatus = useTodosStatus();

  const todosEmpty = todosStatus.todos.length == 0;

  if (todosEmpty) {
    return <TodosEmpty />;
  }

  return (
    <>
      <TodoList />
    </>
  );
}

export default Main;
