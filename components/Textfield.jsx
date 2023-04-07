import { Input } from "@mui/material";
import React from "react";
import { TextField } from "@mui/material";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
const getDoc_query = useQuery({
  queryKey: ["getDoc"],
  queryFn: getDoc_fn(),
});

const mutation = useMutation({
  mutationFn: () => {
    console.log("done");
  },
  onSuccess: () => {
    queryClient.invalidateQueries({});
  },
});
console.log(getDoc_query.error);

const Textfield = () => {
  return (
    <div>
      <TextField
        id="standard-textarea"
        placeholder=""
        multiline
        variant="standard"
        sx={{
          width: "65ch",
        }}
      />
    </div>
  );
};

export default Textfield;
