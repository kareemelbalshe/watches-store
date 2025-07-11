import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useLogin } from "./func/login_logic";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function LoginAdmin() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        onSubmit,
        ref,
        errors
      } = useLogin();
    
  return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full">
          <form
            className="w-[85%] sm:w-[70%] md:w-[55%] lg:w-[40%] flex flex-col items-center justify-center gap-5"
            onSubmit={onSubmit}
            ref={ref}
          >
            <Input
              label="Email"
              placeholder="Email"
              type="email"
              value={email}
              setValue={setEmail}
              icon={<MdOutlineAlternateEmail />}
              required
              border="border-amber-400"
              error={errors.email}
            />
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              value={password}
              setValue={setPassword}
              icon={<RiLockPasswordFill />}
              required
              border="border-amber-400"
              error={errors.password}
            />
            <Button text="Login" type="submit" />
          </form>
        </div>
  );
}