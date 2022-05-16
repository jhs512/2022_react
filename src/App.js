import { Button, Chip } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Button variant="contained">하이</Button>
      <hr className="my-5" />
      <span className="font-bold text-3xl">
        <span className="text-[color:var(--mui-color-primary-main)]">안녕</span>
        하세요.
      </span>
      <hr className="my-5" />
      <Chip label="Chip Filled" className="!pt-1" />
    </div>
  );
}

export default App;
