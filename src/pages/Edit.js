import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { useTodosStatus } from "../hooks";

// ## 글수정 페이지 시작
function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();

  const todo = todosStatus.findTodoById(id);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.performDate.value.length == 0) {
      alert("언제 해야하는지 알려주세요.");
      form.performDate.focus();

      return;
    }

    if (form.content.value.length == 0) {
      alert("무엇을 해야하는지 알려주세요.");
      form.content.focus();

      return;
    }

    const newTodoId = todosStatus.modifyTodoById(
      todo.id,
      form.performDate.value,
      form.content.value
    );

    noticeSnackbarStatus.open(`${todo.id}번 할일이 수정되었습니다.`, "info");

    navigate(-1);
  };

  const performDateForInput = todo.performDate.substr(0, 16).replace(" ", "T");

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
          defaultValue={performDateForInput}
        />
        <TextField
          name="content"
          className="flex-1 flex"
          InputProps={{ className: "flex-1 flex-col" }}
          inputProps={{ className: "flex-1" }}
          label="무엇을 해야 하나요?"
          multiline
          defaultValue={todo.content}
        />
        <Button type="submit" variant="contained">
          <i className="fa-solid fa-marker"></i>
          <span>&nbsp;</span>
          <span>{todo.id}번 할일수정</span>
        </Button>
      </form>
    </>
  );
}

export default Edit;
