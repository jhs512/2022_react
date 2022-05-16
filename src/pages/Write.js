import { Button, TextField } from "@mui/material";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { useTodosStatus } from "../hooks";

function Write() {
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.performDate.value.length === 0) {
      alert("언제 해야하는지 알려주세요.");
      form.performDate.focus();

      return;
    }

    if (form.content.value.length === 0) {
      alert("무엇을 해야하는지 알려주세요.");
      form.content.focus();

      return;
    }

    const newTodoId = todosStatus.addTodo(
      form.performDate.value,
      form.content.value
    );

    noticeSnackbarStatus.open(`${newTodoId}번 할일이 등록되었습니다.`);

    form.content.value = "";
    form.content.focus();
  };

  return (
    <>
      <form
        className="flex-1 flex flex-col gap-6 p-6 sm:p-8"
        onSubmit={onSubmit}
      >
        <TextField
          name="performDate"
          label="언제 해야 되나요?"
          focused
          type="datetime-local"
        />
        <TextField
          name="content"
          className="flex-1 flex"
          InputProps={{ className: "flex-1 flex-col" }}
          inputProps={{ className: "flex-1" }}
          label="무엇을 해야 하나요?"
          multiline
        />
        <Button type="submit" variant="contained">
          <i className="fa-solid fa-marker"></i>
          <span>&nbsp;</span>
          <span>할일추가</span>
        </Button>
      </form>
    </>
  );
}

export default Write;
