import { Button, Chip } from "@mui/material";

function App() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div>
        <Button variant="contained">하이</Button>
        <hr className="my-5" />
        <span className="font-bold text-3xl">
          <span className="text-[color:var(--mui-color-primary-main)]">
            안녕
          </span>
          하세요.
        </span>
        <hr className="my-5" />
        <Chip
          label={
            <span>
              <i className="fa-solid fa-bell"></i> Chip Filled
            </span>
          }
          className="!pt-1"
        />
      </div>
    </div>
  );
}

export default App;
