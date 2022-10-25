import { useQuery } from "@tanstack/react-query";

export interface SubaccountProps {
  id: number;
  name: string;
  email: string;
  password: string;
}

const SubaccountView = ({
  subaccountId,
}: {
  subaccountId: number | undefined;
}) => {
  const {
    data: subaccount,
    isLoading,
    error,
  } = useQuery(["subaccount", subaccountId], () =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${subaccountId}`).then(
      (res) => ({
        id: subaccountId,
        name: "Subaccount 1",
        email: "user@example.com",
        password: "thePassword",
      })
    )
  );
  if (subaccountId === undefined) {
    return <div>Select a subaccount</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold">Subaccount {subaccountId}</h2>

      {/* <p className="text-xl font-medium">Email: {subaccount.email}</p> */}
    </div>
  );
};

export default SubaccountView;
