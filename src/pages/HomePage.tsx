import * as React from "react";
import { AppShell, Navbar, ScrollArea } from "@mantine/core";
import MyHeader from "../components/MyHeader";
import SubaccountPreviewButton, {
  SubaccountPreview,
} from "../components/SubaccountPreviewButton";
import { useQuery } from "@tanstack/react-query";
import SubaccountView from "../components/SubaccountView";

// Create 10 fake accounts with email "user@example.com"
const fakeSubaccounts: SubaccountPreview[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i,
    name: `Subaccount ${i}`,
    username: "user@example.com",
  })
);

function HomePage() {
  const [selectedSubaccountId, setSelectedSubaccountId] =
    React.useState<number>();

  const [searchValue, setSearchValue] = React.useState("");

  const {
    data: subaccounts,
    isLoading,
    isFetching,
    error,
  } = useQuery(["subaccounts"], () =>
    fetch("https://jsonplaceholder.typicode.com/todos/1").then(
      (res) => fakeSubaccounts
    )
  );

  const handleSelect = (id: number) => {
    setSelectedSubaccountId(id);
  };

  const filteredSubaccounts = React.useMemo(() => {
    if (!subaccounts) {
      return [];
    }

    if (searchValue === "") {
      return subaccounts;
    }

    return subaccounts.filter((subaccount) =>
      subaccount.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [subaccounts, searchValue]);

  React.useEffect(() => {
    setSelectedSubaccountId(undefined);
  }, [filteredSubaccounts]);

  return (
    <AppShell
      className="min-h-screen bg-slate-800 text-slate-100"
      header={
        <MyHeader
          searchValue={searchValue}
          setSearchValue={(s) => setSearchValue(s)}
        />
      }
      navbar={
        <Navbar width={{ base: 384 }} className="border-none bg-slate-700">
          <Navbar.Section
            grow
            component={ScrollArea}
            type="scroll"
            mx="-xs"
            px="xs"
            classNames={{
              scrollbar: "bg-slate-700 hover:bg-slate-700",
              thumb: "bg-slate-500 hover:bg-slate-500",
            }}
          >
            <div className="flex flex-col pt-4">
              {filteredSubaccounts.map((subaccount) => (
                <SubaccountPreviewButton
                  selected={selectedSubaccountId === subaccount.id}
                  onSelect={() => handleSelect(subaccount.id)}
                  subaccountPreview={subaccount}
                />
              ))}
            </div>
          </Navbar.Section>
        </Navbar>
      }
    >
      <SubaccountView subaccountId={selectedSubaccountId} />
    </AppShell>
  );
}

export default HomePage;
// Create 10 subaccounts
