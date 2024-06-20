import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form");
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full max-w-3xl p-4 sm:p-6 md:p-8 lg:p-10 mx-auto h-screen">
      <h2 className="font-mono text-2xl font-semibold">
        Event Registration Form
      </h2>
      <Button onClick={handleClick} variant="default">
        Click here to Register
      </Button>
    </div>
  );
};

export default HomePage;
