import { useAuth } from "../logic/hooks/useAuth";
import { Button } from "./ui/button";

export function Login() {
  const { login } = useAuth();
  // TODO: dialog
  return (
    <Button variant="secondary" onClick={() => login()}>
      Login
    </Button>
  );
}
