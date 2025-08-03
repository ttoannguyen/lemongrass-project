import { useState } from "react";
import { Visibility } from "@/types/enums/visibility.enum";

const useCreateGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requirePostApproval, setRequirePostApproval] =
    useState<boolean>(false);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);

  const reset = () => {
    setName("");
    setDescription("");
    setVisibility(Visibility.PUBLIC);
  };

  return {
    name,
    setName,
    description,
    setDescription,
    visibility,
    setVisibility,
    requirePostApproval,
    setRequirePostApproval,
    reset,
  };
};

export default useCreateGroup;
