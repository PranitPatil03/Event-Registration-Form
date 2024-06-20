import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  guestName?: string;
  guestType: "Yes" | "No";
}

const SuccessPage = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const formDataString = localStorage.getItem("formData");
    if (formDataString) {
      const parsedFormData = JSON.parse(formDataString);
      setFormData(parsedFormData);
    } else {
      console.log("No formData found in localStorage");
    }
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center px-5">
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-2xl font-semibold text-center">
            Event Registration Successful ✅✅
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData && (
            <>
              <h3 className="font-mono text-lg">
                Dear{" "}
                <Badge variant="default" className="space-y-2">
                  {formData.firstName + " " + formData.lastName}
                </Badge>
              </h3>
              <p className="mt-2 font-mono text-md">
                Thank you for registering for the event. You will received
                future updates on{" "}
                <Badge variant="default">{formData.email}</Badge>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
